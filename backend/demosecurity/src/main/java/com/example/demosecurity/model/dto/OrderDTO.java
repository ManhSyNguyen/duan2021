package com.example.demosecurity.model.dto;


import com.example.demosecurity.model.entity.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
    private Long Id;
    private Users user;
    private Long idUser;
    private Long idcustomer;
    private String namecustom;
    private String email;
    private String phone;
    private String address;
    private String paymentmethod;
    private String decription;
    private String quantityOrder;
    private Float totalMonenyOrder;
    private Float deposit;
    private String sku;
    private Integer reason;
    private Integer vat;
    private Integer boom;
    private Integer status;
    private Date createdate;
    private String createby;
    private Set<ProductDetailDTO> productDetailList ;
    private Set<OrderProductDetail> orderProductDetails ;
}
