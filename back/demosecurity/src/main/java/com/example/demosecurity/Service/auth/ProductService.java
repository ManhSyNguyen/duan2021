package com.example.demosecurity.Service.auth;

import com.example.demosecurity.Convert.ProductConvert;
import com.example.demosecurity.Repository.CategoryRep;
import com.example.demosecurity.Repository.ProductRepo;
import com.example.demosecurity.model.dto.ProductDTO;
import com.example.demosecurity.model.entity.Category;
import com.example.demosecurity.model.entity.Product;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepo productRepo;
    @Autowired
    private CategoryRep categoryRep;
    @Autowired
    private ProductConvert productConvert;

    private static final Logger logger = LogManager.getLogger(ProductService.class);

    public ProductDTO save(ProductDTO productDTO) {
        Product product= new Product();
        Category category = categoryRep.findCategoryById(productDTO.getIdcategory());
        product = productConvert.toEntity(productDTO);
        product.setCategory(category);
        productRepo.save(product);
        return productConvert.toDTO(product);
    }

    public ProductDTO update(ProductDTO productDTO) {
        Product newroduct= new Product() ;
        Product oldproduct = productRepo.findProductById(productDTO.getId());
        newroduct = productConvert.toEntity(productDTO,oldproduct);
        Category category = categoryRep.findCategoryById(productDTO.getIdcategory());
        newroduct.setCategory(category);
        productRepo.save(newroduct);
        return productConvert.toDTO(newroduct);

    }

    public void delete(Long id) {
        try {
            Optional<Product> product = productRepo.findById(id);
            if(product!=null){
                productRepo.deleteById(id);
            }
        }catch (Exception e){
            logger.error(e.getMessage());
        }
    }


    public List<ProductDTO> findAll(Pageable pageable) {
        List<ProductDTO> results = new ArrayList<>();
        try {
            List<Product> entities = productRepo.findAll(pageable).getContent();
            for (Product item: entities) {
                ProductDTO productDTO = productConvert.toDTO(item);
                results.add(productDTO);
            }
            return results;
        }catch (Exception e) {
            logger.error(e.getMessage());
        }
        return results;
    }


    public int totalItem() {
        try {
            return (int) productRepo.count();
        }catch (Exception e){
            logger.error(e.getMessage());
        }
        return 1;
    }

    public List<ProductDTO> findAll() {
        List<ProductDTO> results = new ArrayList<>();
        List<Product> entities = productRepo.findAll();
        for (Product item: entities) {
            ProductDTO newDTO = productConvert.toDTO(item);
            results.add(newDTO);
        }
        return results;
    }
    public List<ProductDTO> getProductByCategory(long id) {
        List<ProductDTO> results = new ArrayList<>();
        List<Product> entities = productRepo.findByCategoryId(id);
        System.out.println(entities);
        for (Product item: entities) {
            ProductDTO newDTO = productConvert.toDTO(item);
            results.add(newDTO);
        }
        return results;
    }
}
