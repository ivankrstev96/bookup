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
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class FileResourceServiceImpl implements FileResourceService {

    private final FileResourceRepository repository;

    private final FileResourceMapper mapper;

    public FileResourceDto upload(MultipartFile file) {
        FileResource fileResource;
        try {
            fileResource = FileResource
                    .builder()
                    .bytes(ArrayUtils.toObject(file.getBytes()))
                    .size(file.getSize())
                    .name(file.getOriginalFilename())
                    .type(file.getContentType())
                    .createdAt(LocalDateTime.now())
                    .used(false)
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
    public Optional<FileResource> serve(Long id) {
        return this.repository.findById(id);
    }

    @Override
    public void markUsed(Long id) {
        FileResource fileResource = getOneOrThrowException(id);
        fileResource.setUsed(true);

        repository.save(fileResource);
    }

    @Override
    public void cleanUnused() {
        log.info("Cleaning unused FileResources...");
        LocalDateTime before = LocalDateTime.now();
        before = before.minusMinutes(30);

        List<FileResource> fileResources = repository.findAllByUsedIsFalseAndCreatedAtBefore(before);

        repository.deleteAll(fileResources);

        log.info(String.format("Deleted %s FileResources", fileResources.size()));
    }
}
