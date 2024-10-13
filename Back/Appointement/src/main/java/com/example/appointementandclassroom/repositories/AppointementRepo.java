package com.example.appointementandclassroom.repositories;

import com.example.appointementandclassroom.entities.Appointement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AppointementRepo extends JpaRepository<Appointement, Integer> {
    @Query("SELECT a FROM Appointement a WHERE a.sender = :sender AND a.receiver = :receiver")
    List<Appointement> findAppointmentsBySenderAndReceiver(@Param("sender") int sender, @Param("receiver") int receiver);
}



