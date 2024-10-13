package com.example.appointementandclassroom.repositories;

import com.example.appointementandclassroom.entities.Question;
import com.example.appointementandclassroom.entities.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface QuizRepo extends JpaRepository<Quiz, Integer> {

   // List<Quiz> findByCategory(String category);

    List<Quiz> findQuizzesByUserId(int userId);

}
