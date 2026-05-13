package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.data.TypingDataUser;

@Repository
public interface TypingUserRepository extends JpaRepository<TypingDataUser, String> {
    //TypingDataUser findByUsername(String username);
}