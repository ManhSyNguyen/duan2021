package com.example.demosecurity.model.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;

@Getter
@Setter
@Entity(name = "customer")
@EntityListeners(AuditingEntityListener.class)
public class Customer implements Serializable {
    @Id
    @Column(name="IdCustomer")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    @Column(length = 100)
    private String Name;
    @Column(length = 30)
    private String email;
    @Column(length = 20)
    private String username;
    @Column(length = 100)
    private String password;
    private Boolean status;
    @CreatedDate
    private Date createdate;
    @CreatedBy
    private String createby;

}
