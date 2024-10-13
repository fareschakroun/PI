package com.example.exhibitor.Service;

import com.example.exhibitor.Entity.BoothSequence;

public interface BoothSequenceService {

    Long getSequence(String BoothName);

    BoothSequence AddBoothSequence(BoothSequence boothSequence);
    void incrementSequence(String Boothname);
}
