package com.example.demosecurity.Repository;

import com.example.demosecurity.model.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {
    Users findUsersById(@Param("id") Long id);
    Optional<Users> findByUsername(String username);
    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
    Boolean existsBySodienthoai(String sodienthoai);
}
