package com.example.Event.Repository;

import com.example.Event.Entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EventRepository extends JpaRepository<Event,Integer> {


    Optional<Event> findByImages_Id(int imageId);
    Optional<Event> findEventByName(String name);
}
