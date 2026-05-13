package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.data.TypingDataQuote;

@Repository
public interface TypingQuoteRepository extends JpaRepository<TypingDataQuote, Long> {
    //List<TypingDataQuote> findByQuoteId(Long quoteid);
}   