package com.example.demo.service;
import com.example.demo.model.TypingResult;

import org.springframework.stereotype.Service;

@Service
public class TypingService {

    public TypingResult calculate(String quote, String typed_quote, long start_time, long end_time) {
        double time_typed = (end_time - start_time) / 60000.0;
        String[] typed_words = typed_quote.split("\\s+");
        int raw_wpm = (int)Math.round(typed_words.length / time_typed);

        String[] words = quote.split("\\s+");
        int correct_words = 0;
        for (int i = 0; i < typed_words.length; i++) {
            if (i < words.length && typed_words[i].equals(words[i])) {
                correct_words++;
            }
        }
        int wpm = (int)Math.round(correct_words / time_typed);

        double accuracy = Math.round((((double)correct_words / words.length) * 100) * 10.0) / 10.0; // Rounded to 1 decimal place.

        return new TypingResult(raw_wpm, accuracy, wpm);
    }
}