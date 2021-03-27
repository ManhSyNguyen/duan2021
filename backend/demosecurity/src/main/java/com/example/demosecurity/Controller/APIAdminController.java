package com.example.demosecurity.Controller;

import com.example.demosecurity.Repository.RoleRepository;
import com.example.demosecurity.Repository.UsersRepository;
import com.example.demosecurity.Service.auth.MapValidationService;
import com.example.demosecurity.Config.service.UserDetailsImpl;
import com.example.demosecurity.model.dto.ERole;
import com.example.demosecurity.model.dto.MessageResponse;
import com.example.demosecurity.model.entity.Role;
import com.example.demosecurity.model.entity.Users;
import com.example.demosecurity.Config.jwt.AuthRequest;
import com.example.demosecurity.Config.jwt.AuthenticationResponse;
import com.example.demosecurity.Config.jwt.SignupRequest;
import com.example.demosecurity.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
<<<<<<< HEAD

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

=======
@CrossOrigin(origins = "http://localhost:4200")
>>>>>>> 21a4fa5fcb96ff71dd743660a07b8ad2c26a1c5e
@RestController
@RequestMapping("/secure/auth")
public class APIAdminController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtil jwtUtils;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    BCryptPasswordEncoder encode;

    @Autowired
    private MapValidationService mapValidationService;
    /*@PreAuthorize("hasAnyRole('ADMIN')")*/
    // hàm đó viết đi
    //chức năng đăng ký truyền xuống username,password viết như hàn thêm
//    @PostMapping("/admin/add")
//    public String addUserByAdmin(@RequestBody Users user) {
//        String pwd = user.getPassword();
//        String encryptPwd = bCryptPasswordEncoder.encode(pwd);
//        user.setPassword(encryptPwd);
//        usersRepository.save(user);
//        return "user added successfully...";
//    }


    @PostMapping("/signin")
    public ResponseEntity<?> createAuthenticationToken(@Valid @RequestBody AuthRequest authReq, BindingResult result) {
        ResponseEntity<?> errors = mapValidationService.mapValidation(result);
        if(errors!=null){
            return errors;
        }
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authReq.getUsername(), authReq.getPassword()));


        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new AuthenticationResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (usersRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Lỗi: Tên người dùng đã được sử dụng!"));
        }

        if (usersRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Lỗi: Email đã được sử dụng!"));
        }
        if (usersRepository.existsBySodienthoai(signUpRequest.getSodienthoai())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Lỗi: Số điện thoại đã được sử dụng!"));
        }

        // Create new user's account
        Users user = new Users(signUpRequest.getUsername(),
                encode.encode(signUpRequest.getPassword()),
                signUpRequest.getEmail(),signUpRequest.getSodienthoai()
                );
        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();
        System.out.println(strRoles);
        if (strRoles.isEmpty()) {
            Role userRole = roleRepository.findByNamerole(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            System.out.println(userRole);
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

        user.setRoles(roles);
        usersRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
