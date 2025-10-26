package com.controller;

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
        "I love toxic yuri, I think they're so raw and passionate it's an amazing insight into the human psyche.",
        "I'm going back to 505, If it's a seven hour flight or a forty-five minute drive",
        "You should be stronger than me, You been here seven years longer than me"
    );
    private final Random random = new Random();

    @GetMapping("/quote")
    public QuoteResponse getRandomQuote() {
        String quote = quotes.get(random.nextInt(quotes.size()));
        return new QuoteResponse(quote);
    }

    record QuoteResponse(String quote) {}
}