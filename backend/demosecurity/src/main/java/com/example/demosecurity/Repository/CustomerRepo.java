package com.example.demosecurity.Repository;

import com.example.demosecurity.model.entity.Customer;
import com.example.demosecurity.model.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepo extends JpaRepository<Customer,Long> {
    @Query("SELECT c FROM customer c WHERE c.Id = :id ")
    Customer findCustomersById(@Param("id") Long id);
}
