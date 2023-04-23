package com.ivank.bookup.dto.mapper;


import com.ivank.bookup.dto.FileResourceDto;
import com.ivank.bookup.model.FileResource;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface FileResourceMapper {

    FileResourceMapper mapper = Mappers.getMapper(FileResourceMapper.class);

    FileResourceDto toDto(FileResource fileResource);

}