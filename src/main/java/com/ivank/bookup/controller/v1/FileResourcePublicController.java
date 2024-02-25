package com.ivank.bookup.controller.v1;

import com.ivank.bookup.service.FileResourceService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;

@Controller
@RequestMapping("api/v1/public/file-resources")
public class FileResourcePublicController {

    private final FileResourceService service;

    public FileResourcePublicController(FileResourceService service) {
        this.service = service;
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Byte[]> serve(@PathVariable(name = "id") Long id, HttpServletResponse response) {
        return this.service.serve(id)
                .map(x -> {
                    try {
                        OutputStream os = response.getOutputStream();
                        for (byte b : x) {
                            os.write(b);
                        }
                    } catch (IOException e) {
                        e.printStackTrace();
                        throw new RuntimeException();
                    }
                    return ResponseEntity.ok(x);
                })
                .orElse(ResponseEntity.badRequest().build());
    }
}
