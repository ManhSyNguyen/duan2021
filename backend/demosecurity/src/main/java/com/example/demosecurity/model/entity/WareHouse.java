package com.example.demosecurity.model.entity;

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
@Entity(name = "warehouse")
@EntityListeners(AuditingEntityListener.class)
public class WareHouse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdWareHouse")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "IdProductDetail")
    private ProductDetail productDetail;

    private Float price;
    private Integer quantity;
    @CreatedDate
    private Date createdate;

    @CreatedBy
    @Column(name = "createby",columnDefinition = "VARCHAR(40)  NULL")
    private String createby;

    @ManyToMany
    @JoinTable(
            // ten bang lien ket
            name = "warehouse_productdetail",
            joinColumns = {@JoinColumn(name = "IdWareHouse", referencedColumnName = "IdWareHouse")},
            inverseJoinColumns = {@JoinColumn(name = "IdProductDetail", referencedColumnName = "IdProductDetail")}
    )
    Set<ProductDetail> productdetail;
}
