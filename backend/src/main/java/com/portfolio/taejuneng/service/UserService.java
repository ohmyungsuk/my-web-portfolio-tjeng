package com.portfolio.taejuneng.service;

import com.portfolio.taejuneng.dto.UserSignupDto;
import com.portfolio.taejuneng.mapper.UserMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    public void signup(UserSignupDto dto) {
        String encodedPassword = passwordEncoder.encode(dto.getPassword());
        dto.setPassword(encodedPassword);

        userMapper.insertUser(dto);
    }

    public UserSignupDto login(UserSignupDto dto) {
        UserSignupDto savedUser = userMapper.findByUsername(dto.getUsername());

        if (savedUser == null) {
            return null;
        }

        boolean isMatch = passwordEncoder.matches(dto.getPassword(), savedUser.getPassword());

        if (!isMatch) {
            return null;
        }

        return savedUser;
    }
}