package com.example.demosecurity.Repository;

import com.example.demosecurity.model.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SupplierRepo extends JpaRepository<Supplier,Long> {
    @Query("SELECT c FROM supplier c WHERE c.Id = :id ")
    Supplier findSupplierById(@Param("id") Long id);
}
