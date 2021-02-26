package com.example.demosecurity.Repository;

import com.example.demosecurity.model.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {
    Users findByUsername(String username);
    @Query("SELECT c FROM users c WHERE c.id = :id ")
    Users findUsersById(@Param("id") Long id);
}
