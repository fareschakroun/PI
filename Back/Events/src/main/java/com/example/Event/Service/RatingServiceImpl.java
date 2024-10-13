package com.example.Event.Service;

import com.example.Event.Entity.Event;
import com.example.Event.Entity.Rating;
import com.example.Event.Repository.EventRepository;
import com.example.Event.Repository.RatingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RatingServiceImpl implements RatingService{

    private final RatingRepository ratingRepository;
    private final EventRepository eventRepository;

    @Override
    public void save(Rating rating) {
        Event event1=eventRepository.findById(rating.getEventID()).get();
        if (rating.getStatus()==null || rating.getStatus().isEmpty())
        {
            rating.setStatus("Accepted");
        }
        if (ratingRepository.findById(rating.getId()).isPresent())
        {
            updateRating(rating);
            updateRatingForEvent(event1.getId());
        }else {
            event1.getRatings().add(rating);

        eventRepository.save(event1);
        updateRatingForEvent(event1.getId());
        }
    }



    @Override
    public void remove(Rating rating){
        Event event1=eventRepository.findById(rating.getEventID()).get();

        event1.getRatings().remove(rating);

        eventRepository.save(event1);
        updateRatingForEvent(rating.getEventID());
        ratingRepository.delete(rating);

    }

    @Override
    public List<Rating> findUserRatings(int user) {
        return ratingRepository.findByUserID(user);
    }
    @Override
    public List<Rating> findEventRatings(int event) {
        return ratingRepository.findByEventID(event);
    }

    @Override
    public void remove(int event,int userId){

            Rating rating=ratingRepository.findRatingByEventIDAndUserID(event,userId);
        ratingRepository.delete(rating);
        updateRatingForEvent(rating.getEventID());
    }
    public List<Rating> findAllRatings(){
        return ratingRepository.findAll();
    }

    @Override
    public void updateRating(Rating rating) {
      //  Rating rating1=ratingRepository.findById(rating.getId()).get();
      //  rating1.setComment(rating.getComment());
        ratingRepository.save(rating);
    }

    @Override
    public void updateRatingForEvent(int event) {
        Event event1=eventRepository.findById(event).get();
        int size=event1.getRatings().size();
        double somme=event1.getRatings().stream().mapToDouble(Rating::getRating).sum();
      if (size ==0)
      {
          event1.setRating(0);
      }else
      {
          event1.setRating(somme/ (double) size);
      }

        eventRepository.save(event1);
    }


}
