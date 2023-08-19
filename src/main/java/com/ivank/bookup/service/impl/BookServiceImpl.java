package com.ivank.bookup.service.impl;

import com.ivank.bookup.dto.BookDto;
import com.ivank.bookup.dto.BookUpsertDto;
import com.ivank.bookup.dto.mapper.BookMapper;
import com.ivank.bookup.event.BookWasAddedEvent;
import com.ivank.bookup.model.Book;
import com.ivank.bookup.model.FileResource;
import com.ivank.bookup.model.User;
import com.ivank.bookup.repository.BookRepository;
import com.ivank.bookup.service.BookService;
import com.ivank.bookup.service.FileResourceService;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final BookMapper bookMapper;
    private final FileResourceService fileResourceService;

    private final ApplicationEventPublisher eventPublisher;

    public BookServiceImpl(
            BookRepository bookRepository,
            BookMapper bookMapper,
            FileResourceService fileResourceService,
            ApplicationEventPublisher eventPublisher
    ) {
        this.bookRepository = bookRepository;
        this.bookMapper = bookMapper;
        this.fileResourceService = fileResourceService;
        this.eventPublisher = eventPublisher;
    }

    @Override
    public List<BookDto> index() {
        List<Book> books = bookRepository.findAll();
        return bookMapper.toDtoList(books);
    }

    @Override
    public BookDto find(Long id) {
        Book book = bookRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException(""));

        return bookMapper.toDto(book);
    }

    @Override
    @Transactional
    public BookDto insert(BookUpsertDto bookUpsertDto, User user) {
        Book book = bookMapper.upsertDtoToModel(bookUpsertDto);
        book.setCreatedBy(user);
        book.setCreatedAt(LocalDateTime.now());

        FileResource fileResource = fileResourceService.getOneOrThrowException(bookUpsertDto.getFileResourceId());
        book.setFileResource(fileResource);

        book = bookRepository.save(book);

        fileResourceService.markBookInserted(fileResource.getId());

        eventPublisher.publishEvent(new BookWasAddedEvent(this, book));

        return bookMapper.toDto(book);
    }

}
