package com.example.demosecurity.Controller;

import com.example.demosecurity.Service.auth.CustomUserDetailsService;
import com.example.demosecurity.model.jwt.AuthRequest;
import com.example.demosecurity.model.jwt.AuthenticationResponse;
import com.example.demosecurity.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rest/auth") //đây là đường dẫn của đăng nhập mọi đối user đều có thể
// request tới đây để đăng nhập và sinh ra token , khi đăng nhập cần phải kèm theo token
// do đó frontend lưu token vào local để dùng khi làm chức năng đăng nhập
@CrossOrigin(origins = "http://localhost:3000")
public class ApplicationController {

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService detailservice;
    @PostMapping("/authenticate")// call api với đường dẫn http://localhost:5000/rest/auth/authenticate để làm chức năng đăng nhập nhé
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthRequest authReq) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authReq.getUserName(),authReq.getPassword())
            );
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body("Incorrect username or password");
        }

        final UserDetails userDetails = detailservice
                .loadUserByUsername(authReq.getUserName());

        final String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }
}
