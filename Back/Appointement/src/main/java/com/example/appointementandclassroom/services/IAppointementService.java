package com.example.appointementandclassroom.services;

import com.example.appointementandclassroom.entities.Appointement;

import java.util.List;

public interface IAppointementService {

    List<Appointement> retrieveAllAppointement();

    Appointement  addappointement(Appointement  appointement);

    Appointement updateappointement(Appointement appointement);

    Appointement retrieveappointement(int numAppointement);

    List<Appointement> retrieveappointement(int sender, int reciever);
    void deleteappointement(int id);

    public void sendEmail(String recipient,Appointement user);
}
