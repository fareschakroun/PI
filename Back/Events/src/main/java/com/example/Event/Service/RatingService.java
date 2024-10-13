package com.example.Event.Service;

import com.example.Event.Entity.Rating;

import java.util.List;

public interface RatingService {

public void save(Rating rating);
public void remove(int event,int userId);
    public void remove(Rating rating);
    public List<Rating> findUserRatings(int user);
    public List<Rating> findEventRatings(int event);
    public List<Rating> findAllRatings();

    public void updateRating(Rating rating);
    public void updateRatingForEvent(int event);
}
