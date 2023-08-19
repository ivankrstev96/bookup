package com.ivank.bookup.scheduling;

import com.ivank.bookup.search.service.IndexingService;
import com.ivank.bookup.service.FileResourceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class SchedulerService {

    private final IndexingService indexingService;

    private final FileResourceService fileResourceService;

    @Scheduled(initialDelay = 1000, fixedDelay=Long.MAX_VALUE)
    public void createIndexes() throws InterruptedException {
        indexingService.initiateIndexing();
    }

    @Scheduled(initialDelay = 1000, fixedDelay= 30 * 60 * 1000)
    public void cleanUnusedFileResources() {
        fileResourceService.cleanUnused();
    }

}
