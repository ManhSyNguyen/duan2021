package com.example.demosecurity.model.dto;

import com.example.demosecurity.model.entity.CartProductDetailId;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CartProductDetailDTO {
    private CartProductDetailId id;
    private Integer quantity;
    private Float price;
    private Integer status ;
}
