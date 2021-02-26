package com.example.demosecurity.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Setter
@Getter
@EntityListeners(AuditingEntityListener.class)
@Entity(name = "cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdCart")
    private Long id;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "IdCustomer")
    private Customer customer;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name ="IdCart")
    private Set<CartProductDetail>  cartProductDetails;

    @Column(length = 15)
    private String phone;

    @Column(length = 200)
    private String address;


    @CreatedDate
    private Date createdate;
    @Column(length = 50)
    @CreatedBy
    private String createby;
    private Integer status;
}
