package com.service;
import org.springframework.stereotype.Service;

import com.model.TypingResult;

@Service
public class TypingService {

    public TypingResult calculate(String quote, String typed_quote, long start_time, long end_time) {
        double time_typed = (end_time - start_time) / 60000.0;
        String[] typed_words = typed_quote.split("\\s+");
        int raw_wpm = (int)Math.round(typed_words.length / time_typed);

        String[] words = quote.split("\\s+");
        int correct_words = 0;
        for (int i = 0; i < Math.min(words.length, typed_words.length); i++) {
            if (typed_words[i].equals(words[i])) {
                correct_words++;
            }
        }
        int words_difference = Math.abs(words.length - typed_words.length); // Penalising untyped/extra words.
        int complete_words = correct_words - words_difference;
        if (complete_words < 0) {
            complete_words = 0;
        }
        int wpm = (int)Math.round(complete_words / time_typed);

        double accuracy = Math.round((((double)correct_words / words.length) * 100) * 10.0) / 10.0; // Rounded to 1 decimal place.

        return new TypingResult(raw_wpm, accuracy, wpm);
    }
}
