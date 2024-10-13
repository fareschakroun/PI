package com.example.exhibitor.Service;

import com.example.exhibitor.Entity.Exhibitor;
import com.example.exhibitor.Entity.FullExhibitorResponse;


import java.util.List;

public interface ExhibitorService {

    public void saveBooth(Exhibitor exhibitor);
    public List<Exhibitor> findAllexhibitors();

    public FullExhibitorResponse fullExhibitorResponse(Long exhibitorId);
}
