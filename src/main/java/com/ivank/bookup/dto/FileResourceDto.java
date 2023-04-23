package com.ivank.bookup.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FileResourceDto {

    private Long id;
    private String name;
    private String type;
    private Long size;
    private LocalDateTime createdAt;

}
