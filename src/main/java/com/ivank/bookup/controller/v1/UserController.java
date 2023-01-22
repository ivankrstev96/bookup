package com.ivank.bookup.controller.v1;

import com.ivank.bookup.dto.UserDto;
import com.ivank.bookup.dto.UserUpsertDto;
import com.ivank.bookup.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;

@Controller
@RequestMapping("api/v1/users")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping(value = "/register")
    public ResponseEntity<UserDto> register(@RequestBody @Valid UserUpsertDto userUpsertDto) {
        UserDto userDto = this.service.register(userUpsertDto);
        return ResponseEntity.ok(userDto);
    }

}
