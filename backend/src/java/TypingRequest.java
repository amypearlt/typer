package com.example.demo.model;

public class TypingRequest {
    private String quote;
    private String typed_quote;
    private long start_time;
    private long end_time;

    public String getQuote() {
        return quote;
    }

    public void setQuote(String quote) {
        this.quote = quote;
    }

    public String getTyped_quote() {
        return typed_quote;
    }

    public void setTyped_quote(String typed_quote) {
        this.typed_quote = typed_quote;
    }

    public long getStart_time() {
        return start_time;
    }

    public void setStart_time(long start_time) {
        this.start_time = start_time;
    }

    public long getEnd_time() {
        return end_time;
    }

    public void setEnd_time(long end_time) {
        this.end_time = end_time;
    }
}