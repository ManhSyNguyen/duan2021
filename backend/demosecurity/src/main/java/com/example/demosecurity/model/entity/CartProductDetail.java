package com.example.demosecurity.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "cartproductdetail")
public class CartProductDetail {
    @EmbeddedId
    private CartProductDetailId id;

    @ManyToOne
    @MapsId("IdCart")
    @JoinColumn(name = "IdCart")
    @JsonIgnore
    private Cart cart;

    @ManyToOne
    @MapsId("IdProductDetail")
    @JoinColumn(name = "IdProductDetail")
    private ProductDetail productDetail;

    private Integer quantity;
    private float price;
    private Integer status ;

}
