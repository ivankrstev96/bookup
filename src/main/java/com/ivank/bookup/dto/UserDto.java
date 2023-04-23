package com.ivank.bookup.dto;

import lombok.Data;

@Data
public class UserDto {

    public Long id;
    public String username;
    public String email;
    public String role;
}
