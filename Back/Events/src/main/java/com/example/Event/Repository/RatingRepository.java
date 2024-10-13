package com.example.Event.Repository;

import com.example.Event.Entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating  ,Integer> {

    List<Rating> findByUserID(int user);
    Rating findRatingByEventIDAndUserID(int event,int user);


    List<Rating> findByEventID(int event);

}
