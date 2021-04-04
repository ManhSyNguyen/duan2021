package com.example.demosecurity.Controller;

import com.example.demosecurity.Repository.SupplierRepo;
import com.example.demosecurity.Service.auth.SupplierService;
import com.example.demosecurity.model.dto.CategoryDTO;
import com.example.demosecurity.model.dto.SupplierDTO;
import com.example.demosecurity.model.entity.Supplier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("v1/api")
public class SupplierController {

    @Autowired
    private SupplierService supplierService;


    @GetMapping("/suppliers")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public List<SupplierDTO> getAll() {
        return supplierService.findAll();
    }

    @PostMapping("/supplier")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public SupplierDTO createCategory(@RequestBody SupplierDTO supplierDTO) {
        return supplierService.save(supplierDTO);
    }

    @PutMapping(value = "/supplier/{id}")
    public SupplierDTO updateNew(@RequestBody SupplierDTO supplierDTO, @PathVariable("id") long id) {
        supplierDTO.setId(id);
        return supplierService.update(supplierDTO);
    }

    @DeleteMapping(value = "/supplier/{id}")
    public void deleteNew(@PathVariable("id") Long id) {
        supplierService.delete(id);
    }
}
