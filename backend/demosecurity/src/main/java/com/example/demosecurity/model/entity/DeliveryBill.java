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

@Setter
@Getter
@Entity(name = "deliverybill")
@EntityListeners(AuditingEntityListener.class)
public class DeliveryBill implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdDeliverybill")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "IdUser")
    private Users users;

    @ManyToOne
    @JoinColumn(name = "IdWareHouse")
    private WareHouse wareHouse;


    private Integer realquantity;
    private Integer quantityexported;
    @CreatedDate
    private Date createdate;
    @Column(length = 50)
    @CreatedBy
    private String createby;

    @ManyToMany
    @JoinTable(
            // ten bang lien ket
            name = "deliverybill_productdetail",
            joinColumns = {@JoinColumn(name = "IdDeliverybill", referencedColumnName = "IdDeliverybill")},
            inverseJoinColumns = {@JoinColumn(name = "IdProductDetail", referencedColumnName = "IdProductDetail")}
    )
    Set<ProductDetail> productdetail;
}
