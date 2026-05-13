package com.data;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "result")
public class TypingDataResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int resultid;

    private int accountid; 

    private int quoteid;

    private int rawwpm;

    private double accuracy;

    private int wpm;

    private LocalDateTime datetime;

    public LocalDateTime getDatetime() {
        return datetime;
    }

    public void setDatetime(LocalDateTime datetime) {
        this.datetime = datetime;
    }

    // getters & setters
    // constructor(s)
}