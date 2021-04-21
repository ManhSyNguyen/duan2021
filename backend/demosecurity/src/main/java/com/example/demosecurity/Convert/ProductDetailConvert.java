package com.example.demosecurity.Convert;

import com.example.demosecurity.model.dto.ProductDetailDTO;
import com.example.demosecurity.model.entity.ProductDetail;
import org.springframework.stereotype.Component;

@Component
public class ProductDetailConvert {
    public ProductDetail toEntity(ProductDetailDTO dto) {
        ProductDetail entity = new ProductDetail();
        entity.setQuantityProduct(dto.getQuantityProduct());
        entity.setStatus(dto.getStatus());
        return entity;
    }

    public ProductDetailDTO toDTO(ProductDetail entity) {
        ProductDetailDTO dto = new ProductDetailDTO();
        dto.setId(entity.getId());
        dto.setProduct(entity.getProduct());
        dto.setColor(entity.getColor());
        dto.setSize(entity.getSize());
        dto.setStatus(entity.getStatus());
<<<<<<< HEAD
=======
        dto.setSku(entity.getSku());
>>>>>>> hai
        dto.setCreatedate(entity.getCreatedate());
        dto.setCreateby(entity.getCreateby());
        return dto;
    }

    public ProductDetail toEntity(ProductDetailDTO dto, ProductDetail entity) {
<<<<<<< HEAD
        entity.setQuantity(dto.getQuantity());
=======
        String generatedString = RandomStringUtils.randomAlphanumeric(7);
        entity.setQuantityProduct(dto.getQuantityProduct());
>>>>>>> hai
        entity.setStatus(dto.getStatus());
        return entity;
    }
}
