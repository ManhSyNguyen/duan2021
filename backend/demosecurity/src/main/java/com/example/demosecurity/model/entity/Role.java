package com.example.demosecurity.model.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity(name = "role")
@Getter
@Setter
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Role {
    @Id
    @Column(name = "idRole")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "namerole",columnDefinition = "VARCHAR(20)  NULL")
    private String namerole;
    @CreatedDate
    private Date createdate;

    @Column(name = "createby",columnDefinition = "VARCHAR(30)  NULL")
    @CreatedBy
    private String createby;
}
