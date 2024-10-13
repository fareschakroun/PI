package com.example.exhibitor.Controller;

import com.example.exhibitor.Entity.Supplier;
import com.example.exhibitor.Entity.SupplierRequest;
import com.example.exhibitor.Repository.UserRepository;
import com.example.exhibitor.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api/Users")

@RequiredArgsConstructor

public class UserController


{
    @Autowired
    private UserService userService ;

    @GetMapping
    public List<Supplier> getAllRequests(){
        return userService.getAllUsers();
    }
}
