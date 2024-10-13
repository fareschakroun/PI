package com.example.appointementandclassroom.repositories;

import com.example.appointementandclassroom.entities.Quiz;
import com.example.appointementandclassroom.entities.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultRepo extends JpaRepository<Result, Integer> {

   // List<Quiz> findByCategory(String category);

    List<Result> findResultsByUserId(int userId);
    List<Result> findResultsByQuizId(int quizId);
}
