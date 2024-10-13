package com.example.exhibitor.client;


import com.example.exhibitor.dto.UserCredential;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name="AuthenticationService", url = "http://localhost:8080")
public interface UserClient {

    @GetMapping("/auth/currentUser/{id}")
    public UserCredential getUser(@PathVariable("id") int id);
}
