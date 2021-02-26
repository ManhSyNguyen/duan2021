package com.example.demosecurity.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Embeddable;
import java.io.Serializable;
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class CartProductDetailId implements Serializable {

    private Long IdCart;
    private Long IdProductDetail;

}
