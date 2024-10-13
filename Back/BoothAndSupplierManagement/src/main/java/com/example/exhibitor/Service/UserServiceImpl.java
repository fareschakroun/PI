package com.example.exhibitor.Service;

import com.example.exhibitor.Entity.Supplier;
import com.example.exhibitor.Repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService{

    UserRepository userRepository ;
    @Override
    public List<Supplier> getAllUsers() {
        return userRepository.findAll();
    }
}
