package com.courier.controller;

import com.courier.dto.AuthResponse;
import com.courier.dto.LoginRequest;
import com.courier.dto.RegisterRequest;
import com.courier.dto.PasswordChangeRequest;
import com.courier.dto.PasswordChangeResponse;
import com.courier.service.AuthService;
import com.courier.util.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Authentication Controller Class
 * 
 * This controller handles all HTTP requests related to authentication including:
 * - User registration
 * - Customer login
 * - Officer login
 * - Password changes
 * 
 * Key Concepts:
 * - @RestController: Marks this class as a REST controller that returns JSON responses
 * - @RequestMapping: Defines the base URL path for all endpoints in this controller
 * - @CrossOrigin: Allows requests from the frontend application (CORS configuration)
 * - @PostMapping: Defines HTTP POST endpoints
 * - @RequestBody: Extracts JSON data from HTTP request body
 * - @RequestHeader: Extracts data from HTTP request headers
 * - ResponseEntity: Wraps HTTP responses with status codes and body
 * 
 * Controller Layer Responsibilities:
 * 1. Receive HTTP requests from clients
 * 2. Validate request data
 * 3. Call appropriate service methods
 * 4. Return HTTP responses with proper status codes
 * 5. Handle errors and exceptions
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
    
    /**
     * Service for authentication business logic
     * Handles registration, login, and password operations
     */
    @Autowired
    private AuthService authService;
    
    /**
     * Utility for JWT token operations
     * Extracts user information from JWT tokens
     */
    @Autowired
    private JwtUtil jwtUtil;
    
    /**
     * Register a new user (customer or officer)
     * 
     * HTTP Method: POST
     * URL: /api/auth/register
     * 
     * This endpoint:
     * 1. Receives registration data from frontend
     * 2. Validates the request data (@Valid)
     * 3. Calls the auth service to register the user
     * 4. Returns appropriate HTTP status code based on result
     * 
     * @param request Registration data (name, email, password, etc.)
     * @return ResponseEntity with registration result and user details
     */
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        // Call service to handle registration
        AuthResponse response = authService.register(request);
        
        if (response.isSuccess()) {
            // Return 200 OK for successful registration
            return ResponseEntity.ok(response);
        } else {
            // Return appropriate error status based on the error type
            if (response.getMessage() != null && response.getMessage().contains("Email already registered")) {
                // Return 409 Conflict for duplicate email
                return ResponseEntity.status(409).body(response);
            } else {
                // Return 400 Bad Request for other validation errors
                return ResponseEntity.badRequest().body(response);
            }
        }
    }
    
    /**
     * Authenticate a customer login
     * 
     * HTTP Method: POST
     * URL: /api/auth/login
     * 
     * This endpoint:
     * 1. Receives login credentials from frontend
     * 2. Validates the request data
     * 3. Calls the auth service to authenticate customer
     * 4. Returns JWT token and user details on success
     * 
     * @param request Login credentials (unique ID and password)
     * @return ResponseEntity with authentication result and user details
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        // Call service to handle customer login
        AuthResponse response = authService.login(request);
        
        if (response.isSuccess()) {
            // Return 200 OK for successful login
            return ResponseEntity.ok(response);
        } else {
            // Return 400 Bad Request for failed login
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Authenticate an officer login
     * 
     * HTTP Method: POST
     * URL: /api/auth/officer-login
     * 
     * This endpoint:
     * 1. Receives login credentials from frontend
     * 2. Validates the request data
     * 3. Calls the auth service to authenticate officer
     * 4. Returns JWT token and user details on success
     * 
     * @param request Login credentials (unique ID and password)
     * @return ResponseEntity with authentication result and user details
     */
    @PostMapping("/officer-login")
    public ResponseEntity<AuthResponse> officerLogin(@Valid @RequestBody LoginRequest request) {
        // Call service to handle officer login
        AuthResponse response = authService.officerLogin(request);
        
        if (response.isSuccess()) {
            // Return 200 OK for successful login
            return ResponseEntity.ok(response);
        } else {
            // Return 400 Bad Request for failed login
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * Change user password
     * 
     * HTTP Method: POST
     * URL: /api/auth/change-password
     * 
     * This endpoint:
     * 1. Receives password change request from frontend
     * 2. Extracts user ID from JWT token in Authorization header
     * 3. Validates current password and new password
     * 4. Updates password in database
     * 5. Returns success/failure response
     * 
     * @param request Password change data (current, new, confirm passwords)
     * @param token JWT token from Authorization header
     * @return ResponseEntity with password change result
     */
    @PostMapping("/change-password")
    public ResponseEntity<PasswordChangeResponse> changePassword(
            @RequestBody PasswordChangeRequest request,
            @RequestHeader("Authorization") String token) {
        
        try {
            // Debug logging for troubleshooting
            System.out.println("=== Password Change Debug ===");
            System.out.println("Password change request received");
            System.out.println("Token: " + token);
            
            // Extract user ID from JWT token
            // Remove "Bearer " prefix from token
            String jwt = token.substring(7);
            Long userId = jwtUtil.extractUserId(jwt);
            
            System.out.println("User ID from token: " + userId);
            
            // Validate password confirmation
            if (request.getNewPassword() == null || !request.getNewPassword().equals(request.getConfirmPassword())) {
                System.out.println("Password confirmation mismatch");
                return ResponseEntity.badRequest()
                        .body(new PasswordChangeResponse(false, "New password and confirm password do not match"));
            }
            
            // Call service to handle password change
            PasswordChangeResponse response = authService.changePassword(userId, request);
            
            System.out.println("Password change response: " + response.isSuccess() + " - " + response.getMessage());
            
            if (response.isSuccess()) {
                // Return 200 OK for successful password change
                return ResponseEntity.ok(response);
            } else {
                // Return 400 Bad Request for failed password change
                return ResponseEntity.badRequest().body(response);
            }
            
        } catch (Exception e) {
            // Log error and return 500 Internal Server Error
            System.err.println("Error in password change endpoint: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500)
                    .body(new PasswordChangeResponse(false, "Internal server error: " + e.getMessage()));
        }
    }
}
 