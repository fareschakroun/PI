package com.example.Event.Service;

import com.example.Event.Entity.Event;
import com.example.Event.Entity.Presence;
import com.example.Event.Repository.EventRepository;
import com.example.Event.Repository.PresenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class PresenceImpl implements PresenceService{
    @Autowired
    PresenceRepository presenceRepository;
    @Autowired
    EventRepository eventRepository;
    @Override
    public Presence addPressence(Presence presence, int eventId) {
       Event currentEvent= eventRepository.findById(eventId).get();
        if (currentEvent != null) {
            Set<Presence> presences = currentEvent.getPresences();

            for (Presence existingPresence : presences) {
                if (existingPresence.getUserId() == presence.getUserId()) {
                    // Presence with the same userId already exists, return the original item
                    return existingPresence;
                }
            }
            presence.setEventId(eventId);
            presenceRepository.save(presence);
            // Presence not found, add it to the list
            presences.add(presence);
            currentEvent.setPresences(presences);

            eventRepository.save(currentEvent);

            return presence;
        }
        return null;
    }

    @Override
    public List<Presence> listPressenceForEvent(int eventId) {
        return null;
    }
}
