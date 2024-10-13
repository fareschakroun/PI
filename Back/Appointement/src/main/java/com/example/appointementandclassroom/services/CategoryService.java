package com.example.appointementandclassroom.services;

import com.example.appointementandclassroom.entities.category;
import com.example.appointementandclassroom.repositories.CategoryRepo;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor

public class CategoryService implements ICategoryService{


    @Autowired
    private CategoryRepo catRepo ;

    @Override
    public List<category> retrieveAllcategory() {
        return catRepo.findAll();
    }
}
