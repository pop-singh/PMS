package com.courier.controller;

import com.courier.dto.PaymentRequest;
import com.courier.dto.PaymentResponse;
import com.courier.dto.InvoiceResponse;
import com.courier.model.Booking;
import com.courier.model.Payment;
import com.courier.model.ParcelStatus;
import com.courier.service.BookingService;
import com.courier.service.PaymentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.courier.model.DeliveryType;
import com.courier.model.PackingPreference;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:4200")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<PaymentResponse> processPayment(@Valid @RequestBody PaymentRequest request) {
        System.out.println("=== Payment Request Debug ===");
        System.out.println("Booking ID: " + request.getBookingId());
        System.out.println("Card Number: " + request.getCardNumber());
        System.out.println("Cardholder Name: " + request.getCardholderName());
        System.out.println("Expiry Date: " + request.getExpiryDate());
        System.out.println("CVV: " + request.getCvv());
        
        try {
            // Validate booking exists
            Booking booking = bookingService.getBookingById(request.getBookingId());
            if (booking == null) {
                System.out.println("Booking not found for ID: " + request.getBookingId());
                return ResponseEntity.badRequest()
                    .body(new PaymentResponse(false, "Booking not found", null));
            }

            System.out.println("Booking found: " + booking.getBookingId());
            System.out.println("Booking amount: " + booking.getParcelServiceCost());

            // Process payment
            Payment payment = paymentService.processPayment(booking, request);
            
            // Update booking status to BOOKED
            booking.setParcelStatus(ParcelStatus.BOOKED);
            bookingService.updateBooking(booking);

            PaymentResponse response = new PaymentResponse(
                true,
                "Payment processed successfully",
                payment
            );
            
            System.out.println("Payment processed successfully");
            System.out.println("Payment ID: " + payment.getPaymentId());
            System.out.println("Transaction ID: " + payment.getTransactionId());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            System.out.println("Payment error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest()
                .body(new PaymentResponse(false, "Payment failed: " + e.getMessage(), null));
        }
    }

    @GetMapping("/{bookingId}/invoice")
    public ResponseEntity<InvoiceResponse> generateInvoice(@PathVariable String bookingId) {
        System.out.println("=== PaymentController.generateInvoice ===");
        System.out.println("Request for invoice with booking ID: " + bookingId);
        
        try {
            InvoiceResponse invoice = paymentService.generateInvoice(bookingId);
            System.out.println("Invoice generated successfully");
            return ResponseEntity.ok(invoice);
        } catch (Exception e) {
            System.out.println("Invoice generation failed: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest()
                .body(new InvoiceResponse(false, "Invoice generation failed: " + e.getMessage(), null));
        }
    }

    @GetMapping("/invoice/{bookingId}/download")
    public ResponseEntity<byte[]> downloadInvoicePdf(@PathVariable String bookingId) {
        try {
            byte[] pdfBytes = paymentService.downloadInvoicePdf(bookingId);
            
            return ResponseEntity.ok()
                .header("Content-Type", "application/pdf")
                .header("Content-Disposition", "attachment; filename=\"invoice_" + bookingId + ".pdf\"")
                .body(pdfBytes);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/debug/payments")
    public ResponseEntity<String> listAllPayments() {
        try {
            paymentService.listAllPayments();
            return ResponseEntity.ok("Check console for payment list");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/debug/payment/{bookingId}")
    public ResponseEntity<String> checkPaymentForBooking(@PathVariable String bookingId) {
        try {
            boolean paymentExists = paymentService.checkPaymentExists(bookingId);
            if (paymentExists) {
                return ResponseEntity.ok("Payment found for booking ID: " + bookingId);
            } else {
                return ResponseEntity.ok("No payment found for booking ID: " + bookingId);
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/debug/create-test-payment")
    public ResponseEntity<String> createTestPayment() {
        try {
            // Create a test booking
            Booking testBooking = new Booking();
            testBooking.setBookingId("BK1754422694940"); // Use the specific booking ID from the error
            testBooking.setReceiverName("Test Receiver");
            testBooking.setReceiverAddress("123 Test Street, Test City");
            testBooking.setReceiverMobile("9876543210");
            testBooking.setParcelWeightInGram(1000);
            testBooking.setParcelContentsDescription("Test Package");
            testBooking.setParcelDeliveryType(DeliveryType.EXPRESS);
            testBooking.setParcelPackingPreference(PackingPreference.BASIC);
            testBooking.setParcelServiceCost(new BigDecimal("250.00"));
            
            // Save the booking
            Booking savedBooking = bookingService.createBooking(testBooking);
            
            // Create a test payment
            PaymentRequest testRequest = new PaymentRequest();
            testRequest.setBookingId("BK1754422694940");
            testRequest.setCardNumber("4111111111111111");
            testRequest.setCardholderName("Test User");
            testRequest.setExpiryDate("12/25");
            testRequest.setCvv("123");
            
            Payment testPayment = paymentService.processPayment(savedBooking, testRequest);
            
            return ResponseEntity.ok("Test payment created successfully. Payment ID: " + testPayment.getPaymentId());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating test payment: " + e.getMessage());
        }
    }
} 