package com.example.demosecurity.model.entity;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @Column(unique=true,name = "username",columnDefinition = "VARCHAR(20)  NULL")
    private String username;

    @Column(name = "password",columnDefinition = "VARCHAR(100)  NULL")
    @JsonIgnore
    private String password;

    @Column(unique=true,name = "email",columnDefinition = "VARCHAR(35)  NULL")
    private String email;

    @Column(unique=true,name = "sodienthoai",columnDefinition = "VARCHAR(10)  NULL")
    private String sodienthoai;

    @CreatedDate
    private Date createdate;

    @CreatedBy
    private String createby;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "IdUser"), inverseJoinColumns = @JoinColumn(name = "IdRole"))
    private Set<Role> roles;

    public Users() {
    }

    public Users(String username, String password, String email,String sodienthoai) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.sodienthoai=sodienthoai;
    }
}
