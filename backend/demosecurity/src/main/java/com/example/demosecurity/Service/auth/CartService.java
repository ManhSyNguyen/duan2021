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
    private UsersRepository usersRepository;
    private static final Logger logger = LogManager.getLogger(CartService.class);
    public Cart saveOrUpdateCart(Cart cart,String name) {
        // logic
//        try {
//            if (cart.getId() != null) {
//                cart.setBacklog(backlogrepository.findByProjectIdentifier(project.getProjectIdentifier().toUpperCase()));
//            }
//           Users us = usersRepository.findUsersById()
//            cart.setUsers(us);
//            cart.setMau();
//
//            return projectRepo.save(project);
//        } catch (Exception e) {
//            throw new ProjectIdException("Project ID '" + project.getProjectIdentifier().toUpperCase() + "' already exists");
//        }
return null;
    }
    public Cart save(Cart cart) {
        return cartRepo.save(cart);
    }
    public Iterable<Cart> findAllCartByUser(String name){
return cartRepo.findAllByUsers(name);
    }

}
