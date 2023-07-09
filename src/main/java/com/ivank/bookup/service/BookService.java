package com.ivank.bookup.service;

import com.ivank.bookup.dto.BookDto;
import com.ivank.bookup.dto.BookUpsertDto;
import com.ivank.bookup.model.User;

import java.util.List;

public interface BookService {

    List<BookDto> index();

    BookDto insert(BookUpsertDto bookUpsertDto, User user);

    BookDto find(Long bookId);
}

