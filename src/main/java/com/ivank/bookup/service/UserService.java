package com.ivank.bookup.service;

import com.ivank.bookup.dto.UserDto;
import com.ivank.bookup.dto.UserUpsertDto;

public interface UserService {

    UserDto register(UserUpsertDto userUpsertDto);
}
