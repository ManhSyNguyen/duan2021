package com.example.demosecurity.Service.auth;

import com.example.demosecurity.Convert.CartConvert;
import com.example.demosecurity.Repository.*;
import com.example.demosecurity.model.dto.*;
import com.example.demosecurity.model.entity.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class CartService {
@Autowired
    private CartRepo cartRepo;
@Autowired
    private CartConvert convert;

@Autowired
    private CustomerRepo customerRepo;
@Autowired
private ProductDetailRepo productDetailRepo;
@Autowired
private CartProductDetailRepo cartProductDetailRepo;
    private static final Logger logger = LogManager.getLogger(CartService.class);

public CartDTO save(CartDTO cartDTO){
    Cart cart = new Cart();
 cart =   convert.toEntity(cartDTO);
    Customer customer = customerRepo.findCustomersById(cartDTO.getIdcustomer());
    cart.setCustomer(customer);
    cartRepo.save(cart);
    Set<ProductDetailDTO> productDetailList = cartDTO.getProductDetails();
    if(cartRepo.save(cart)!=null) {
        for (ProductDetailDTO pr : productDetailList) {
            // lay id cua cart duoc truyen xuong va id của productdetail trong list
            CartProductDetailId cartProductDetailId = new CartProductDetailId();
            cartProductDetailId.setIdCart(cart.getId());
            cartProductDetailId.setIdProductDetail(pr.getId());
            // truyen cartproductid vao CartProductDetail
            CartProductDetailDTO cartProductDetaildto = new CartProductDetailDTO();
            cartProductDetaildto.setId(cartProductDetailId);
            cartProductDetaildto.setPrice(pr.getPrice());
            cartProductDetaildto.setQuantity(pr.getQuantity());

            CartProductDetail cartProductDetail = new CartProductDetail();

            cartProductDetail.setId(cartProductDetaildto.getId());
            cartProductDetail.setPrice(cartProductDetaildto.getPrice());
            cartProductDetail.setQuantity(cartProductDetaildto.getQuantity());
            cart.setStatus(1);
            Cart cartnew = cartRepo.findCartById(cartProductDetaildto.getId().getIdCart());
            ProductDetail productDetail = productDetailRepo.findProductDetailById(cartProductDetaildto.getId().getIdProductDetail());
            cartProductDetail.setCart(cartnew);
            cartProductDetail.setProductDetail(productDetail);
            cartProductDetailRepo.save(cartProductDetail);
        }
    }
    return convert.toDTO(cart);
}

    public CartDTO update(CartDTO cartDTO) {
        Cart cart = new Cart() ;
        Cart oldcart = cartRepo.findCartById(cartDTO.getId());
        cart = convert.toEntity(cartDTO,oldcart);
        Customer customer = customerRepo.findCustomersById(cartDTO.getIdcustomer());
        cart.setCustomer(customer);
        cartRepo.save(cart);
        Set<ProductDetailDTO> productDetailList = cartDTO.getProductDetails();
        if(cartRepo.save(cart)!=null) {
            for (ProductDetailDTO pr : productDetailList) {
                // lay id cua cart duoc truyen xuong va id của productdetail trong list
                CartProductDetailId cartProductDetailId = new CartProductDetailId();
                cartProductDetailId.setIdCart(cart.getId());
                cartProductDetailId.setIdProductDetail(pr.getId());
                // truyen cartproductid vao CartProductDetail
                CartProductDetailDTO cartProductDetaildto = new CartProductDetailDTO();
                cartProductDetaildto.setId(cartProductDetailId);
                cartProductDetaildto.setPrice(pr.getPrice());
                cartProductDetaildto.setQuantity(pr.getQuantity());

                CartProductDetail cartProductDetail = new CartProductDetail();

                cartProductDetail.setId(cartProductDetaildto.getId());
                cartProductDetail.setPrice(cartProductDetaildto.getPrice());
                cartProductDetail.setQuantity(cartProductDetaildto.getQuantity());
                cart.setStatus(1);
                Cart cartnew = cartRepo.findCartById(cartProductDetaildto.getId().getIdCart());
                ProductDetail productDetail = productDetailRepo.findProductDetailById(cartProductDetaildto.getId().getIdProductDetail());
                cartProductDetail.setCart(cartnew);
                cartProductDetail.setProductDetail(productDetail);
                cartProductDetailRepo.save(cartProductDetail);
            }
        }
        return convert.toDTO(cart);

    }

    public void delete(Long id) {
        try {
            Optional<Cart> cart = cartRepo.findById(id);
            if(cart!=null){

                List<CartProductDetail> dt = cartProductDetailRepo.findCartProductDetailBys(id);
                if(dt!=null){
                    for (CartProductDetail xoa : dt){
                        cartProductDetailRepo.delete(xoa);
                    }
                    cartRepo.deleteById(id);
                }else{
                    logger.error("Không được phép xóa");
                }
            }
        }catch (Exception e){
            logger.error(e.getMessage());
        }
    }


    public List<CartDTO> findAll(Pageable pageable) {
        List<CartDTO> results = new ArrayList<>();
        try {
            List<Cart> entities = cartRepo.findAll(pageable).getContent();
            for (Cart item: entities) {
                CartDTO cartdto = convert.toDTO(item);
                results.add(cartdto);
            }
            return results;
        }catch (Exception e) {
            logger.error(e.getMessage());
        }
        return results;
    }


    public int totalItem() {
        try {
            return (int) cartRepo.count();
        }catch (Exception e){
            logger.error(e.getMessage());
        }
        return 1;
    }

    public List<CartDTO> findAll() {
        List<CartDTO> results = new ArrayList<>();
        List<Cart> entities = cartRepo.findAll();
        for (Cart item: entities) {
            CartDTO newDTO = convert.toDTO(item);
            results.add(newDTO);
        }
        return results;
    }
    public List<Cart> findCartByStatus(){
    return cartRepo.findCartByStatus();
    }

}
