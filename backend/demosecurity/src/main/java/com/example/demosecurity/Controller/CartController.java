package com.example.demosecurity.Controller;

import com.example.demosecurity.Service.auth.CartService;
import com.example.demosecurity.Service.auth.CategoryService;
import com.example.demosecurity.Service.auth.OrderService;
import com.example.demosecurity.model.dto.CartDTO;
import com.example.demosecurity.model.dto.CategoryDTO;
import com.example.demosecurity.model.entity.Cart;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("v1/api")
@CrossOrigin(origins = "http://localhost:4200")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/carts")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public List<CartDTO> getAll() {
        return cartService.findAll();
    }

    @PostMapping("/cart")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public CartDTO createCategory(@RequestBody CartDTO cartDTO) {
        return cartService.save(cartDTO);
    }

    @PutMapping(value = "/cart/{id}")
    public CartDTO updateNew(@RequestBody CartDTO cartDTO, @PathVariable("id") long id) {
        cartDTO.setId(id);
        return cartService.update(cartDTO);
    }

    @DeleteMapping(value = "/cart/{id}")
    public void deleteNew(@PathVariable("id") Long id) {
        cartService.delete(id);
    }

    @GetMapping("cart/status")
    public List<Cart> getSatus(){
        return cartService.findCartByStatus();
    }
}
