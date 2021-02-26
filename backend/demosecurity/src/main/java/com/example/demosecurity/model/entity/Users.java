package com.example.demosecurity.model.entity;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Setter
@Entity(name = "users")
@EntityListeners(AuditingEntityListener.class)
public class Users {
    @Id
    @Column(name = "IdUser")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "username",columnDefinition = "VARCHAR(50)  NULL")
    private String username;
    @Column(name = "password",columnDefinition = "VARCHAR(100)  NULL")
    private String password;
    @Column(name = "email",columnDefinition = "VARCHAR(40)  NULL")
    private String email;
    @CreatedDate
    private Date createdate;
    @CreatedBy
    private String createby;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "IdUser"), inverseJoinColumns = @JoinColumn(name = "IdRole"))
    private Set<Role> roles;



}
