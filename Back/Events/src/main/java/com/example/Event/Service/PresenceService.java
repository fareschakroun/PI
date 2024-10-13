package com.example.Event.Service;

import com.example.Event.Entity.Presence;

import java.util.List;

public interface PresenceService {

    public Presence addPressence(Presence presence,int eventId);
    public List<Presence> listPressenceForEvent(int eventId);

}
