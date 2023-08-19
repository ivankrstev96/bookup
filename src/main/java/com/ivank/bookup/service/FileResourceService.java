package com.ivank.bookup.service;

import com.ivank.bookup.dto.FileResourceDto;
import com.ivank.bookup.model.FileResource;
import org.springframework.web.multipart.MultipartFile;

public interface FileResourceService {

    FileResourceDto upload(MultipartFile file);

    FileResourceDto find(Long id);

    FileResource getOneOrThrowException(Long id);

    void markBookInserted(Long id);

    void cleanUnused();
}
