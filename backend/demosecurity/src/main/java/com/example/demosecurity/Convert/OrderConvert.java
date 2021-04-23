package com.example.demosecurity.Convert;

import com.example.demosecurity.model.dto.OrderDTO;
import com.example.demosecurity.model.dto.ProductDetailDTO;
import com.example.demosecurity.model.entity.Order;
import com.example.demosecurity.model.entity.ProductDetail;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class OrderConvert {
    public String getAlphaNumericString(int n)
    {
        // chose a Character random from this String
        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                + "0123456789"
                + "abcdefghijklmnopqrstuvxyz";

        // create StringBuffer size of AlphaNumericString
        StringBuilder sb = new StringBuilder(n);
        for (int i = 0; i < n; i++) {
            // generate a random number between
            // 0 to AlphaNumericString variable length
            int index
                    = (int)(AlphaNumericString.length()
                    * Math.random());
            // add Character one by one in end of sb
            sb.append(AlphaNumericString
                    .charAt(index));
        }
        return sb.toString();
    }
    public Order toEntity(OrderDTO dto) {
        Order entity = new Order();
        entity.setPhone(dto.getPhone());
        entity.setNamecustom(dto.getNamecustom());
        entity.setEmail(dto.getEmail());
        entity.setAddress(dto.getAddress());
        entity.setSku(getAlphaNumericString(5));
        entity.setPaymentmethod(dto.getPaymentmethod());
        entity.setStatus(dto.getStatus());
        entity.setTotalMonenyOrder(dto.getTotalMonenyOrder());
        return entity;
    }

    public OrderDTO toDTO(Order entity) {
        OrderDTO dto = new OrderDTO();
        dto.setId(entity.getId());
        dto.setNamecustom(entity.getNamecustom());
        dto.setUser(entity.getUsers());
        dto.setPhone(entity.getPhone());
        dto.setAddress(entity.getAddress());
        dto.setStatus(entity.getStatus());
        dto.setCreatedate(entity.getCreatedate());
        dto.setCreateby(entity.getCreateby());
        entity.setPaymentmethod(dto.getPaymentmethod());
        dto.setOrderProductDetails(entity.getOrderProductDetails());
        return dto;
    }

    public Order toEntity(OrderDTO dto, Order entity) {
        entity.setPhone(dto.getPhone());
        entity.setNamecustom(dto.getNamecustom());
        entity.setEmail(dto.getEmail());
        entity.setAddress(dto.getAddress());
        if(dto.getStatus()==0){
            entity.setQuantityOrder(dto.getQuantityOrder());
        }
        entity.setTotalMonenyOrder(dto.getTotalMonenyOrder());
        entity.setPaymentmethod(dto.getPaymentmethod());
        entity.setStatus(dto.getStatus());
        return entity;
    }
}
