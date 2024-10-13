package com.example.Event.Service;

import com.example.Event.Entity.Image;
import com.example.Event.Repository.EventRepository;
import com.example.Event.Repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ImageService {
    @Autowired
    ImageRepository imageRepository;
  @Autowired
  EventRepository eventRepository;

    public List<Image> list()
    {
        return imageRepository.findAll();
    }
    public List<Image> list(int eventid)
    {
        return eventRepository.findById(eventid).get().getImages().stream().toList();
     //   return imageRepository.findImagesByEventID(eventid);
    }

    public Optional<Image> getOne(int id){return imageRepository.findById(id);}
    public void save(Image image){imageRepository.save(image);}

    public void delete(int id){imageRepository.deleteById(id);}
    public boolean exists(int id){return imageRepository.existsById(id);}
}
