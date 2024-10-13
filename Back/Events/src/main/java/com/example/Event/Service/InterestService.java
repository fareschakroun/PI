package com.example.Event.Service;

import com.example.Event.Entity.Event;
import com.example.Event.Entity.Interested;

import java.util.List;

public interface InterestService {

public Interested save(int event,int userId);

    public Event remove(int id);
    public List<Interested> findByUserID(int user);
    public List<Interested> findAllInterests();
    public Event removeByUserByEvent(int id, int eventid);
}
