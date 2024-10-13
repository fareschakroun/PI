package com.example.appointementandclassroom.services;

import com.example.appointementandclassroom.entities.*;
import com.example.appointementandclassroom.repositories.QuizRepo;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IQuizService {


    Quiz createQuiz(QuizCreate quizCreate);


    ResponseEntity<List<QuestionWrapper>> getQuizQuestion(int id);

    ResponseEntity<Integer> CalculateResult(Integer id, List<Response> responses);

    Result CalculateResultAdvanced(AnswerSheet answerSheet);


    List<Quiz> getAllquiz();

     List<Quiz> afficheMyQuiz(int mine);

    List<Quiz> getQuizzesByCategory(String category);


    // public Quiz QuizBycateg(String categorie);

    public void addQuiz(Quiz quiz);

    public List<Quiz> afficheAllQuiz();

    public Quiz AfficheuneQuiz(int id);

    public void deleateQuiz(int id);

    public List<Result> userResult(int userId);

    public List<Result> quizResult(int quizId);
}
