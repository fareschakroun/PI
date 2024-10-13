package com.example.exhibitor.Service;

import com.example.exhibitor.Entity.Exhibitor;
import com.example.exhibitor.Entity.FullExhibitorResponse;
import com.example.exhibitor.Repository.ExhibitorRepository;

import com.example.exhibitor.client.BoothClient;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor

public class ExhibitorServiceImpl implements ExhibitorService {

    private final ExhibitorRepository exhibitorRepo;


    //private   final BoothClient clientBooth ;

    @Override
    public void saveBooth(Exhibitor exhibitor) {
        exhibitorRepo.save(exhibitor);
    }
    public List<Exhibitor> findAllexhibitors(){
        return exhibitorRepo.findAll();
    }

    @Override
    public FullExhibitorResponse fullExhibitorResponse(Long exhibitorId) {
     /*  var exhibitor = exhibitorRepo.findById(exhibitorId).
               orElse(
                       Exhibitor.builder()
                               .Id(0)
                               .ExhibitorName("NOT FOUND")
                               .boothId(new ArrayList<>())
                               .build()
               );
        var booths = clientBooth.findAllBooths(exhibitorId);
        return FullExhibitorResponse.builder()
                .exhibitor(exhibitor)
                .BoothPosition(booths)
                .build()
                ;*/

return null ;
    }


}
