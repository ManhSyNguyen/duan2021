package com.example.demosecurity.Service.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class CustomAuthenticationProvider  implements AuthenticationProvider {
    @Autowired
    private CustomUserDetailsService userDetailService;
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        try {
            // sử dụng userDetailService để lấy thông tin user
            UserDetails user = userDetailService.loadUserByUsername(authentication.getName());
            // logic xac thuc user
            UsernamePasswordAuthenticationToken result = null;
            if (user.getUsername().equals(authentication.getName()) && user.getPassword().equals(authentication.getCredentials().toString())) {
                result = new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword(), new ArrayList<>());
            }
            return result;
        } catch (UsernameNotFoundException e) {
            throw e;
        }
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return false;
    }

}
