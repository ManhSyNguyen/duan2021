package com.example.demosecurity.Controller;


import com.example.demosecurity.Service.auth.EmailService;
import com.example.demosecurity.Service.auth.OrderService;
import com.example.demosecurity.model.dto.MailRequest;
import com.example.demosecurity.model.dto.OrderDTO;

import com.example.demosecurity.model.entity.Order;
import com.example.demosecurity.model.entity.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("v1/api")
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {
    @Autowired
    private OrderService orderService;
    @Autowired
    private EmailService emailService;

    @GetMapping("/orders")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public List<OrderDTO> getAll(Pageable pageable) {
        return orderService.findAll(pageable);
    }

    @GetMapping("/orders/user")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public List<OrderDTO> getAll(Principal pc) {
        return orderService.findAllByUser(pc.getName());
    }

    @PostMapping("/order")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public OrderDTO createOrder(@RequestBody OrderDTO orderDTO) {
//        if(!orderDTO.getEmail().isEmpty()&&!orderDTO.getNamecustom().isEmpty()) {
//            MailRequest mailRequest = new MailRequest();
//            mailRequest.setName(orderDTO.getNamecustom());
//            mailRequest.setFrom("dhmcolor11@gmail.com");
//            mailRequest.setTo(orderDTO.getEmail());
//            mailRequest.setSubject("Đơn hàng #208WUMU" + orderDTO.getPhone());
//            Map<String, Object> model = new HashMap<>();
//            model.put("Name", mailRequest.getName());
//            model.put("location", "Can Lộc , Hà Tĩnh");
//            model.put("Email", mailRequest.getTo());
//            model.put("Don", "Đơn hàng #208WUMU" + orderDTO.getPhone());
//            emailService.sendEmail(mailRequest, model);
//        }
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
//    @GetMapping("/status")
//    @ResponseStatus(HttpStatus.CREATED)
//    @ResponseBody
//    public List<OrderDTO> getStatus() {
//
//        return orderService.findStatus();
//    }
}
