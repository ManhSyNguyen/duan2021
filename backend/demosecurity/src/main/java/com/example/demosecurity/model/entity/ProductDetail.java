package com.example.demosecurity.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.Set;

@Getter
@Setter
@Entity(name = "productdetail")
@EntityListeners(AuditingEntityListener.class)
public class ProductDetail implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdProductDetail")
    private Long id;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "IdProduct")
    private Product product;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "IdColor")
    private Color color;
    private String sku;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "IdSize")
    private Size size;

    @OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name = "IdProductDetail")
    @JsonIgnore
    private Collection<OrderProductDetail> sales = new ArrayList<>();

    private Integer quantity;
    private Integer status;

    @CreatedDate
    private Date createdate;
    @Column(length = 50)
    @CreatedBy
    private String createby;

}
