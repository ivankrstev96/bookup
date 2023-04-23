package com.ivank.bookup.controller.v1;

import com.ivank.bookup.dto.FileResourceDto;
import com.ivank.bookup.service.FileResourceService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("api/v1/file-resources")
public class FileResourceController {

    private final FileResourceService service;

    public FileResourceController(FileResourceService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<FileResourceDto> findById(@PathVariable Long id) {
        FileResourceDto fileResourceDto = this.service.find(id);
        return ResponseEntity.ok(fileResourceDto);
    }

    @PostMapping
    public ResponseEntity<FileResourceDto> upload(@RequestParam("file") MultipartFile file) {
        FileResourceDto fileResourceDto = this.service.upload(file);
        return ResponseEntity.ok(fileResourceDto);
    }
}
