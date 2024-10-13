package com.example.appointementandclassroom.repositories;

import com.example.appointementandclassroom.entities.category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepo extends JpaRepository<category, Integer> {
}
