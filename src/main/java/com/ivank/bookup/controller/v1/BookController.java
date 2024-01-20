package com.ivank.bookup.controller.v1;

import com.ivank.bookup.dto.BookDto;
import com.ivank.bookup.dto.BookUpsertDto;
import com.ivank.bookup.model.User;
import com.ivank.bookup.search.service.BookSearchService;
import com.ivank.bookup.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("api/v1/books")
public class BookController {

    private final BookService service;

    private final BookSearchService searchService;

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

    @GetMapping(value = "/search")
    public ResponseEntity<Page<BookDto>> search(
            @RequestParam(defaultValue = "") String query,
            Pageable pageable
    ) {
        Page<BookDto> resultPage;
        if ("".equals(query)) {
            resultPage = service.search(pageable);
        } else {
            resultPage = this.searchService.search(query, pageable);
        }

        return ResponseEntity.ok(resultPage);
    }

}
