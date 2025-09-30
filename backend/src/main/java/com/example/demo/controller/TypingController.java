package com.example.demo.controller;
import com.example.demo.model.TypingRequest;
import com.example.demo.model.TypingResult;
import com.example.demo.service.TypingService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/typing")
@CrossOrigin(origins = "http://localhost:5173")
public class TypingController {
    private final TypingService service;

    public TypingController(TypingService service) {
        this.service = service;
    }

    @PostMapping("/result")
    public TypingResult calculateResult(@RequestBody TypingRequest request) {
        return service.calculate(request.getQuote(), request.getTyped_quote(), request.getStart_time(), request.getEnd_time());
    }

}