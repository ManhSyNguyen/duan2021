package com.example.demosecurity.model.jwt;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.io.Serializable;

@Getter
@RequiredArgsConstructor
public class AuthenticationResponse implements Serializable {
    private static final long serialVersionUID = 1L;
    private final String jwt;
}
