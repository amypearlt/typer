package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.data.TypingDataResult;

@Repository
public interface TypingResultRepository extends JpaRepository<TypingDataResult, Long> {
    //List<TypingDataResult> findByAccountid(Long accountid);
}