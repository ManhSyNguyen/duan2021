package com.example.demosecurity.model.dto;

import com.example.demosecurity.model.entity.Category;
import com.example.demosecurity.model.entity.ProductDetail;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    private Long id;
    private Long idcategory;
    private Category category;
    private String nameproduct;
    private Set<ProductDetailDTO> productDetails;
    private Set<ProductDetail> list;
    private Float priceProduct;
    private Integer status;
    private String image;
    private String decription;
    private Integer purchase;
    private Date createdate;
    private String createby;


}
