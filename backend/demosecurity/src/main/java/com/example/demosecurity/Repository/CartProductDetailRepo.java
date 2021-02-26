package com.example.demosecurity.Repository;

import com.example.demosecurity.model.entity.CartProductDetail;
import com.example.demosecurity.model.entity.OrderProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartProductDetailRepo extends JpaRepository<CartProductDetail,Long> {
    @Query("select o FROM cartproductdetail o where o.cart.id = :id")
    List<CartProductDetail> findCartProductDetailBys(@Param("id") Long id);
}
