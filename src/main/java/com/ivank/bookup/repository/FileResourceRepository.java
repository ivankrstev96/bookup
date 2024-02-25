package com.ivank.bookup.repository;


import com.ivank.bookup.model.FileResource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface FileResourceRepository extends JpaRepository<FileResource, Long> {

    List<FileResource> findAllByUsedIsFalseAndCreatedAtBefore(LocalDateTime before);

}
