package com.example.demosecurity.Controller;


import com.example.demosecurity.Service.auth.EmailService;
import com.example.demosecurity.Service.auth.OrderService;
import com.example.demosecurity.model.dto.Bom;
import com.example.demosecurity.model.dto.MailRequest;
import com.example.demosecurity.model.dto.OrderDTO;

import com.example.demosecurity.model.entity.Order;
import com.example.demosecurity.model.entity.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("v1/api")
@CrossOrigin(origins = "*")
public class OrderController {
    @Autowired
    private OrderService orderService;
    @Autowired
    private EmailService emailService;

    @GetMapping("/orders")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public List<OrderDTO> getAll() {
        return orderService.findAll();
    }

    @GetMapping("orders/boom")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public List<Order> getOrderByDom() {
        return orderService.findAllOrderByBoom();
    }
    @GetMapping("orders/boom/{phone}")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public List<Order> getOrderByDomAndPhone(@PathVariable String phone) {
        return orderService.findAllOrderByBoomAndPhone(phone);
    }

    @GetMapping("/orders/status")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Integer> getStatus() {
        return orderService.findStatus();
    }

    @GetMapping("/orders/bystatus/{status}")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Order> getOrderAllByStatus(@PathVariable Integer status)  {
        return orderService.findOrderBySatatus(status);
    }

    @GetMapping("/orders/user")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Order> findOrderByUser(Principal pc)  {
        return orderService.findOrderByUsername(pc.getName());
    }
// đây là api lấy hóa đơn theo user
    @GetMapping("/orders/user/{status}")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Order> findOrderByUserAndStatus(@PathVariable("status") Integer status, Principal pc)  {
        return orderService.findOrderByUsernameAndStatus(status,pc.getName());
    }

    @GetMapping("/orders/sku/{sku}")
    @ResponseStatus(HttpStatus.CREATED)
    public Order findOrderBySku(@PathVariable("sku") String sku)  {
        return orderService.findOrderBySku(sku);
    }




    @PostMapping("/orders")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public OrderDTO createOrder(@RequestBody OrderDTO orderDTO,Principal pc) {
        if(!orderDTO.getEmail().isEmpty()&&!orderDTO.getNamecustom().isEmpty()) {
            MailRequest mailRequest = new MailRequest();
            mailRequest.setName(orderDTO.getNamecustom());
            mailRequest.setFrom("dhmcolor11@gmail.com");
            mailRequest.setTo(orderDTO.getEmail());
            mailRequest.setSubject("Đơn hàng #208WUMU" + orderDTO.getPhone());
            Map<String, Object> model = new HashMap<>();
            model.put("Name", mailRequest.getName());
            model.put("location", "Can Lộc , Hà Tĩnh");
            model.put("Email", mailRequest.getTo());
            model.put("Don", "Đơn hàng #208WUMU" + orderDTO.getPhone());
            emailService.sendEmail(mailRequest, model);
        }
        if(pc!=null){
            return orderService.save(orderDTO,pc.getName());
        }else{
            return orderService.save(orderDTO,null);
        }

    }

    @PutMapping(value = "/orders/{id}")
    public OrderDTO updateNew(@RequestBody OrderDTO orderDTO, @PathVariable("id") long id) {
        orderDTO.setId(id);
        return orderService.update(orderDTO);
    }


    @DeleteMapping(value = "/orders/{id}")
    public void deleteNew(@PathVariable("id") Long id) {
        orderService.delete(id);
    }


}
