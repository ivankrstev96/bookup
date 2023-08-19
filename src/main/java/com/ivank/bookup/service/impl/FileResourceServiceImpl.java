package com.ivank.bookup.service.impl;

import com.ivank.bookup.dto.FileResourceDto;
import com.ivank.bookup.dto.mapper.FileResourceMapper;
import com.ivank.bookup.model.FileResource;
import com.ivank.bookup.repository.FileResourceRepository;
import com.ivank.bookup.service.FileResourceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ArrayUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class FileResourceServiceImpl implements FileResourceService {

    private final FileResourceRepository repository;

    private final FileResourceMapper mapper;

    public FileResourceDto upload(MultipartFile file) {
        FileResource fileResource = null;
        try {
            fileResource = FileResource
                    .builder()
                    .bytes(ArrayUtils.toObject(file.getBytes()))
                    .size(file.getSize())
                    .name(file.getOriginalFilename())
                    .type(file.getContentType())
                    .createdAt(LocalDateTime.now())
                    .bookInserted(false)
                    .build();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        fileResource = this.repository.save(fileResource);
        return this.mapper.toDto(fileResource);
    }

    @Override
    public FileResourceDto find(Long id) {
        FileResource fileResource = getOneOrThrowException(id);
        return mapper.toDto(fileResource);
    }

    @Override
    public FileResource getOneOrThrowException(Long id) {
        FileResource fileResource = repository
                .findById(id)
                .orElseThrow(() -> new RuntimeException(""));
        return fileResource;
    }

    @Override
    public void markBookInserted(Long id) {
        FileResource fileResource = getOneOrThrowException(id);
        fileResource.setBookInserted(true);

        repository.save(fileResource);
    }

    @Override
    public void cleanUnused() {
        log.info("Cleaning unused FileResources...");
        LocalDateTime before = LocalDateTime.now();
        before = before.minusMinutes(30);

        List<FileResource> fileResources = repository.findAllByBookInsertedIsFalseAndCreatedAtBefore(before);

        repository.deleteAll(fileResources);

        log.info(String.format("Deleted %s FileResources", fileResources.size()));
    }
}
