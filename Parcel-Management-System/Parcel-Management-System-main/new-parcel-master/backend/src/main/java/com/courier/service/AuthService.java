package com.courier.service;

import com.courier.dto.AuthResponse;
import com.courier.dto.LoginRequest;
import com.courier.dto.RegisterRequest;
import com.courier.dto.PasswordChangeRequest;
import com.courier.dto.PasswordChangeResponse;
import com.courier.model.Customer;
import com.courier.model.UserRole;
import com.courier.repository.CustomerRepository;
import com.courier.util.JwtUtil;
import com.courier.util.PasswordUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import jakarta.persistence.PrePersist;
import java.time.LocalDateTime;

/**
 * Authentication Service Class
 * 
 * This service handles all authentication-related operations including:
 * - User registration (customers and officers)
 * - User login (separate for customers and officers)
 * - Password management
 * - JWT token generation
 * 
 * Key Concepts:
 * - @Service: Marks this class as a Spring service component
 * - @Autowired: Injects dependencies (other services/repositories)
 * - Business Logic: Contains the core authentication logic
 * - Security: Handles password hashing and JWT token generation
 * 
 * Service Layer Responsibilities:
 * 1. Validate user input
 * 2. Check business rules (email uniqueness, role validation)
 * 3. Interact with repositories for data persistence
 * 4. Generate security tokens
 * 5. Return appropriate responses
 */
@Service
public class AuthService {
    
    /**
     * Repository for customer data operations
     * Handles database interactions for customer entities
     */
    @Autowired
    private CustomerRepository customerRepository;
    
    /**
     * Utility for JWT token operations
     * Generates and validates JSON Web Tokens
     */
    @Autowired
    private JwtUtil jwtUtil;
    
    /**
     * Utility for password operations
     * Handles password hashing and verification
     */
    @Autowired
    private PasswordUtil passwordUtil;
    
    /**
     * Register a new user (customer or officer)
     * 
     * This method creates a new user account with the following steps:
     * 1. Check if email already exists
     * 2. Create new customer object
     * 3. Hash the password for security
     * 4. Generate unique ID
     * 5. Save to database
     * 6. Generate JWT token
     * 7. Return success response with user details
     * 
     * @param request Registration request containing user details
     * @return AuthResponse with success/failure status and user information
     */
    public AuthResponse register(RegisterRequest request) {
        try {
            // Check if email already exists in database
            if (customerRepository.findByEmail(request.getEmail()).isPresent()) {
                return new AuthResponse(false, "Email already registered", null, null, null, null, null, null, null, null, null);
            }
            
            // Create new customer object
            Customer customer = new Customer();
            
            // Set customer properties from registration request
            customer.setCustomerName(request.getCustomerName());
            customer.setEmail(request.getEmail());
            customer.setCountryCode(request.getCountryCode());
            customer.setMobileNumber(request.getMobileNumber());
            customer.setAddress(request.getAddress());
            
            // Hash password for security before storing
            String hashedPassword = passwordUtil.encode(request.getPassword());
            customer.setPassword(hashedPassword);
            
            // Set user role (CUSTOMER or OFFICER)
            customer.setRole(UserRole.valueOf(request.getRole()));
            customer.setGetUpdatesVia(request.getPreferences());
            
            // Generate unique ID for user reference
            String prefix = UserRole.valueOf(request.getRole()) == UserRole.CUSTOMER ? "CUST" : "OFF";
            String timestamp = String.valueOf(System.currentTimeMillis()).substring(8);
            String randomSuffix = String.valueOf((int)(Math.random() * 1000));
            String uniqueId = prefix + timestamp + randomSuffix;
            customer.setUniqueId(uniqueId);
            
            // Save customer to database
            Customer savedCustomer = customerRepository.save(customer);
            
            // Generate JWT token for immediate login
            String token = jwtUtil.generateToken(savedCustomer.getEmail(), savedCustomer.getId(), savedCustomer.getRole());
            
            // Return success response with all user details
            return new AuthResponse(
                true, 
                "Registration successful for: " + savedCustomer.getCustomerName(), 
                token, 
                savedCustomer.getId(), 
                savedCustomer.getCustomerName(), 
                savedCustomer.getEmail(), 
                savedCustomer.getCountryCode(), 
                savedCustomer.getMobileNumber(), 
                savedCustomer.getAddress(), 
                savedCustomer.getRole().toString(),
                savedCustomer.getUniqueId(),
                savedCustomer.getGetUpdatesVia()
            );
            
        } catch (Exception e) {
            // Return error response if registration fails
            return new AuthResponse(false, "Registration failed: " + e.getMessage(), null, null, null, null, null, null, null, null, null);
        }
    }
    
    /**
     * Authenticate a customer login
     * 
     * This method handles customer login with the following steps:
     * 1. Find customer by unique ID
     * 2. Verify user role is CUSTOMER
     * 3. Verify password matches
     * 4. Generate JWT token
     * 5. Return success response
     * 
     * @param request Login request containing unique ID and password
     * @return AuthResponse with authentication result and user details
     */
    public AuthResponse login(LoginRequest request) {
        // Try to find customer by unique ID (used as login identifier)
        Optional<Customer> customerOpt = customerRepository.findByUniqueId(request.getEmail());
        
        if (customerOpt.isEmpty()) {
            return new AuthResponse(false, "Invalid Customer ID or password", null, null, null, null, null, null, null, null, null);
        }
        
        Customer customer = customerOpt.get();
        
        // Verify user is a customer (not an officer)
        if (customer.getRole() != UserRole.CUSTOMER) {
            return new AuthResponse(
                false, 
                "Access denied. Customer login required. Please use officer login for officer accounts.", 
                null, 
                null, 
                null, 
                null, 
                null, 
                null, 
                null, 
                null,
                null
            );
        }
        
        // Verify password matches stored hash
        boolean passwordMatches = passwordUtil.matches(request.getPassword(), customer.getPassword());
        
        if (!passwordMatches) {
            return new AuthResponse(false, "Invalid Customer ID or password", null, null, null, null, null, null, null, null, null);
        }
        
        // Generate JWT token for authenticated session
        String token = jwtUtil.generateToken(customer.getEmail(), customer.getId(), customer.getRole());
        
        // Return success response with user details
        return new AuthResponse(
            true, 
            "Login successful", 
            token, 
            customer.getId(), 
            customer.getCustomerName(), 
            customer.getEmail(), 
            customer.getCountryCode(), 
            customer.getMobileNumber(), 
            customer.getAddress(), 
            customer.getRole().toString(),
            customer.getUniqueId(),
            customer.getGetUpdatesVia()
        );
    }
    
    /**
     * Authenticate an officer login
     * 
     * This method handles officer login with the following steps:
     * 1. Find customer by unique ID
     * 2. Verify user role is OFFICER
     * 3. Verify password matches
     * 4. Generate JWT token
     * 5. Return success response
     * 
     * @param request Login request containing unique ID and password
     * @return AuthResponse with authentication result and user details
     */
    public AuthResponse officerLogin(LoginRequest request) {
        // Try to find customer by unique ID (used as login identifier)
        Optional<Customer> customerOpt = customerRepository.findByUniqueId(request.getEmail());
        
        if (customerOpt.isEmpty()) {
            return new AuthResponse(
                false, 
                "Invalid Officer ID or password", 
                null, 
                null, 
                null, 
                null, 
                null, 
                null, 
                null, 
                null,
                null
            );
        }
        
        Customer customer = customerOpt.get();
        
        // Verify user is an officer (not a customer)
        if (customer.getRole() != UserRole.OFFICER) {
            return new AuthResponse(
                false, 
                "Access denied. Officer privileges required", 
                null, 
                null, 
                null, 
                null, 
                null, 
                null, 
                null, 
                null,
                null
            );
        }
        
        // Verify password matches stored hash
        boolean passwordMatches = passwordUtil.matches(request.getPassword(), customer.getPassword());
        
        if (!passwordMatches) {
            return new AuthResponse(
                false, 
                "Invalid Officer ID or password", 
                null, 
                null, 
                null, 
                null, 
                null, 
                null, 
                null, 
                null,
                null
            );
        }
        
        // Generate JWT token for authenticated session
        String token = jwtUtil.generateToken(customer.getEmail(), customer.getId(), customer.getRole());
        
        // Return success response with user details
        return new AuthResponse(
            true, 
            "Login successful", 
            token, 
            customer.getId(), 
            customer.getCustomerName(), 
            customer.getEmail(), 
            customer.getCountryCode(), 
            customer.getMobileNumber(), 
            customer.getAddress(), 
            customer.getRole().toString(),
            customer.getUniqueId(),
            customer.getGetUpdatesVia()
        );
    }
    
    /**
     * Get customer by ID
     * 
     * @param id Customer ID to search for
     * @return Customer object or null if not found
     */
    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id).orElse(null);
    }
    
    /**
     * Get customer by email address
     * 
     * @param email Email address to search for
     * @return Customer object or null if not found
     */
    public Customer getCustomerByEmail(String email) {
        return customerRepository.findByEmail(email).orElse(null);
    }

    /**
     * Change user password
     * 
     * This method allows users to change their password with the following steps:
     * 1. Verify current password is correct
     * 2. Check new password matches confirmation
     * 3. Hash new password
     * 4. Update database
     * 5. Return success/failure response
     * 
     * @param userId ID of the user changing password
     * @param request Password change request with current, new, and confirm passwords
     * @return PasswordChangeResponse with success/failure status
     */
    public PasswordChangeResponse changePassword(Long userId, PasswordChangeRequest request) {
        try {
            // Debug logging for troubleshooting
            System.out.println("=== Password Change Service Debug ===");
            System.out.println("Changing password for user ID: " + userId);
            System.out.println("Current password provided: " + (request.getCurrentPassword() != null ? "YES" : "NO"));
            System.out.println("New password provided: " + (request.getNewPassword() != null ? "YES" : "NO"));
            System.out.println("Confirm password provided: " + (request.getConfirmPassword() != null ? "YES" : "NO"));
            
            // Get the customer from database
            Customer customer = customerRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("Customer not found"));
            
            System.out.println("Found customer: " + customer.getCustomerName());
            System.out.println("Customer email: " + customer.getEmail());
            System.out.println("Customer current password hash: " + customer.getPassword().substring(0, Math.min(customer.getPassword().length(), 20)) + "...");
            
            // Verify current password matches stored hash
            boolean passwordMatches = passwordUtil.matches(request.getCurrentPassword(), customer.getPassword());
            System.out.println("Current password verification: " + (passwordMatches ? "SUCCESS" : "FAILED"));
            
            if (!passwordMatches) {
                System.out.println("Current password verification failed");
                return new PasswordChangeResponse(false, "Current password is incorrect");
            }
            
            // Check if new password matches confirm password
            if (!request.getNewPassword().equals(request.getConfirmPassword())) {
                System.out.println("Password confirmation mismatch");
                return new PasswordChangeResponse(false, "New password and confirm password do not match");
            }
            
            // Hash the new password for security
            String hashedPassword = passwordUtil.encode(request.getNewPassword());
            System.out.println("New password hashed successfully");
            System.out.println("New password hash: " + hashedPassword.substring(0, Math.min(hashedPassword.length(), 20)) + "...");
            
            // Update the password in database
            customer.setPassword(hashedPassword);
            customerRepository.save(customer);
            
            System.out.println("Password updated successfully in database");
            return new PasswordChangeResponse(true, "Password updated successfully");
            
        } catch (Exception e) {
            // Log error and return failure response
            System.err.println("Error changing password: " + e.getMessage());
            e.printStackTrace();
            return new PasswordChangeResponse(false, "Failed to update password: " + e.getMessage());
        }
    }
} 