package com.example.demosecurity.Repository;

import com.example.demosecurity.model.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepo extends JpaRepository<Order,Long> {
    @Query("select o FROM orders o where o.Id = :id")
    Order findOrdersById(@Param("id") Long id);
    @Query("select o.status FROM orders o ")
    List<Order> getByStatus();
    @Query("select o FROM orders o where o.users.username = :username")
    List<Order> findOrdersByUsers(@Param("username") String name);
}
