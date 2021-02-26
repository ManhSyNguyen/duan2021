package com.example.demosecurity.model.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@Entity(name = "supplier")
@EntityListeners(AuditingEntityListener.class)
public class Supplier  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdSupplier")
    private Long Id;
    private String NameSupplier;
    private String Titile;
    @Column(name = "Address",columnDefinition = "VARCHAR(150)  NULL")
    private String Address;
    private boolean status;
    @CreatedDate
    private Date createdate;
    @CreatedBy
    @Column(name = "createby",columnDefinition = "VARCHAR(30)  NULL")
    private String createby;

}
