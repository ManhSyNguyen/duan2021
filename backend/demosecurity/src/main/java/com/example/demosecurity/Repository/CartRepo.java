package com.example.demosecurity.Repository;

import com.example.demosecurity.model.entity.Cart;
import com.example.demosecurity.model.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepo extends JpaRepository<Cart,Long> {
    @Query("select o FROM cart o where o.id = :id")
    Cart findCartById(@Param("id") Long id);

    @Query("select c.status FROM cart c")
    List<Cart> findCartByStatus();
}
