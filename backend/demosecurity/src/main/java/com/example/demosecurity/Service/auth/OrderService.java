package com.example.demosecurity.Service.auth;

import com.example.demosecurity.Convert.OrderConvert;
import com.example.demosecurity.Convert.ProductConvert;
import com.example.demosecurity.Convert.ProductDetailConvert;
import com.example.demosecurity.Repository.*;
import com.example.demosecurity.model.dto.Bom;
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
    private UsersRepository usersRepository;
    @Autowired
    private ProductDetailRepo productDetailRepo;
    @Autowired
    private OrderRepo orderRepo;
    @Autowired
    private OrderProductDetailRepo orderProductDetailRepo;

    private static final Logger logger = LogManager.getLogger(OrderService.class);

    public OrderDTO save(OrderDTO orderDTO,String name) {
        System.out.println(orderDTO.getTotalMonenyOrder());
        Order neworder = new Order();
        neworder = orderConvert.toEntity(orderDTO,name);
        Users users = usersRepository.findUsersById(orderDTO.getIdUser());
        neworder.setUsers(users);
        orderRepo.save(neworder);
        Set<ProductDetailDTO> productDetailList = orderDTO.getProductDetailList();
        if (orderRepo.save(neworder) != null) {
            for (ProductDetailDTO pd : productDetailList) {
                OrderProductDetailId opdi = new OrderProductDetailId();
                opdi.setIdOrder(neworder.getId());
                opdi.setIdProductDetail(pd.getId());
                OrderProductDetailDTO orderProductDetaildto = new OrderProductDetailDTO();
                orderProductDetaildto.setId(opdi);
                orderProductDetaildto.setQuantity(pd.getPriceProductDetail());
                orderProductDetaildto.setPrice(pd.getProduct().getPriceProduct() * pd.getPriceProductDetail());


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
        Order newOrder;
        Order oldOrder = orderRepo.findOrdersById(orderDTO.getId());
        newOrder = orderConvert.toEntityToDTO(orderDTO, oldOrder);
        Users users = usersRepository.findUsersById(orderDTO.getIdUser());
        newOrder.setUsers(users);
        Set<ProductDetailDTO> productDetailList = orderDTO.getProductDetailList();
        float totalMoney = 0;
        if (orderRepo.save(newOrder) != null) {
            for (ProductDetailDTO pd : productDetailList) {

                OrderProductDetailId opdi = new OrderProductDetailId();
                opdi.setIdOrder(newOrder.getId());
                opdi.setIdProductDetail(pd.getId());

                OrderProductDetailDTO orderProductDetaildto = new OrderProductDetailDTO();
                orderProductDetaildto.setId(opdi);

                orderProductDetaildto.setQuantity(pd.getPriceProductDetail());
                orderProductDetaildto.setPrice(pd.getProduct().getPriceProduct()*pd.getQuantityProduct());

                OrderProductDetail orderProductDetail = new OrderProductDetail();
                orderProductDetail.setId(orderProductDetaildto.getId());

                orderProductDetail.setQuantity(orderProductDetaildto.getQuantity());
                Float totalorderdetail = orderProductDetaildto.getQuantity() * pd.getProduct().getPriceProduct();
                orderProductDetail.setPrice(totalorderdetail);
                orderProductDetail.setStatus(orderProductDetaildto.getStatus());
                totalMoney += totalorderdetail;
                Order order = orderRepo.findOrdersById(orderProductDetaildto.getId().getIdOrder());
                ProductDetail productDetail = productDetailRepo.findProductDetailById(orderProductDetaildto.getId().getIdProductDetail());
                if (orderDTO.getStatus().equals(4) && productDetail.getQuantityProduct() > 0) {
                    productDetail.setId(pd.getId());
                    int total = productDetail.getQuantityProduct() - pd.getQuantityProduct();
                    productDetail.setQuantityProduct(total);
                    if (total == 0) {
                        productDetail.setStatus(0);
                    }
                }
                productDetail.setProduct(pd.getProduct());
                productDetail.setColor(pd.getColor());
                productDetail.setSize(pd.getSize());
                productDetailRepo.save(productDetail);
                orderProductDetail.setOrder(order);
                orderProductDetail.setProductDetail(productDetail);
                orderProductDetailRepo.save(orderProductDetail);
            }
        }
        // dang sửa luồng mua hàng ở chỗ thêm tổng tiền vào hóa đơn
        return orderConvert.toDTO(newOrder);

    }

    public void delete(Long id) {
        try {
            Optional<Order> order = orderRepo.findById(id);
            if (order != null) {

                List<OrderProductDetail> dt = orderProductDetailRepo.findOrderProductDetailBys(id);
                if (dt != null) {
                    for (OrderProductDetail xoa : dt) {
                        orderProductDetailRepo.delete(xoa);
                    }
                    orderRepo.deleteById(id);
                } else {
                    logger.error("Không được phép xóa");
                }
            }
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
    }


    public List<OrderDTO> findAll(Pageable pageable) {
        List<OrderDTO> results = new ArrayList<>();
        try {
            List<Order> entities = orderRepo.findAll(pageable).getContent();
            for (Order item : entities) {
                OrderDTO productDetailDTO = orderConvert.toDTO(item);
                results.add(productDetailDTO);
            }
            return results;
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return results;
    }


    public int totalItem() {
        try {
            return (int) orderRepo.count();
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return 1;
    }

    public List<OrderDTO> findAll() {
        List<OrderDTO> results = new ArrayList<>();
        List<Order> entities = orderRepo.findAll();
        for (Order item : entities) {
            OrderDTO newDTO = orderConvert.toDTO(item);
            results.add(newDTO);
        }
        return results;
    }
    public List<Order> findAllOrderByBoom() {
        Integer boom = 0;
        List list = new ArrayList() ;
            List<String> entities1 = orderRepo.findDistinctByPhone(boom);
            for (String o : entities1) {
                List<Order> entities = orderRepo.findAllByBoomGreaterThanAndPhone(boom,o);
                Integer dem=0;
                for (Order item : entities) {
                    if (item.getPhone().equals(o) && dem==0) {
                        dem++;
                        Integer bom = orderRepo.countByBoomAndBoomGreaterThanEqual(0, o);
                        item.setBoom(bom);
                        list.add(item);
                    }
                }
            }
           return list;
    }

    public List<Order> findAllOrderByBoomAndPhone(String phone) {
        Integer boom = 0;
        List list = new ArrayList() ;
        List<Order> entities = orderRepo.findAllByBoomGreaterThanAndPhone(boom,phone);
        Integer dem=0;
        for (Order item : entities) {
            if (item.getPhone().equals(phone) && dem==0) {
                dem++;
                Integer bom = orderRepo.countByBoomAndBoomGreaterThanEqual(0, phone);
                item.setBoom(bom);
                list.add(item);
            }
        }
        return  list;

    }

    public List<OrderDTO> findAllByUser(String username) {
        List<OrderDTO> results = new ArrayList<>();
        List<Order> entities = orderRepo.findAll();
        for (Order item : entities) {
            OrderDTO newDTO = orderConvert.toDTO(item);
            results.add(newDTO);
        }
        return results;
    }

    public List<Integer> findStatus() {
        List<Integer> entities = orderRepo.getByStatus();
        return entities;
    }

    public List<Order> findOrderBySatatus(Integer status) {
        List<Order> list = orderRepo.findAllByStatus(status);
        return list;
    }

    public List<Order> findOrderByUsername(String name) {
        List<Order> list = orderRepo.findAllByUsername(name);
        return list;
    }

    public List<Order> findOrderByUsernameAndStatus(Integer status, String name) {
        List<Order> list = orderRepo.findAllByUsernameAndStatus(status, name);
        return list;
    }

    public Order findOrderBySku(String sku) {
        Order order = orderRepo.findOrderBySku(sku);
        return order;
    }
}
