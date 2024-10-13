package com.example.appointementandclassroom.services;

import com.example.appointementandclassroom.entities.Appointement;
import com.example.appointementandclassroom.entities.Classroom;

import java.util.Date;
import java.util.List;

public interface IClassroomService {


    List<Classroom> retrieveAllClassroom();

    Classroom  addClassroom(Classroom  classroom);

    Classroom updateClassroom(Classroom classroom);

    Classroom retrieveClassroom(int numClassroom);

    //Offer updateOffer(Offer offer);
    void deleteClassroom(int id);



    List<Classroom> showClassesToAdmin();

    List<Date> getFreeAppointementsByClassroom(Integer classRoomId);
    List<Date> getAllFree();

}
