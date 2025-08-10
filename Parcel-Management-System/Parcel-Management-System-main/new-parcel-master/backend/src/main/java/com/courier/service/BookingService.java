package com.courier.service;

import com.courier.dto.BookingPage;
import com.courier.model.Booking;
import com.courier.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public Booking getBookingById(String bookingId) {
        try {
            return bookingRepository.findByBookingId(bookingId).orElse(null);
        } catch (Exception e) {
            return null;
        }
    }

    public Booking updateBooking(Booking booking) {
        try {
            return bookingRepository.save(booking);
        } catch (Exception e) {
            return null;
        }
    }

    public BookingPage getCustomerBookingsPaginated(Long customerId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Booking> bookingPage = bookingRepository.findByCustomerIdOrderByCreatedAtDesc(customerId, pageable);
        
        return new BookingPage(
            bookingPage.getContent(),
            bookingPage.getTotalElements(),
            bookingPage.getTotalPages(),
            bookingPage.getNumber(),
            bookingPage.getSize()
        );
    }

    public BookingPage getAllBookingsPaginated(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Booking> bookingPage = bookingRepository.findAllByOrderByCreatedAtDesc(pageable);
        
        return new BookingPage(
            bookingPage.getContent(),
            bookingPage.getTotalElements(),
            bookingPage.getTotalPages(),
            bookingPage.getNumber(),
            bookingPage.getSize()
        );
    }

    public List<Booking> getAllBookings() {
        try {
            return bookingRepository.findAll();
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }

    public void exportCustomerBookings(Long customerId) {
        // Implementation for exporting customer bookings
    }

    public byte[] exportCustomerBookings(Long customerId, String format) {
        // Implementation for exporting customer bookings with format
        // This is a placeholder implementation
        return new byte[0];
    }

    public void generateExcelReport(List<Booking> bookings, String filename) {
        // Implementation for generating Excel report
    }

    public void generatePdfReport(List<Booking> bookings, String filename) {
        // Implementation for generating PDF report
    }
} 