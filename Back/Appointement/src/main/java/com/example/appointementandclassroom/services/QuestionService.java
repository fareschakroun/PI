package com.example.appointementandclassroom.services;

import com.example.appointementandclassroom.entities.Appointement;
import com.example.appointementandclassroom.entities.Question;
import com.example.appointementandclassroom.entities.Quiz;
import com.example.appointementandclassroom.repositories.QuestionRepo;
import com.example.appointementandclassroom.repositories.QuizRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService implements  IQuestionService{

    @Autowired
    private QuestionRepo questionRepo ;
    @Autowired
    private QuizRepo quizRepo;


    @Override
    public List<Question> getAllQuestion() {
        return questionRepo.findAll();
    }



    @Override
    public Question addQuestion(Question question,int id_quiz) {
        Quiz quiz=quizRepo.findById(id_quiz).orElse(null);
        question.setQuiz(quiz);
        return questionRepo.save(question);
    }

    @Override
    public Question updatequestion(Question question,int id_quiz) {
        Quiz quiz=quizRepo.findById(id_quiz).orElse(null);
        question.setQuiz(quiz);
        return questionRepo.save(question);
    }

    @Override
    public void deleatequestion(Integer id) {
        questionRepo.deleteById(id);
    }

    @Override
    public List<Question> afficheAllQuestion() {
        return questionRepo.findAll();
    }


    @Override
    public Question AfficheuneQuestion(Integer id) {
        return questionRepo.findById(id).orElse(null);
    }

// find question by quiz id

    public List<Question> getQuestionsByQuizId(int quizId) {
        return questionRepo.findAllByQuizId(quizId);
    }
}

