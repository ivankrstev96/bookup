package com.ivank.bookup.service;

import com.ivank.bookup.dto.FileResourceDto;
import com.ivank.bookup.model.FileResource;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

public interface FileResourceService {

    FileResourceDto upload(MultipartFile file);

    FileResourceDto find(Long id);

    FileResource getOneOrThrowException(Long id);

    Optional<Byte[]> serve(Long id);

    void markUsed(Long id);

    void cleanUnused();
}
