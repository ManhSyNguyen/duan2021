package com.example.demosecurity.Repository;

import com.example.demosecurity.model.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepo extends JpaRepository<Order,Long> {
    @Query("select o FROM orders o where o.Id = :id")
    Order findOrdersById(@Param("id") Long id);
}
