package com.example.demosecurity.Convert;


import com.example.demosecurity.model.dto.SupplierDTO;
import com.example.demosecurity.model.entity.Supplier;
import org.springframework.stereotype.Component;

@Component
public class SupplierConvert {
    public Supplier toEntity(SupplierDTO dto) {
        Supplier entity = new Supplier();
        entity.setNameSupplier(dto.getNameSupplier());
        entity.setTitile(dto.getTitile());
        entity.setAddress(dto.getAddress());
        entity.setStatus(dto.isStatus());
        return entity;
    }

    public SupplierDTO toDTO(Supplier entity) {
        SupplierDTO dto = new SupplierDTO();
        dto.setId(entity.getId());
        dto.setNameSupplier(entity.getNameSupplier());
        dto.setTitile(entity.getTitile());
        dto.setAddress(entity.getAddress());
        dto.setStatus(entity.isStatus());
        dto.setCreatedate(entity.getCreatedate());
        dto.setCreateby(entity.getCreateby());
        return dto;
    }

    public Supplier toEntity(SupplierDTO dto, Supplier entity) {
        entity.setNameSupplier(dto.getNameSupplier());
        entity.setTitile(dto.getTitile());
        entity.setAddress(dto.getAddress());
        entity.setStatus(dto.isStatus());
        return entity;
    }
}
