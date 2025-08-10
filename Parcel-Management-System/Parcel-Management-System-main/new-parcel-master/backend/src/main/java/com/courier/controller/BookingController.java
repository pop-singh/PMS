package com.courier.controller;

import com.courier.dto.BookingRequest;
import com.courier.dto.BookingResponse;
import com.courier.dto.BookingPage;
import com.courier.model.Booking;
import com.courier.model.Customer;
import com.courier.model.ParcelStatus;
import com.courier.service.AuthService;
import com.courier.service.BookingService;
import com.courier.util.CostCalculator;
import com.courier.util.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;
import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:4200")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(@Valid @RequestBody BookingRequest request,
                                                       @RequestHeader("Authorization") String token) {
        try {
            // Extract customer ID from JWT token
            String email = jwtUtil.extractEmail(token.replace("Bearer ", ""));
            String role = jwtUtil.extractRole(token.replace("Bearer ", ""));
            Long userId = jwtUtil.extractUserId(token.replace("Bearer ", ""));
            
            // Check if this is a customer booking
            if (!"CUSTOMER".equals(role)) {
                return ResponseEntity.badRequest()
                    .body(new BookingResponse(false, "Only customers can create bookings", null));
            }
            
            // Try to find customer by email first, then by unique ID
            Customer customer = authService.getCustomerByEmail(email);
            if (customer == null) {
                // Try to find by unique ID if email lookup fails
                // For now, we'll use the email as unique ID since the JWT contains email
                // In a real scenario, we'd need to extract unique ID from JWT or modify the token structure
                customer = authService.getCustomerByEmail(email);
            }
            
            if (customer == null) {
                return ResponseEntity.badRequest()
                    .body(new BookingResponse(false, "Customer not found", null));
            }

            // Calculate service cost
            double serviceCost = CostCalculator.calculateServiceCost(
                request.getParcelWeightInGram(),
                request.getParcelDeliveryType(),
                request.getParcelPackingPreference(),
                false // isOfficerBooking = false for customer bookings
            );

            // Create booking
            Booking booking = new Booking();
            booking.setCustomer(customer);
            booking.setReceiverName(request.getReceiverName());
            booking.setReceiverAddress(request.getReceiverAddress());
            booking.setReceiverMobile(request.getReceiverMobile());
            booking.setParcelWeightInGram(request.getParcelWeightInGram());
            booking.setParcelContentsDescription(request.getParcelContentsDescription());
            booking.setParcelDeliveryType(request.getParcelDeliveryType());
            booking.setParcelPackingPreference(request.getParcelPackingPreference());
            booking.setParcelPickupTime(request.getParcelPickupTime());
            booking.setParcelDropoffTime(request.getParcelDropoffTime());
            booking.setParcelServiceCost(BigDecimal.valueOf(serviceCost));
            booking.setParcelPaymentTime(LocalDateTime.now());
            booking.setParcelStatus(ParcelStatus.NEW);
            
            // Note: bookingId is auto-generated in the Booking constructor
            // No need to set it manually

            System.out.println("Booking object created, saving...");
            Booking savedBooking = bookingService.createBooking(booking);
            System.out.println("Booking saved successfully with ID: " + savedBooking.getBookingId());
            
            BookingResponse response = new BookingResponse(
                true,
                "Booking created successfully",
                savedBooking
            );
            
            System.out.println("=== Booking Request Completed Successfully ===");
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            System.out.println("=== Booking Request Failed ===");
            System.out.println("Error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new BookingResponse(false, "Booking failed: " + e.getMessage(), null));
        }
    }

    @PostMapping("/officer")
    public ResponseEntity<BookingResponse> createOfficerBooking(@Valid @RequestBody BookingRequest request,
                                                              @RequestHeader("Authorization") String token) {
        try {
            // Extract officer ID from JWT token
            String email = jwtUtil.extractEmail(token.replace("Bearer ", ""));
            String role = jwtUtil.extractRole(token.replace("Bearer ", ""));
            Long userId = jwtUtil.extractUserId(token.replace("Bearer ", ""));
            
            // Check if this is an officer booking
            if (!"OFFICER".equals(role)) {
                return ResponseEntity.badRequest()
                    .body(new BookingResponse(false, "Only officers can create officer bookings", null));
            }
            
            // Try to find officer by email first, then by unique ID
            Customer officer = authService.getCustomerByEmail(email);
            if (officer == null) {
                officer = authService.getCustomerByEmail(email);
            }
            
            if (officer == null) {
                return ResponseEntity.badRequest()
                    .body(new BookingResponse(false, "Officer not found", null));
            }

            // Calculate service cost with admin fee
            double serviceCost = CostCalculator.calculateServiceCost(
                request.getParcelWeightInGram(),
                request.getParcelDeliveryType(),
                request.getParcelPackingPreference(),
                true // isOfficerBooking = true for officer bookings (includes admin fee)
            );

            // Create booking
            Booking booking = new Booking();
            booking.setCustomer(officer); // Officer is the customer for this booking
            booking.setReceiverName(request.getReceiverName());
            booking.setReceiverAddress(request.getReceiverAddress());
            booking.setReceiverMobile(request.getReceiverMobile());
            booking.setParcelWeightInGram(request.getParcelWeightInGram());
            booking.setParcelContentsDescription(request.getParcelContentsDescription());
            booking.setParcelDeliveryType(request.getParcelDeliveryType());
            booking.setParcelPackingPreference(request.getParcelPackingPreference());
            booking.setParcelPickupTime(request.getParcelPickupTime());
            booking.setParcelDropoffTime(request.getParcelDropoffTime());
            booking.setParcelServiceCost(BigDecimal.valueOf(serviceCost));
            booking.setParcelStatus(ParcelStatus.BOOKED);
            
            // Generate unique booking ID
            String bookingId = "BK" + System.currentTimeMillis();
            booking.setBookingId(bookingId);
            
            // Save booking
            Booking savedBooking = bookingService.createBooking(booking);
            
            if (savedBooking != null) {
                return ResponseEntity.ok(new BookingResponse(true, "Booking created successfully", savedBooking));
            } else {
                return ResponseEntity.status(500)
                    .body(new BookingResponse(false, "Failed to create booking", null));
            }
            
        } catch (Exception e) {
            return ResponseEntity.status(500)
                .body(new BookingResponse(false, "Failed to create booking: " + e.getMessage(), null));
        }
    }

    @GetMapping("/officer")
    public ResponseEntity<BookingPage> getOfficerBookings(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            BookingPage bookings = bookingService.getAllBookingsPaginated(page, size);
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/list-all")
    public ResponseEntity<String> listAllBookings() {
        try {
            List<Booking> allBookings = bookingService.getAllBookings();
            
            StringBuilder result = new StringBuilder();
            result.append("Total bookings: ").append(allBookings.size()).append("\n");
            
            for (Booking booking : allBookings) {
                result.append("Booking ID: ").append(booking.getBookingId())
                      .append(", Customer: ").append(booking.getCustomer() != null ? booking.getCustomer().getCustomerName() : "null")
                      .append(", Status: ").append(booking.getParcelStatus())
                      .append("\n");
            }
            
            return ResponseEntity.ok(result.toString());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }


} 