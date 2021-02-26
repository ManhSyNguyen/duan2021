package com.example.demosecurity.Service.auth;

import com.example.demosecurity.Convert.OrderConvert;
import com.example.demosecurity.Convert.ProductConvert;
import com.example.demosecurity.Convert.ProductDetailConvert;
import com.example.demosecurity.Repository.*;
import com.example.demosecurity.model.dto.OrderDTO;
import com.example.demosecurity.model.dto.OrderProductDetailDTO;
import com.example.demosecurity.model.dto.ProductDetailDTO;
import com.example.demosecurity.model.entity.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderService {
    @Autowired
    private OrderConvert orderConvert;
    @Autowired
    private CustomerRepo customerRepo;
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private ProductDetailRepo productDetailRepo;
    @Autowired
    private OrderRepo orderRepo;
    @Autowired
    private OrderProductDetailRepo orderProductDetailRepo;

    private static final Logger logger = LogManager.getLogger(OrderService.class);

    public OrderDTO save(OrderDTO orderDTO) {
        Order  neworder = new Order();
        neworder = orderConvert.toEntity(orderDTO);
        Customer customer = customerRepo.findCustomersById(orderDTO.getIdcustomer());
        Users users = usersRepository.findUsersById(orderDTO.getIdUser());
        neworder.setCustomer(customer);
        neworder.setUsers(users);
        orderRepo.save(neworder);
        Set<ProductDetailDTO> productDetailList = orderDTO.getProductDetailList();
        if(orderRepo.save(neworder)!=null){
            for (ProductDetailDTO pd : productDetailList){

                OrderProductDetailId opdi = new OrderProductDetailId();
                opdi.setIdOrder(neworder.getId());
                opdi.setIdProductDetail(pd.getId());

                OrderProductDetailDTO orderProductDetaildto = new OrderProductDetailDTO();
                orderProductDetaildto.setId(opdi);
                orderProductDetaildto.setQuantity(pd.getQuantity());
                orderProductDetaildto.setPrice(pd.getPrice());

                OrderProductDetail orderProductDetail = new OrderProductDetail();
                orderProductDetail.setId(orderProductDetaildto.getId());
                orderProductDetail.setQuantity(orderProductDetaildto.getQuantity());
                orderProductDetail.setPrice(orderProductDetaildto.getPrice());

                orderProductDetail.setStatus(1);
                Order order = orderRepo.findOrdersById(orderProductDetaildto.getId().getIdOrder());
                ProductDetail productDetail = productDetailRepo.findProductDetailById(orderProductDetaildto.getId().getIdProductDetail());
                orderProductDetail.setOrder(order);
                orderProductDetail.setProductDetail(productDetail);

                orderProductDetailRepo.save(orderProductDetail);
            }
        }
        return orderConvert.toDTO(neworder);

    }

    public OrderDTO update(OrderDTO orderDTO) {
        Order newOrder = new Order() ;
        Order oldOrder = orderRepo.findOrdersById(orderDTO.getId());
        newOrder = orderConvert.toEntity(orderDTO,oldOrder);
        Customer customer = customerRepo.findCustomersById(orderDTO.getIdcustomer());
        Users users = usersRepository.findUsersById(orderDTO.getIdUser());
        newOrder.setCustomer(customer);
        newOrder.setUsers(users);
        orderRepo.save(newOrder);
        Set<ProductDetailDTO> productDetailList = orderDTO.getProductDetailList();
        if(orderRepo.save(newOrder)!=null){
            for (ProductDetailDTO pd : productDetailList){

                OrderProductDetailId opdi = new OrderProductDetailId();
                opdi.setIdOrder(newOrder.getId());
                opdi.setIdProductDetail(pd.getId());

                OrderProductDetailDTO orderProductDetaildto = new OrderProductDetailDTO();
                orderProductDetaildto.setId(opdi);
                orderProductDetaildto.setQuantity(pd.getQuantity());
                orderProductDetaildto.setPrice(pd.getPrice());

                OrderProductDetail orderProductDetail = new OrderProductDetail();
                orderProductDetail.setId(orderProductDetaildto.getId());
                orderProductDetail.setQuantity(orderProductDetaildto.getQuantity());
                orderProductDetail.setPrice(orderProductDetaildto.getPrice());

                orderProductDetail.setStatus(1);
                Order order = orderRepo.findOrdersById(orderProductDetaildto.getId().getIdOrder());
                ProductDetail productDetail = productDetailRepo.findProductDetailById(orderProductDetaildto.getId().getIdProductDetail());
                orderProductDetail.setOrder(order);
                orderProductDetail.setProductDetail(productDetail);

                orderProductDetailRepo.save(orderProductDetail);
            }
        }
        return orderConvert.toDTO(newOrder);

    }

    public void delete(Long id) {
        try {
            Optional<Order> order = orderRepo.findById(id);
            if(order!=null){

                List<OrderProductDetail> dt = orderProductDetailRepo.findOrderProductDetailBys(id);
                        if(dt!=null){
                            for (OrderProductDetail xoa : dt){
                                orderProductDetailRepo.delete(xoa);
                            }
                            orderRepo.deleteById(id);
                        }else{
                            logger.error("Không được phép xóa");
                        }
            }
        }catch (Exception e){
            logger.error(e.getMessage());
        }
    }


    public List<OrderDTO> findAll(Pageable pageable) {
        List<OrderDTO> results = new ArrayList<>();
        try {
            List<Order> entities = orderRepo.findAll(pageable).getContent();
            for (Order item: entities) {
                OrderDTO productDetailDTO = orderConvert.toDTO(item);
                results.add(productDetailDTO);
            }
            return results;
        }catch (Exception e) {
            logger.error(e.getMessage());
        }
        return results;
    }


    public int totalItem() {
        try {
            return (int) orderRepo.count();
        }catch (Exception e){
            logger.error(e.getMessage());
        }
        return 1;
    }

    public List<OrderDTO> findAll() {
        List<OrderDTO> results = new ArrayList<>();
        List<Order> entities = orderRepo.findAll();
        for (Order item: entities) {
            OrderDTO newDTO = orderConvert.toDTO(item);
            results.add(newDTO);
        }
        return results;
    }
}
