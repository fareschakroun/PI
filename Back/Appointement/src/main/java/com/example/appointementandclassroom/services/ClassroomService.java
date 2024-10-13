package com.example.appointementandclassroom.services;

import com.example.appointementandclassroom.entities.Appointement;
import com.example.appointementandclassroom.entities.Classroom;
import com.example.appointementandclassroom.repositories.ClassroomRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ClassroomService implements  IClassroomService{
    @Autowired
    private ClassroomRepo classroomRepo ;
    @Override
    public List<Classroom> retrieveAllClassroom() {
        return classroomRepo.findAll();
    }

    @Override
    public Classroom addClassroom(Classroom classroom) {
        return classroomRepo.save(classroom);
    }

    @Override
    public Classroom updateClassroom(Classroom classroom) {
        return classroomRepo.save(classroom);

    }

    @Override
    public Classroom retrieveClassroom(int numClassroom) {
        return classroomRepo.findById(numClassroom).orElse(null);
    }

    @Override
    public void deleteClassroom(int id) {

        classroomRepo.deleteById(id);
    }

    @Override
    public List<Classroom> showClassesToAdmin() {
        return classroomRepo.findAll();

    }

    @Override
    public List<Date> getFreeAppointementsByClassroom(Integer classRoomId) {
        // Fetch the classroom by ID
        Classroom classroom = classroomRepo.findById(classRoomId).orElse(null);

        if (classroom == null) {
            // Handle the case where the classroom is not found
            return Collections.emptyList();
        }

        List<Date> freeAppointments = new ArrayList<>();

        // Calculate the intervals between start and end dates
        //Crée une instance de Calendar et l'initialise avec la date de début de la salle de classe.
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(classroom.getStart());

        while (calendar.getTime().before(classroom.getEnd())) {
            Date currentIntervalStart = calendar.getTime();
            calendar.add(Calendar.MINUTE, 30);
            Date currentIntervalEnd = calendar.getTime();

            // Check if the interval is free
            if (isIntervalFree(classroom, currentIntervalStart, currentIntervalEnd)) {

                freeAppointments.add(currentIntervalStart);
            }
        }

        return freeAppointments;
    }

    @Override
    public List<Date> getAllFree(){
        List<Classroom> mylist=classroomRepo.findAll();
            mylist.stream().filter((classroom -> classroom.getStart().after(new Date())));
            List<Date> datelist=new ArrayList<>();
                 for (Classroom classroom : mylist) {
                     for (Date dates:getFreeAppointementsByClassroom(classroom.getId())
                          ) {
                         datelist.add(dates);
                     }
                 }


        return datelist;
    }

    private boolean isIntervalFree(Classroom classroom, Date startTime, Date endTime) {
        // Check if there are no appointments within the given interval
        for (Appointement appointment : classroom.getAppointements()) {
            if (appointment.getStart().before(endTime) && appointment.getEnd().after(startTime)) {
                return false;
            }
        }
        return true;
    }


}
