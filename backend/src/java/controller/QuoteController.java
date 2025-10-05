package com.example.backend.controller;

import java.util.List;
import java.util.Random;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/typing")
@CrossOrigin(origins = "http://localhost:5173")
public class QuoteController {
    private final List<String> quotes = List.of(
        "The quick brown fox jumps over the lazy dog.",
        "Houshou marine my wifey my beloved please marry me <3",
        "I love toxic yuri, i think theyre so raw and passionate its an amazing insight into the human psyche."
    );
    private final Random random = new Random();

    @GetMapping("/quote")
    public QuoteResponse getRandomQuote() {
        String quote = quotes.get(random.nextInt(quotes.size()));
        return new QuoteResponse(quote);
    }

    record QuoteResponse(String quote) {}
}