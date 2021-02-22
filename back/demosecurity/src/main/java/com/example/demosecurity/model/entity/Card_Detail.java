package com.example.demosecurity.model.entity;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.EntityListeners;

@EntityListeners(AuditingEntityListener.class)
public class Card_Detail {
    private long id_cart;
    private long id_cartdetail;
    private int quanty;
    private float price;
    private boolean sattus;

}

