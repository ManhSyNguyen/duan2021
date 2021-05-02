package com.example.demosecurity.model.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Bom extends Object {
    private String namecustom;
    private String phone;
    private String email;
    private String address;
    private String boom;


    public Bom(String namecustom, String phone, String email, String address, String boom) {
        this.namecustom = namecustom;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.boom = boom;
    }
}
