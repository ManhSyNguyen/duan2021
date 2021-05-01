package com.example.demosecurity.Service.auth;

import com.example.demosecurity.Repository.UsersRepository;
import com.example.demosecurity.model.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UsersRepository usersRepository;

    public List<Users> findAllUser(Integer pageNo,Integer sizeNo){
        Pageable page = PageRequest.of(pageNo,sizeNo);
        Page<Users> result = usersRepository.findAll(page);
        if(result.hasContent()){
            return result.getContent();
        }else{
            return new ArrayList<Users>();
        }
    }
    public List<Users> findAllUserByRoleAdmin(Integer pageNo,Integer sizeNo){
        Pageable page = PageRequest.of(pageNo,sizeNo);
        Page<Users> result = usersRepository.findAll(page);
        if(result.hasContent()){
            return result.getContent();
        }else{
            return new ArrayList<Users>();
        }
    }

    public List<Users> findAllUserRoleMod(Integer pageNo,Integer sizeNo){
        Pageable page = PageRequest.of(pageNo,sizeNo);
        Page<Users> result = usersRepository.findAll(page);
        if(result.hasContent()){
            return result.getContent();
        }else{
            return new ArrayList<Users>();
        }
    }
    public Users findUserById(Long id){
       return usersRepository.findUsersById(id);
    }

    public Users findUserUsername(String username){
        return usersRepository.findUserByUsername(username);
    }

    public Users findUserByEmailAndSodienthoai(String email,String sdt){
        return usersRepository.findUserByEmailAndSodienthoai(email,sdt);
    }
    public Users findUserByOtp(String otp){
        return usersRepository.findUserByCodeOtp(otp);
    }

}
