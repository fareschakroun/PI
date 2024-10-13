package com.example.exhibitor.Service;

import com.example.exhibitor.Entity.Booth;
import com.example.exhibitor.Entity.BoothSequence;
import com.example.exhibitor.Repository.BoothRepository;
import com.example.exhibitor.Repository.BoothSequenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BoothSequenceImpl implements BoothSequenceService{

    private final BoothRepository boothRepository ;
    private final BoothSequenceRepository boothSequenceRepository ;
    @Override
    public Long getSequence(String BoothName) {
        BoothSequence boothSequence = boothSequenceRepository.findFirstByIdIsNotNull();
        if(BoothName != null) {// Assuming there's only one row
            if (BoothName.contains("small")) {

                return boothSequence.getSmallBoothSequence();

            } else if (BoothName.contains("medium")) {
                return boothSequence.getMediumBoothSequence();
            } else {
                return boothSequence.getBigBoothSequence();
            }
        }
        return null ;

    }

    @Override
    public BoothSequence AddBoothSequence(BoothSequence boothSequence) {
       return boothSequenceRepository.save(boothSequence);
    }

    @Override
    public void incrementSequence(String BoothName) {
        BoothSequence boothSequence = boothSequenceRepository.findFirstByIdIsNotNull();
        if(BoothName.contains("small")){

            boothSequence.setSmallBoothSequence(boothSequence.getSmallBoothSequence()+1);


        }else if (BoothName.contains("medium")){
            boothSequence.setMediumBoothSequence(boothSequence.getMediumBoothSequence()+1);

        }
        else {
            boothSequence.setBigBoothSequence(boothSequence.getBigBoothSequence()+1);

        }
        boothSequenceRepository.save(boothSequence);

    }
}
