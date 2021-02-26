package com.example.demosecurity.Repository;



import com.example.demosecurity.model.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProductRepo extends JpaRepository<Product,Long> {
    @Query("SELECT c FROM product c WHERE c.id = :id ")
    Product findProductById(@Param("id") Long id);
    List<Product> findByCategoryId(Long idcategory);
}
