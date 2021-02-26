package com.example.demosecurity.Controller;


import com.example.demosecurity.Service.auth.OrderService;
import com.example.demosecurity.model.dto.OrderDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("v1/api")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/orders")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public List<OrderDTO> getAll() {
        return orderService.findAll();
    }

    @PostMapping("/order")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public OrderDTO createCategory(@RequestBody OrderDTO orderDTO) {
        return orderService.save(orderDTO);
    }

    @PutMapping(value = "/order/{id}")
    public OrderDTO updateNew(@RequestBody OrderDTO orderDTO, @PathVariable("id") long id) {
        orderDTO.setId(id);
        return orderService.update(orderDTO);
    }

    @DeleteMapping(value = "/order/{id}")
    public void deleteNew(@PathVariable("id") Long id) {
        orderService.delete(id);
    }
}
