package com.ivank.bookup.event;

import com.ivank.bookup.model.Book;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class BookWasAddedEvent extends ApplicationEvent {
    private Book book;

    public BookWasAddedEvent(Object source, Book book) {
        super(source);
        this.book = book;
    }

}
