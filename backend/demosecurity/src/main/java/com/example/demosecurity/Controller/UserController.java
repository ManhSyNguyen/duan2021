package com.example.demosecurity.Controller;

import com.example.demosecurity.Config.jwt.SignupRequest;
import com.example.demosecurity.Repository.RoleRepository;
import com.example.demosecurity.Repository.UsersRepository;
import com.example.demosecurity.Service.auth.UserService;
import com.example.demosecurity.model.dto.ERole;
import com.example.demosecurity.model.dto.MessageResponse;
import com.example.demosecurity.model.entity.Role;
import com.example.demosecurity.model.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("v1/api")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    BCryptPasswordEncoder encode;

    @GetMapping("/users")
    public ResponseEntity<?> findAllUser(@RequestParam(defaultValue = "0") Integer pageNo,
                                         @RequestParam(defaultValue = "10") Integer sizeNo) {
        List<Users> list = userService.findAllUser(pageNo, sizeNo);
        return new ResponseEntity<List<Users>>(list, HttpStatus.OK);
    }
    @GetMapping("/user/{id}")
    public ResponseEntity<?> findUserById(@PathVariable("id") Long id){
        Users us = userService.findUserById(id);
        return new ResponseEntity<Users>(us, HttpStatus.OK);
    }

    @GetMapping("/user/username")
    public ResponseEntity<?> findUserUsername(Principal pc){
        Users us = userService.findUserUsername(pc.getName());
        return new ResponseEntity<Users>(us, HttpStatus.OK);
    }


    @PutMapping("user/{id}")
    public ResponseEntity<?> updateUser(@Valid @PathVariable("id") Long id, @RequestBody SignupRequest signUpRequest) {
        Users us = usersRepository.findUsersById(id);
        Users newUser = new Users();
        newUser.setId(id);
        if (signUpRequest.getUsername().equals(us.getUsername()) && us.getUsername()!=null) {
            newUser.setUsername(signUpRequest.getUsername());
        } else if (usersRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Lỗi: Tên người dùng đã được sử dụng hoặc là nó đang trống!"));
        }else{
            newUser.setUsername(signUpRequest.getUsername());
        }

        if (signUpRequest.getEmail().equals(us.getEmail()) && us.getEmail()!=null) {
            newUser.setEmail(signUpRequest.getEmail());
        } else if (usersRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Lỗi: Email đã được sử dụng hoặc là nó đang trống!"));
        }else {
            newUser.setEmail(signUpRequest.getEmail());
        }
        if (signUpRequest.getSodienthoai().equals(us.getSodienthoai()) && us.getSodienthoai()!=null) {
            newUser.setSodienthoai(signUpRequest.getSodienthoai());
        } else if (usersRepository.existsBySodienthoai(signUpRequest.getSodienthoai())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Lỗi: Số điện thoại đã được sử dụng hoặc là nó đang trống!"));
        }else{
            newUser.setSodienthoai(signUpRequest.getSodienthoai());
        }
        newUser.setFullname(signUpRequest.getFullname());
        newUser.setSodienthoai(signUpRequest.getSodienthoai());
        newUser.setStatus(signUpRequest.getStatus());
        newUser.setAddress(signUpRequest.getAddress());
       //  Create new user's account
        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();
        if(us.getRoles().isEmpty()){
            if (strRoles.isEmpty()) {
                Role userRole = roleRepository.findByNamerole(ERole.ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(userRole);
            } else {
                strRoles.forEach(role -> {
                    switch (role) {
                        case "admin":
                            Role adminRole = roleRepository.findByNamerole(ERole.ROLE_ADMIN)
                                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                            roles.add(adminRole);

                            break;
                        case "mod":
                            Role modRole = roleRepository.findByNamerole(ERole.ROLE_MODERATOR)
                                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                            roles.add(modRole);

                            break;
                        default:
                            Role userRole = roleRepository.findByNamerole(ERole.ROLE_USER)
                                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                            roles.add(userRole);
                    }
                });
            }
            newUser.setRoles(roles);
        }
        newUser.setRoles(us.getRoles());
        usersRepository.save(newUser);
        return ResponseEntity.ok(new MessageResponse("User update successfully!"));
    }

}
