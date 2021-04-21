package com.example.demosecurity.model.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ColorDTO {
    private Long id;
    private String namecolor;
    private Integer status;
    private Date createdate;
    private String createby;
}
