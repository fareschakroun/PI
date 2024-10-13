package com.example.exhibitor.Repository;

import com.example.exhibitor.Entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image,Integer> {

    List<Image> findImagesByEventID(int eventId);

}