package com.courier.controller;

import com.courier.dto.FeedbackRequest;
import com.courier.dto.FeedbackResponse;
import com.courier.model.Booking;
import com.courier.model.Customer;
import com.courier.model.Feedback;
import com.courier.model.ParcelStatus;
import com.courier.service.BookingService;
import com.courier.service.FeedbackService;
import com.courier.service.AuthService;
import com.courier.util.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "http://localhost:4200")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @Autowired
    private BookingService bookingService;

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/add")
    public ResponseEntity<FeedbackResponse> addFeedback(
            @Valid @RequestBody FeedbackRequest request,
            @RequestHeader("Authorization") String token) {
        try {
            System.out.println("=== Feedback Submission Debug ===");
            System.out.println("Booking ID: " + request.getBookingId());
            System.out.println("Description: " + request.getDescription());
            System.out.println("Rating: " + request.getRating());
            
            String email = jwtUtil.extractEmail(token.replace("Bearer ", ""));
            System.out.println("Customer Email: " + email);
            
            Customer customer = authService.getCustomerByEmail(email);
            
            if (customer == null) {
                System.out.println("Customer not found for email: " + email);
                return ResponseEntity.badRequest()
                    .body(new FeedbackResponse(false, "Customer not found", null));
            }
            
            System.out.println("Customer found: " + customer.getCustomerName());

            Booking booking = bookingService.getBookingById(request.getBookingId());
            if (booking == null) {
                System.out.println("Booking not found for ID: " + request.getBookingId());
                return ResponseEntity.badRequest()
                    .body(new FeedbackResponse(false, "Booking not found", null));
            }
            
            System.out.println("Booking found: " + booking.getBookingId());
            System.out.println("Booking status: " + booking.getParcelStatus());
            System.out.println("Booking customer ID: " + booking.getCustomer().getId());
            System.out.println("Requesting customer ID: " + customer.getId());

            // Verify booking belongs to customer and is delivered
            if (!booking.getCustomer().getId().equals(customer.getId())) {
                System.out.println("Unauthorized access - booking doesn't belong to customer");
                return ResponseEntity.badRequest()
                    .body(new FeedbackResponse(false, "Unauthorized access", null));
            }

            if (booking.getParcelStatus() != ParcelStatus.DELIVERED) {
                System.out.println("Booking is not delivered. Current status: " + booking.getParcelStatus());
                return ResponseEntity.badRequest()
                    .body(new FeedbackResponse(false, "Feedback can only be added for delivered parcels", null));
            }

            System.out.println("All validations passed, adding feedback...");
            Feedback feedback = feedbackService.addFeedback(customer, booking, request);
            
            System.out.println("Feedback added successfully");
            return ResponseEntity.ok(new FeedbackResponse(true, "Feedback added successfully", feedback));
            
        } catch (Exception e) {
            System.out.println("Error in feedback submission: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest()
                .body(new FeedbackResponse(false, "Feedback failed: " + e.getMessage(), null));
        }
    }

    @GetMapping("/officer/all")
    public ResponseEntity<List<Feedback>> getAllFeedback(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            List<Feedback> feedbacks = feedbackService.getAllDeliveredFeedbackPaginated(pageable);
            return ResponseEntity.ok(feedbacks);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/debug/booking/{bookingId}")
    public ResponseEntity<String> debugBookingStatus(@PathVariable String bookingId) {
        try {
            Booking booking = bookingService.getBookingById(bookingId);
            if (booking == null) {
                return ResponseEntity.ok("Booking not found: " + bookingId);
            }
            
            String debugInfo = String.format(
                "Booking ID: %s\nStatus: %s\nCustomer: %s\nReceiver: %s\nCreated: %s",
                booking.getBookingId(),
                booking.getParcelStatus(),
                booking.getCustomer().getCustomerName(),
                booking.getReceiverName(),
                booking.getCreatedAt()
            );
            
            return ResponseEntity.ok(debugInfo);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
} 