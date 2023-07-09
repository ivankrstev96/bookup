package com.ivank.bookup.event;

import com.ivank.bookup.model.Book;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class BookEventListener {


    @EventListener
    @Async
    public void handleEmailEventWasDelivered(BookWasAddedEvent event) {
        Book book = event.getBook();

    }


}
