package com.courier.service;

import com.courier.dto.FeedbackRequest;
import com.courier.model.Customer;
import com.courier.model.Booking;
import com.courier.model.Feedback;
import com.courier.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    public Feedback addFeedback(Customer customer, Booking booking, FeedbackRequest request) {
        // Check if feedback already exists for this booking
        List<Feedback> existingFeedback = feedbackRepository.findByBookingId(booking.getId());
        if (!existingFeedback.isEmpty()) {
            throw new RuntimeException("Feedback already exists for this booking");
        }

        Feedback feedback = new Feedback();
        feedback.setCustomer(customer);
        feedback.setBooking(booking);
        feedback.setFeedbackDescription(request.getDescription());
        feedback.setRating(request.getRating());

        return feedbackRepository.save(feedback);
    }

    public List<Feedback> getAllDeliveredFeedback() {
        return feedbackRepository.findAll();
    }

    public List<Feedback> getAllDeliveredFeedbackPaginated(Pageable pageable) {
        Page<Feedback> feedbackPage = feedbackRepository.findAll(pageable);
        return feedbackPage.getContent();
    }
} 