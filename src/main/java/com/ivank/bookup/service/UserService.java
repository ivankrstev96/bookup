package com.ivank.bookup.service;

import com.ivank.bookup.dto.UserDto;
import com.ivank.bookup.dto.UserUpsertDto;
import com.ivank.bookup.model.User;

public interface UserService {

    UserDto register(UserUpsertDto userUpsertDto);

    UserDto getUserDetails(User user);
}
