package com.example.demosecurity.Repository;

import com.example.demosecurity.model.dto.ERole;
import com.example.demosecurity.model.entity.Role;
import com.example.demosecurity.model.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByNamerole(ERole name);
    List<Role> findAll();
}

