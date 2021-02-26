package com.example.demosecurity.model.dto;

import com.example.demosecurity.model.entity.CartProductDetail;
import com.example.demosecurity.model.entity.Customer;
import com.example.demosecurity.model.entity.ProductDetail;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;


import java.util.Date;
import java.util.Set;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CartDTO {
    private Long id;
    private Long idcustomer;
    private Customer customer;
    private String namecustom;
    private String email;
    private String phone;
    private String address;
    private String paymentmethod;
    private String decription;
    @CreatedDate
    private Date createdate;
    @CreatedBy
    private String createby;
    private Integer status;
    private Set<ProductDetailDTO> ProductDetails;

}
