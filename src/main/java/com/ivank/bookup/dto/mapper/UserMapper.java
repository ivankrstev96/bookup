package com.ivank.bookup.dto.mapper;


import com.ivank.bookup.dto.UserDto;
import com.ivank.bookup.dto.UserUpsertDto;
import com.ivank.bookup.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserMapper mapper = Mappers.getMapper(UserMapper.class);

    User upsertDtoToModel(UserUpsertDto userUpsertDto);

    UserDto toDto(User user);

}