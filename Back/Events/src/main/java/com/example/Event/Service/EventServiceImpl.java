package com.example.Event.Service;

import com.example.Event.Entity.Event;
import com.example.Event.Entity.Image;
import com.example.Event.Repository.EventRepository;
import com.example.Event.Repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService{

    private final EventRepository eventRepository;
    private final ImageRepository imageRepository;
    @Override
    public Event save(Event event) {
        Event eventTosaveInfo=new Event();
        Optional<Event> updateEvent=eventRepository.findById(event.getId());
        if (updateEvent.isPresent())
        {
            System.out.println("blabla");
            eventTosaveInfo=event;
            event=updateEvent.get();
            event.setName(eventTosaveInfo.getName());
            event.setImageId(eventTosaveInfo.getImageId());
            event.setImageUrl(eventTosaveInfo.getImageUrl());
            event.setDate(eventTosaveInfo.getDate());
            event.setLastModified_at(new Date());
            event.setCreated_at(updateEvent.get().getCreated_at());
            event.setImages(eventTosaveInfo.getImages());
            event.setNote(eventTosaveInfo.getNote());
        }
       Set<Image> list=event.getImages();
       if (event.getId()<1) {
           event.setImages(null);
           eventRepository.save(event);

           return saveimages(list,event);
       }
        eventRepository.save(event);
        return saveimages(list,event);
    }

    public Event saveimages(Set<Image> list,Event event){
        Set<Image> list2=new HashSet<>();
        System.out.println(event.getId());
        list.forEach(a->{
            if (a.getEventID()!=event.getId()){
                a.setEventID(event.getId());
                imageRepository.save(a);
                list2.add(a);
                System.out.println("image 1");
            }else {
                System.out.println("Image 2");
                list2.add(a);
            }

        });
        System.out.println(event.getId()+"UPDATING");

        event.setImages(list2);
        eventRepository.save(event);
        return event;
    }
    @Override
    public void update(Event event,int UserId) {
        Set<Image> list=event.getImages();
        event.setLastModified_at(new Date());
        event.setLastModified_by(UserId);
         saveimages(list,event);
    }

    public List<Event> findAllEvents(){
        return eventRepository.findAll();
    }

    @Override
    public List<Event> findAllEventsNoGalery() {

        return eventRepository.findAll();
    }
    @Override

    public List<Event> closestEvent() {
        List<Event> allEvents = eventRepository.findAll();
        Date currentDate = new Date();

        // Get upcoming events
        List<Event> upcomingEvents = allEvents.stream()
                .filter(event -> event.getDate().after(currentDate) || (event.getDate().getDay()==currentDate.getDay() && event.getDate().getMonth()==currentDate.getMonth()))
                .sorted(Comparator.comparing(Event::getDate))
                .limit(3)
                .collect(Collectors.toList());

        // If there are no upcoming events, retrieve the last event that has passed
        if (upcomingEvents.isEmpty()) {
            upcomingEvents = allEvents.stream()
                    .filter(event -> event.getDate().before(currentDate))
                    .sorted(Comparator.comparing(Event::getDate).reversed())
                    .limit(1)
                    .collect(Collectors.toList());
        }

        return upcomingEvents;
    }


    @Override
    public Event findbyId(int id) {
        return eventRepository.findById(id).get();
    }
    @Override
    public void removeImageIdFromEvent(int id) {
        Optional<Event> eventOptional = eventRepository.findByImages_Id(id);

        if (eventOptional.isPresent()) {
            Event event = eventOptional.get();

            // Remove the image with the specified id from the images set
            event.getImages().removeIf(image -> image.getId() == id);

            // Save the updated event back to the repository
            eventRepository.save(event);
        }
    }

    @Override
    public Event findbyName(String name) {
        Event event= eventRepository.findEventByName(name).orElse(null);
        if(event!=null)
        {
            event.setViewsCounter(event.getViewsCounter()+1);
            eventRepository.save(event);
        }
        return event;
    }



}
