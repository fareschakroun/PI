package com.example.Event.Service;

import com.example.Event.Entity.Event;

import java.util.List;

public interface EventService {

public Event save(Event event);
public void update(Event event,int UserId);
    public List<Event> findAllEvents();
    public List<Event> findAllEventsNoGalery();
public List<Event> closestEvent();
    public Event findbyId(int id);
public void removeImageIdFromEvent(int id);
public Event findbyName(String name);

}
