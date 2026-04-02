package com.portfolio.taejuneng.controller;

import com.portfolio.taejuneng.dto.UserSignupDto;
import com.portfolio.taejuneng.service.UserService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(
        origins = "http://localhost:5173",
        methods = {
                RequestMethod.GET,
                RequestMethod.POST,
                RequestMethod.PUT,
                RequestMethod.OPTIONS
        }
)
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/users/signup")
    public String signup(@RequestBody UserSignupDto dto) {
        userService.signup(dto);
        return "회원가입 성공";
    }

    @PostMapping("/users/login")
    public UserSignupDto login(@RequestBody UserSignupDto dto) {
        return userService.login(dto);
    }
}