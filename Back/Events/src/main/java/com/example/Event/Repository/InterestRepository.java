package com.example.Event.Repository;

import com.example.Event.Entity.Interested;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InterestRepository extends JpaRepository<Interested,Integer> {


    Interested findInterestedByEventIDAndUserID(int event, int userid);



    List<Interested> findInterestedBIESByUserID(int user);
}
