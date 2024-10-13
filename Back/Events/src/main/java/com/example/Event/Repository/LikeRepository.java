package com.example.Event.Repository;

import com.example.Event.Entity.Dislike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikeRepository extends JpaRepository<Dislike,Integer> {

    List<Dislike> findByUserID(int user);
    Dislike findLikeByEventIDAndUserID(int event, int user);


    List<Dislike> findByEventID(int event);

}
