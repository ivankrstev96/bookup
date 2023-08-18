package com.ivank.bookup.event;

import com.ivank.bookup.model.Book;
import com.ivank.bookup.search.model.BookIndex;
import com.ivank.bookup.search.repository.BookIndexRepository;
import com.ivank.bookup.service.PdfTextExtractorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class BookEventListener {

    private final PdfTextExtractorService pdfTextExtractorService;

    private final BookIndexRepository bookIndexRepository;

    @EventListener
    @Async
    public void handleBookWasAddedEvent(BookWasAddedEvent event) {
        Book book = event.getBook();

        String bookText = "";
        switch (book.getType()) {
            case PDF -> {
                bookText = pdfTextExtractorService.extract(book);
            }
        }

        BookIndex bookIndex = bookToBookIndex(book, bookText);

        bookIndexRepository.save(bookIndex);
    }

    private BookIndex bookToBookIndex(Book book, String bookText) {
        BookIndex bookIndex = BookIndex.builder()
                .name(book.getName())
                .content(bookText)
                .book(book)
                .build();

        return bookIndex;
    }


}
