package com.example.authenticationservice.repository;

import com.example.authenticationservice.entity.UserCredential;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserCredentialRepository extends JpaRepository<UserCredential, Integer> {
    Optional<UserCredential> findByName(String name);

    List<UserCredential> findAllByRoomid(long roomId);

    Optional<UserCredential> findByEmail(String email);

    Optional<UserCredential> findById(int id);

    List<UserCredential> findByRole(com.example.authenticationservice.entity.role role);



}