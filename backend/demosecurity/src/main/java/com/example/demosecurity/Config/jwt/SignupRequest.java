package com.example.demosecurity.Config.jwt;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.*;
import java.util.Set;
@Getter
@Setter
public class SignupRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private String username;

    @NotBlank
    @Size(min = 6, max = 40)
    private String password;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    @Size(max = 10)
    private String sodienthoai;
    private String fullname;
    private Boolean status;
    private String address;
    private Set<String> role;
}
