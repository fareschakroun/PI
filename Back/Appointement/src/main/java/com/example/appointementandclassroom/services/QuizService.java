package com.example.appointementandclassroom.services;

import com.example.appointementandclassroom.entities.*;
import com.example.appointementandclassroom.repositories.QuestionRepo;
import com.example.appointementandclassroom.repositories.QuizRepo;
import com.example.appointementandclassroom.repositories.ResultRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuizService implements  IQuizService{
    @Autowired
    private QuizRepo quizRepo;
    @Autowired
    private QuestionRepo questionRepo ;
    @Autowired
    private ResultRepo resultRepo;

    @Override
    public Quiz createQuiz(QuizCreate quizCreate) {
      /*  // A3tiinii les qustions bill categorie ou 9adeeh men question
        List<Question> questions = questionRepo.findRandomQuestionsByCategory(quizCreate.getCategory(), quizCreate.getNumQ());

        Quiz quiz = new Quiz();
        quiz.setTitle(quizCreate.getTitle());
        quiz.setQuestions(questions);

        return     quizRepo.save(quiz);
*/
        return null;
    }


    @Override
    public ResponseEntity<List<QuestionWrapper>> getQuizQuestion(int id) {
        Optional<Quiz> quiz = quizRepo.findById(id);
        List<Question> questionsFromDB = quiz.get().getQuestions();
        List<QuestionWrapper> questionsForUser = new ArrayList<>();
    for(Question q: questionsFromDB)
    {
        QuestionWrapper qw = new QuestionWrapper(q.getId() , q.getQuestion() , q.getOptions());
        questionsForUser.add(qw);
    }


        return  new ResponseEntity<>(questionsForUser,HttpStatus.OK );
    }

    @Override
    public ResponseEntity<Integer> CalculateResult(Integer id, List<Response> responses) {
        Quiz  quiz = quizRepo.findById(id).get();
        List<Question> questions = quiz.getQuestions();
        int right =0 ;
        int i =0 ;
        for(Response response : responses){

            if(response.getResponses().equals(questions.get(i).getAnswer()))
                right ++ ;
            i++ ;
        }
        return  new ResponseEntity<>(right,HttpStatus.OK );
    }




   @Override
    public Result CalculateResultAdvanced(AnswerSheet answerSheet) {
        Quiz quiz=  quizRepo.findById(answerSheet.getQuizId()).get();

        List<Question> questions = quiz.getQuestions();
        List<String> userAnswers = answerSheet.getAnswers();

        float score = 0;
        float maxPossibleScore = 0;
        long elapsedTime = answerSheet.getElapsedTime();

        // Iterate over each question
        for (int i = 0; i < questions.size(); i++) {
            Question question = questions.get(i);
            String correctAnswerNumber = question.getAnswer();
            String correctAnswer = question.getOptions().get(Integer.parseInt(correctAnswerNumber));
            String userAnswer = userAnswers.get(i);

            // Increment max possible score
            maxPossibleScore += question.getCoefficient();

            // If user's answer matches the correct answer, increment the score
            if (correctAnswer.equals(userAnswer)) {

                float adjustedCoefficient = adjustCoefficientBasedOnDifficulty(question.getDifficultylevel(), question.getCoefficient());
                score += adjustedCoefficient;
            }
        }

        // Adjust score based on elapsed time
        score += adjustScoreBasedOnTime(elapsedTime, score);
       maxPossibleScore += adjustScoreBasedOnTime(0, maxPossibleScore);

        // Create and return the Result object
        Result result = new Result();
        result.setUserId(answerSheet.getUserId());
        result.setQuizId(answerSheet.getQuizId());
        result.setScore(score);
        result.setTime(new Time(System.currentTimeMillis()));
        result.setMaxScore(maxPossibleScore);

        return resultRepo.save(result);
    }

    // Method to adjust coefficient based on difficulty level
    private float adjustCoefficientBasedOnDifficulty(String difficultyLevel, float coefficient) {

        float adjustedCoefficient = coefficient;

//        switch (difficultyLevel.toLowerCase()) {
//            case "easy":
//                adjustedCoefficient *= 1.0;
//                break;
//            case "medium":
//                adjustedCoefficient *= 1.2;
//                break;
//            case "hard":
//                adjustedCoefficient *= 1.5;
//                break;
//            default:
//                // No adjustment for unknown difficulty levels
//                break;
//        }

        return adjustedCoefficient ;
    }

    // Method to adjust score based on elapsed time
    private float adjustScoreBasedOnTime(long elapsedTime, float maxPossibleScore) {
        // Implement your logic here to adjust score based on elapsed time
        // For example, faster completion earns bonus points
        float bonusFactor = 1.0f; // Default, no bonus

        if (elapsedTime < 300) { // Bonus for completing in less than 5 minutes
            bonusFactor = 1.2f; // 20% bonus
        } else if (elapsedTime < 600) { // Bonus for completing in less than 10 minutes
            bonusFactor = 1.1f; // 10% bonus
        }

        return maxPossibleScore * bonusFactor;
    }


    @Override
    public List<Quiz> getAllquiz() {
        return quizRepo.findAll();
    }

    @Override
    public List<Quiz> getQuizzesByCategory(String category) {
        //return quizRepo.findByCategory(category);
        return null;
    }
// tesstt
    @Override
    public void addQuiz(Quiz quiz) {
         quizRepo.save(quiz);
    }

    @Override
    public List<Quiz> afficheAllQuiz() {
        return quizRepo.findAll();
    }

    @Override
    public List<Quiz> afficheMyQuiz(int mine) {
        return quizRepo.findQuizzesByUserId(mine);
    }
    @Override
    public Quiz AfficheuneQuiz(int id) {
        return quizRepo.findById(id).orElse(null);
    }

    @Override
    public void deleateQuiz(int id) {
        quizRepo.deleteById(id);
    }

    @Override
    public List<Result> userResult(int userId){
        return resultRepo.findResultsByUserId(userId);
    }
    @Override
    public List<Result> quizResult(int quizId){
        return resultRepo.findResultsByQuizId(quizId);
    }

}
