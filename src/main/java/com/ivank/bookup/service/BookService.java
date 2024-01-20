package com.ivank.bookup.service;

import com.ivank.bookup.dto.BookDto;
import com.ivank.bookup.dto.BookUpsertDto;
import com.ivank.bookup.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BookService {

    List<BookDto> index();

    BookDto insert(BookUpsertDto bookUpsertDto, User user);

    BookDto find(Long bookId);

    Page<BookDto> search(Pageable pageable);
}

