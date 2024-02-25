package com.ivank.bookup.dto;

import com.ivank.bookup.model.enums.BookType;
import lombok.Data;

@Data
public class BookDto {

    public Long id;

    public String name;

    public String description;

    public BookType type;

    public FileResourceDto fileResource;

    public UserDto createdBy;

    public FileResourceDto image;

}
