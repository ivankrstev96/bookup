package com.ivank.bookup.dto;

import com.ivank.bookup.model.enums.BookType;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class BookUpsertDto {

    @NotNull
    @NotBlank
    public String name;

    @NotNull
    public BookType type;

    @NotNull
    public Long fileResourceId;

}
