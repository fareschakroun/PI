package com.example.appointementandclassroom.controllers;

import com.example.appointementandclassroom.entities.*;
import com.example.appointementandclassroom.services.*;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;


@RestController
@RequestMapping("/api/AppointementAndClassrooms/")
@RequiredArgsConstructor
//@CrossOrigin
public class AppointementManagement {
    @Autowired
    private  final AppointementService appointementService ;
    @Autowired
    private  final ClassroomService classroomService ;


    //----------------------Swager -------------------------------
    //  http://localhost:8095/swagger-ui/index.html#/
    //-----------------------------------------------------------

//------------------------------------------------------------------
    //-------------------------Appointement CRUD ------------------------
//--------------------------------------------------------------------
   // @Operation(description = "Add appointement")
    @PostMapping("/add_Appointement")
    public Appointement addappointement(@RequestBody Appointement appointement){
        System.out.println(appointement.toString());
        return  appointementService.addappointement(appointement);
    }

    @Operation(description = "Retrieve all free appointements")
    @GetMapping("/getFreeDatesPerClassroom/{classroomId}")
    public List<Date> getFreeDates(@PathVariable("classroomId") Integer classroomId){
        return classroomService.getFreeAppointementsByClassroom(classroomId);
    }

    @Operation(description = "Retrieve all Appointement")
    @GetMapping("/all_Appointement")
    public List<Appointement> getAllAppointement(){
        return appointementService.retrieveAllAppointement();
    }
    @Operation(description = "Retrieve all Classrooms")
    @GetMapping("/all_classrooms")
    public List<Classroom> getAllclasses(){
        return classroomService.showClassesToAdmin();
    }

    @Operation(description = "Update Appointement ")
    @PutMapping("/update_Appointement")
    public Appointement updateAppointement(@RequestBody Appointement appointement){
        return  appointementService.updateappointement(appointement);
    }

    @Operation(description = "Retrieve Appointement by Id")
    @GetMapping("/getAppointement/{id-Appointement}")
    public Appointement getById(@PathVariable("id-Appointement") int numappointement){
        return appointementService.retrieveappointement(numappointement);
    }

    @Operation(description = "Retrieve all Appointement for youser")
    @GetMapping("/all_Appointement_foryouser/{id}")
    public List<Appointement> getAllAppointementforUser(@PathVariable("id") int id)
    {
        return appointementService.retrieveappointement(id,id);

    }

    @DeleteMapping("/deleteAppointement/{idAppointement}")
   public void deleteAppointement(@PathVariable("idAppointement") int id){
        appointementService.deleteappointement(id);
    }




    //--------------------------------------------------------------
//--------------------- Classeroom CRUD ------------------------
//----------------------------------------------------------
    @PostMapping("/add_Classroom")
    public Classroom addClassroom(@RequestBody Classroom classroom){
        return  classroomService.addClassroom(classroom);
    }


    @Operation(description = "Retrieve all Classroom")
    @GetMapping("/all_Classroom")
    public List<Classroom> getAllClassroom(){
        return classroomService.retrieveAllClassroom();
    }

    @Operation(description = "Update Classroom ")
    @PutMapping("/update_Classroom")
    public Classroom updateClassroom(@RequestBody Classroom classroom){
        return  classroomService.updateClassroom(classroom);





    }

    @Operation(description = "Retrieve Classroom by Id")
    @GetMapping("/getClassroom/{id-Classroom}")
    public Classroom getClassroomById(@PathVariable("id-Classroom") int numClassroom){
        return classroomService.retrieveClassroom(numClassroom);
    }



    @DeleteMapping("/deleteClassroom/{idClassroom}")
    public void deleteClassroom(@PathVariable("idClassroom") int id){
        classroomService.deleteClassroom(id);
    }
//---------------------------------------------Affectation ClasseRoom to Appointment -----------------------
@Operation(description = "Retrieve freeAppointements by classroomId")
@GetMapping("/getFreeAppointements/{id-Classroom}")
public List<Date> getFreeApointements(@PathVariable("id-Classroom") int numClassroom){
    return classroomService.getFreeAppointementsByClassroom(numClassroom);
}

@GetMapping("/availableTime")
public List<Date> getAvailableDate(){
        return classroomService.getAllFree();
}



    //----------------------------------------------------------
    // -------------- Quiz-------------------------
    // -------------- Question-------------------------




    @Autowired
    QuestionService questionService;

    @GetMapping("allquestions")
    public  List<Question> getAllquestion(){

        return  questionService.getAllQuestion();
    }

    @GetMapping("AllQuiz")
    public  List<Quiz> getAllQuiz(){

        return quizService.getAllquiz();
    }



        @PostMapping("add-questions/{id_quiz}")
    public Question addQuestions(@RequestBody Question question,@PathVariable("id_quiz") int id_quiz){
                if (question.getId()==0)
        return  questionService.addQuestion(question,id_quiz);
                else
        return questionService.updatequestion(question,id_quiz);
    }




    @Autowired
    QuizService quizService;


    @PostMapping("createQuiz")
        public ResponseEntity<Quiz> createQuiz(@RequestBody QuizCreate quizCreate){

        return new ResponseEntity<>(quizService.createQuiz(quizCreate), HttpStatus.CREATED);
    }



    @GetMapping("/Get_Quiz_Question/{id}")
    public ResponseEntity<List<QuestionWrapper>> getquizQuestions(@PathVariable int id){
       return quizService.getQuizQuestion(id);

    }

    @PostMapping("Submit/{id}")
    public ResponseEntity<Integer> SubmitQuiz(@PathVariable Integer id , @RequestBody List<Response>  responses){

    return quizService.CalculateResult(id,responses);


    }


    @PostMapping("/SubmitAdvanced")
    public Result  SubmitQuizAdvanced( @RequestBody AnswerSheet responses){
        return quizService.CalculateResultAdvanced(responses);


    }

    @GetMapping("/quizzes/{category}")
    public List<Quiz> getQuizzesByCategory(@PathVariable String category) {
        return quizService.getQuizzesByCategory(category);
    }



//-------------- category Service

    @Autowired
    CategoryService categoryService;

    @Operation(description = "Retrieve all category")
    @GetMapping("/all_category")
    public List<category> getAllAcategory(){
        return categoryService.retrieveAllcategory();
    }




    //----------------------------- 5edma  quiz -------------------------------

    @PostMapping("/ajoutnewQuiz")
    public void addQuiz(@RequestBody  Quiz quiz) {
        quizService.addQuiz(quiz);
    }
    @GetMapping("/afficher-tous-les-quiz")
    public List<Quiz> afficheAllQuiz() {
        return quizService.afficheAllQuiz();
    }

    @GetMapping ("/afficher-une-quiz/{id}")
    public Quiz AfficheuneQuiz(@PathVariable ("id") Integer id) {
        return quizService.AfficheuneQuiz(id);
    }

@DeleteMapping("/deleteByID/{id}")

    public  void  deletequie(@PathVariable ("id") Integer id){
        quizService.deleateQuiz(id);

}

// --------- update question

 //   QuestionService questionService;
//    @Operation(description = "Update-question ")
//    @PutMapping("/update_question")
//    public Question updateQuestion(@RequestBody Question question){
//        return  questionService.updatequestion(question);
//    }

    // delete question

    @DeleteMapping("/deleteQuestionByID/{id}")
    public  void  deletequestion(@PathVariable ("id") Integer id){
        questionService.deleatequestion(id);

    }


    // afficher tous les question
    @GetMapping("/afficher-tous-les-question")
    public List<Question> afficheAllquestion() {
        return questionService.afficheAllQuestion();
    }



    // Afficher  une Question
    @PostMapping("/afficher-une-Question/{id}")
    public Question AfficheuneQuestion(@PathVariable ("id") Integer id) {
        return questionService.AfficheuneQuestion(id);
    }


// find all questions by quiz id

    @GetMapping("/getAllquestionsbyquizid/{id}")
    public List<Question> getQuestionsByQuizId(@PathVariable int id) {
        return questionService.getQuestionsByQuizId(id);
    }

    @GetMapping("/userResult/{userid}")
    public List<Result> getuserResult(@PathVariable("userid") int userid)
    {
        return quizService.userResult(userid);
    }
    @GetMapping("/quizResult/{quizid}")
    public List<Result> getquizResult(@PathVariable("quizid") int quizid)
    {
        return quizService.quizResult(quizid);
    }
    @GetMapping("/afficherQuizes/{mine}")
    public List<Quiz> getQuizez(@PathVariable("mine") int mine){
        System.out.println("getting quizes");
        return quizService.afficheMyQuiz(mine);
    }
 }