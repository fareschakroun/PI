package com.example.Event.Service;

import com.example.Event.Entity.Booth;
import com.example.Event.Repository.BoothRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoothServiceImpl implements BoothService{

    private final BoothRepository boothRepo;

    @Override
    public void saveBooth(Booth booth) {
        boothRepo.save(booth);
    }
    public List<Booth> findAllBooths(){
        return boothRepo.findAll();
    }

    @Override
    public List<Booth> findAllBoothsByExhibitorId(Long exhibitor_id) {
        return boothRepo.findAllByExhibitorId(exhibitor_id);
    }
}
