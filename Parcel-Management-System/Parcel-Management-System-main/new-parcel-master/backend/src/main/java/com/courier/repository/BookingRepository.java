package com.courier.repository;

import com.courier.model.Booking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    
    Optional<Booking> findByBookingId(String bookingId);
    
    List<Booking> findByCustomerIdOrderByCreatedAtDesc(Long customerId);
    
    Page<Booking> findByCustomerIdOrderByCreatedAtDesc(Long customerId, Pageable pageable);
    
    Page<Booking> findAllByOrderByCreatedAtDesc(Pageable pageable);
    
    @Query("SELECT b FROM Booking b WHERE b.customer.id = :customerId " +
           "AND (:bookingId IS NULL OR b.bookingId LIKE %:bookingId%) " +
           "AND (:status IS NULL OR b.parcelStatus = :status) " +
           "ORDER BY b.createdAt DESC")
    Page<Booking> findByCustomerIdAndFilters(
        @Param("customerId") Long customerId,
        @Param("bookingId") String bookingId,
        @Param("status") String status,
        Pageable pageable
    );
} 