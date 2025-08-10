package com.courier.repository;

import com.courier.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    
    Optional<Customer> findByEmail(String email);
    
    Optional<Customer> findByUniqueId(String uniqueId);
    
    Optional<Customer> findByEmailAndPassword(String email, String password);
    
    boolean existsByEmail(String email);
} 