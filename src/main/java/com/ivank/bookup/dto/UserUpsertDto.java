package com.ivank.bookup.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class UserUpsertDto {
    @NotNull
    @NotBlank
    public String username;
    @NotNull
    @NotBlank
    public String password;

    @NotBlank
    @NotNull
    @Email
    public String email;
}
