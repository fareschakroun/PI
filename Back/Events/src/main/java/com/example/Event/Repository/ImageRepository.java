package com.example.Event.Repository;

import com.example.Event.Entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;



public interface ImageRepository extends JpaRepository<Image,Integer> {

    List<Image> findImagesByEventID(int eventId);

}
