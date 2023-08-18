package com.ivank.bookup.scheduling;

import com.ivank.bookup.search.service.IndexingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class Scheduler {

    private final IndexingService indexingService;

    @Scheduled(initialDelay = 1000, fixedDelay=Long.MAX_VALUE)
    public void createIndexes() throws InterruptedException {
        indexingService.initiateIndexing();
    }
}
