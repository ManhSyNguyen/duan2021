package com.example.demosecurity.Controller;

import com.example.demosecurity.Service.auth.ProductService;
import com.example.demosecurity.model.dto.CategoryDTO;
import com.example.demosecurity.model.dto.ProductDTO;
import com.example.demosecurity.model.entity.Category;
import com.example.demosecurity.model.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("v1/api")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/products")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public List<ProductDTO> getAll() {
        return productService.findAll();
    }

<<<<<<< HEAD
<<<<<<< HEAD
=======
    @GetMapping("/products/categorys/{id}")
=======
>>>>>>> duong
    @GetMapping("/product/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public ProductDTO getProductById(@PathVariable(value ="id") long id)
    {
        return productService.findProductById(id);
    }

    @GetMapping("/products/{id}/categorys")
<<<<<<< HEAD
=======
    @GetMapping("/products/categorys/{id}")
>>>>>>> 21a4fa5fcb96ff71dd743660a07b8ad2c26a1c5e
=======
>>>>>>> hai
>>>>>>> duong
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public List<ProductDTO> getProductByCategory(@PathVariable(value ="id") long id) {
        return productService.getProductByCategory(id);
    } 

    @PostMapping("/product")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public ProductDTO createCategory(@RequestBody ProductDTO productDTO) {
        return productService.save(productDTO);
    }

    @PutMapping(value = "/product/{id}")
    public ProductDTO updateNew(@RequestBody ProductDTO productDTO, @PathVariable("id") long id) {
        productDTO.setId(id);
        return productService.update(productDTO);
    }

    @DeleteMapping(value = "/product/{id}")
    public void deleteNew(@PathVariable("id") Long id) {
        productService.delete(id);
    }
}
