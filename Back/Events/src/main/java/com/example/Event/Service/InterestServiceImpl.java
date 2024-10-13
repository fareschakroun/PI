package com.example.Event.Service;

import com.example.Event.Entity.Event;
import com.example.Event.Entity.Interested;
import com.example.Event.Repository.EventRepository;
import com.example.Event.Repository.InterestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class InterestServiceImpl implements InterestService{

    private final InterestRepository interestRepository;
    private final EventRepository eventRepository;
    @Override
    public Interested save(int event,int user) {
        Interested interested=new Interested(0,user,event,new Date());
        System.out.println("Called");
        if (interestRepository.findInterestedByEventIDAndUserID(event,user)==null)
        {
            interestRepository.save(interested);
            Event event1=eventRepository.findById(event).get();
            event1.setInterestedCounter(event1.getInterestedCounter()+1);
            event1.getInteresteds().add(interested);
            eventRepository.save(event1);
            return interested;
        }

    return null;
    }



    @Override
    public Event remove(int id){
    Interested interested=interestRepository.findById(id).get();
        Event event1=eventRepository.findById(interested.getEventID()).get();
        event1.setInterestedCounter(event1.getInterestedCounter()-1);
        event1.getInteresteds().remove(interested);
        interestRepository.delete(interested);
        eventRepository.save(event1);
        return event1;
    }

    @Override
    public List<Interested> findByUserID(int user) {
        return interestRepository.findInterestedBIESByUserID(user);
    }


    public List<Interested> findAllInterests(){
        return interestRepository.findAll();
    }


        @Override
        public Event removeByUserByEvent(int id, int eventid) {
     
            Optional<Interested> interested = interestRepository.findAll()
                    .stream()
                    .filter(interest -> interest.getEventID() == eventid && interest.getUserID() == id)
                    .findFirst();

            if (interested.isPresent()) {
                Interested interested2 = interested.get();
                Optional<Event> eventOptional = eventRepository.findById(eventid);

                if (eventOptional.isPresent()) {
                    Event event = eventOptional.get();

                    Set<Interested> interesteds = event.getInteresteds();
                    interesteds.remove(interested2);
                    event.setInteresteds(interesteds);
                    event.setInterestedCounter(event.getInterestedCounter()-1);
                    eventRepository.save(event);
                }

                interestRepository.delete(interested2);
            }

            return eventRepository.findById(eventid).get();
    }


}
