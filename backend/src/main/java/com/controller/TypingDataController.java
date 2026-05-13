package com.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.data.TypingDataResult;
import com.data.TypingDataUser;
import com.repository.TypingResultRepository;
import com.repository.TypingUserRepository;

@RestController
@RequestMapping("/api/typing")
public class TypingDataController {

    @Autowired
    private TypingUserRepository typingUserRepository;
    @Autowired
    private TypingResultRepository typingResultRepository;

    @PostMapping("/user")
    public TypingDataUser saveUser(@RequestBody TypingDataUser user) {
        return typingUserRepository.save(user);
    }

    @PostMapping("/dataresult")
    public TypingDataResult saveResult(@RequestBody TypingDataResult result) {
        result.setDatetime(LocalDateTime.now());
        return typingResultRepository.save(result);
    }
}