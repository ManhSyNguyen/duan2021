package com.example.demosecurity.Service.auth;

import com.example.demosecurity.Convert.SupplierConvert;
import com.example.demosecurity.Repository.SupplierRepo;
import com.example.demosecurity.model.dto.CategoryDTO;
import com.example.demosecurity.model.dto.SupplierDTO;
import com.example.demosecurity.model.entity.Category;
import com.example.demosecurity.model.entity.Supplier;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
public class SupplierService {
    private static final Logger logger = LogManager.getLogger(SupplierService.class);
@Autowired
private SupplierRepo supplierRepo;
@Autowired
private SupplierConvert supplierConvert;

    public SupplierDTO save(SupplierDTO supplierDTO) {
        Supplier supplier = supplierConvert.toEntity(supplierDTO);
        supplierRepo.save(supplier);
        return supplierConvert.toDTO(supplier);
    }

    public SupplierDTO update(SupplierDTO supplierDTO) {
        Supplier newSupplier ;
        Supplier oldSupplier= supplierRepo.findSupplierById(supplierDTO.getId());
        newSupplier = supplierConvert.toEntity(supplierDTO,oldSupplier);
        supplierRepo.save(newSupplier);
        return supplierConvert.toDTO(newSupplier);

    }

    public void delete(Long id) {
        try {
            Supplier supplier= supplierRepo.findSupplierById(id);
            if(supplier!=null){
                supplierRepo.deleteById(id);
            }
        }catch (Exception e){
            logger.error(e.getMessage());
        }
    }


    public List<SupplierDTO> findAll(Pageable pageable) {
        List<SupplierDTO> results = new ArrayList<>();
        try {
            List<Supplier> entities = supplierRepo.findAll(pageable).getContent();
            for (Supplier item: entities) {
                SupplierDTO categoryDTO = supplierConvert.toDTO(item);
                results.add(categoryDTO);
            }
            return results;
        }catch (Exception e) {
            logger.error(e.getMessage());
        }
        return results;
    }


    public int totalItem() {
        try {
            return (int) supplierRepo.count();
        }catch (Exception e){
            logger.error(e.getMessage());
        }
        return 1;
    }

    public List<SupplierDTO> findAll() {
        List<SupplierDTO> results = new ArrayList<>();
        List<Supplier> entities = supplierRepo.findAll();
        for (Supplier item: entities) {
            SupplierDTO newDTO = supplierConvert.toDTO(item);
            results.add(newDTO);
        }
        return results;
    }
}
