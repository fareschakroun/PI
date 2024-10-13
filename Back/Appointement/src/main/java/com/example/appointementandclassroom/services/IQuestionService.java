package com.example.appointementandclassroom.services;

import com.example.appointementandclassroom.entities.Question;

import java.util.List;

public interface IQuestionService {

public List<Question> getAllQuestion();


    public Question addQuestion(Question question,int id_quiz);

    Question updatequestion(Question question ,int id_quiz);

    void deleatequestion(Integer id);

    List<Question> afficheAllQuestion();

    Question AfficheuneQuestion(Integer id);

    public List<Question> getQuestionsByQuizId(int quizId);
}
