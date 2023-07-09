package com.ivank.bookup.controller.v1;

import com.ivank.bookup.dto.BookDto;
import com.ivank.bookup.dto.BookUpsertDto;
import com.ivank.bookup.model.User;
import com.ivank.bookup.service.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping("api/v1/books")
public class BookController {

    private final BookService service;

    public BookController(BookService service) {
        this.service = service;
    }

    @GetMapping()
    public ResponseEntity<List<BookDto>> index() {
        List<BookDto> bookDtos = this.service.index();
        return ResponseEntity.ok(bookDtos);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<BookDto> find(@PathVariable Long id) {
        BookDto bookDto = this.service.find(id);
        return ResponseEntity.ok(bookDto);
    }

    @PostMapping()
    public ResponseEntity<BookDto> insert(
            @RequestBody @Valid BookUpsertDto bookUpsertDto,
            User user
    ) {
        BookDto bookDto = this.service.insert(bookUpsertDto, user);
        return ResponseEntity.ok(bookDto);
    }

}
