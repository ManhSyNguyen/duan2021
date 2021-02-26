package com.example.demosecurity.model.jwt;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthRequest {
    private String userName;
    private String password;
}
