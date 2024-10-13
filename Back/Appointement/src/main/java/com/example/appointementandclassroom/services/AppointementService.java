package com.example.appointementandclassroom.services;

import com.example.appointementandclassroom.entities.Appointement;
import com.example.appointementandclassroom.entities.Classroom;
import com.example.appointementandclassroom.repositories.AppointementRepo;
import com.example.appointementandclassroom.repositories.ClassroomRepo;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AppointementService implements  IAppointementService {
    @Autowired
    private AppointementRepo appointementRepo;
    @Autowired
    private ClassroomRepo classroomRepo;
    @Autowired
    private ClassroomService classroomService;
    @Override
    public List<Appointement> retrieveAllAppointement() {
        return appointementRepo.findAll();
    }

  //  @Override
    //public Appointement addappointement(Appointement appointement) {
      //  appointement.setClassroom(classroomRepo.findById(appointement.getClassroomFK()).orElse(null));
       // return appointementRepo.save(appointement);
   // }
  @Override
  public Appointement addappointement(Appointement appointement) {
      List<Classroom> classrooms = classroomRepo.findAll();

      for (Classroom myclass : classrooms) {
          List<Date> freeAppointements = classroomService.getFreeAppointementsByClassroom(myclass.getId());
          if (freeAppointements.contains(appointement.getStart())) {
              Date starting=appointement.getStart();
              Date ending = new Date(starting.getTime() + (30 * 60 * 1000)); // 30 minutes in milliseconds


              appointement.setEnd(ending);
              appointement.setClassroom(myclass);

              sendEmail("chakroun.fares2020@gmail.com", appointement);
              return appointementRepo.save(appointement);

          }
      }
      System.out.println("test1");
      return null;
  }

    @Override
    public Appointement updateappointement(Appointement appointement) {

        return appointementRepo.save(appointement);
    }

    @Override
    public Appointement retrieveappointement(int numAppointement) {
        return appointementRepo.findById(numAppointement).orElse(null);
    }

    @Override
    public List<Appointement> retrieveappointement(int sender, int reciever) {

       // return appointementRepo.findAppointmentsBySenderAndReceiver(sender,reciever) ;
        return  appointementRepo.findAll().stream().filter((ele)->ele.getSender()==sender  || ele.getReceiver()==reciever).toList();
    }

    @Override
    public void deleteappointement(int id) {
        appointementRepo.deleteById(id);
    }

    //  @Override
   // public void deleteClassroom(int id) {

      //  classroomRepo.deleteById(id);
     //   appointementRepo.deleteById(id);
   // }
//---------------------------------------------Affectation ClasseRoom to Appointment -----------------------


    public void assignRandomClassroomToAppointment(int appointmentId) {
        Appointement appointment = appointementRepo.findById(appointmentId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid appointment id: " + appointmentId));

        List<Classroom> classrooms = classroomRepo.findAll();
        if (classrooms.isEmpty()) {
            throw new IllegalStateException("No classrooms available.");
        }



        Random random = new Random();
        int randomIndex = random.nextInt(classrooms.size());
        Classroom randomClassroom = classrooms.get(randomIndex);

        appointment.setClassroom(randomClassroom);
        randomClassroom.getAppointements().add(appointment);
        //randomClassroom.getAppointments().add(appointment);

        appointementRepo.save(appointment);
        classroomRepo.save(randomClassroom);
    }




    @Autowired
    private JavaMailSender emailSender;

    public void sendEmail(String recipient,Appointement user) {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        try {
            helper.setTo(recipient);
            helper.setSubject("Test email");
            helper.setText("Good Morning ,"+user.getReceiver() +"You have an  Appointement with Mr "+user.getSender()+" This Appointement  Started  " +user.getStart());
            emailSender.send(message);
            System.out.println("Message envoye");
        } catch (MessagingException e) {
            System.out.println("Error: " + e.toString());
        }
    }


}
