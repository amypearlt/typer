package com.example.demo.model;

public class TypingResult {
    private int raw_wpm;
    private double accuracy;
    private int wpm;

    public TypingResult(int raw_wpm, double accuracy, int wpm) {
        this.raw_wpm = raw_wpm;
        this.accuracy = accuracy;
        this.wpm = wpm;
    }

    public int getRaw_wpm() {
        return raw_wpm;
    }

    public double getAccuracy() {
        return accuracy;
    }

    public int getWpm() {
        return wpm;
    }
}