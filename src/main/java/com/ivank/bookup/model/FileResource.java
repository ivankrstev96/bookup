package com.ivank.bookup.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "file_resource")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
    private LocalDateTime createdAt;

}
