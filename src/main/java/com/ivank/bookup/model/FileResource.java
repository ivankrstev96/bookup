package com.ivank.bookup.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "file_resource")
public class FileResource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @JsonIgnore
    @Column(name = "bytes")
    private Byte[] bytes;

    @Column(name = "type")
    private String type;

    @Column(name = "size")
    private Long size;

    @Column(name = "created_at")
//    @Convert(converter = Jsr310JpaConverters.LocalDateTimeConverter.class)
    private LocalDateTime created_at;

    public FileResource() { }

    public FileResource(String name, Byte[] bytes, String type, Long size) {
        this.name = name;
        this.bytes = bytes;
        this.type = type;
        this.size = size;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Byte[] getBytes() {
        return bytes;
    }

    public void setBytes(Byte[] bytes) {
        this.bytes = bytes;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getSize() {
        return size;
    }

    public void setSize(Long size) {
        this.size = size;
    }
}
