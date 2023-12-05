package com.ivank.bookup.service.impl;

import com.ivank.bookup.dto.UserDto;
import com.ivank.bookup.dto.UserUpsertDto;
import com.ivank.bookup.dto.mapper.UserMapper;
import com.ivank.bookup.model.User;
import com.ivank.bookup.model.enums.Role;
import com.ivank.bookup.repository.UserRepository;
import com.ivank.bookup.service.UserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder encoder;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.encoder = new BCryptPasswordEncoder();
    }

    @Override
    public UserDto register(UserUpsertDto userUpsertDto) {
        User user = userMapper.upsertDtoToModel(userUpsertDto);
        user.setRole(Role.USER);
        user.setPassword(this.encoder.encode(user.getPassword()));
        user = userRepository.save(user);
        return userMapper.toDto(user);
    }

    @Override
    public UserDto getUserDetails(User user) {
        return userMapper.toDto(user);
    }
}
