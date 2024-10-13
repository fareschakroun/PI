package com.example.exhibitor.Service;


import com.example.exhibitor.Entity.Booth;
import com.example.exhibitor.Entity.Exhibitor;
import com.example.exhibitor.Entity.Supplier;
import com.example.exhibitor.Repository.BoothRepository;
import com.example.exhibitor.Repository.ExhibitorRepository;
import com.example.exhibitor.Repository.SupplierRepository;
import com.example.exhibitor.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoothServiceImpl implements BoothService {

    private final BoothRepository boothRepo;
    private final UserRepository userRepository;
    private final ExhibitorRepository exhibitorRepository ;
    private final SupplierRepository supplierRepository ;

    @Override
    public void saveBooth(Booth booth) {
        if(booth.getSupplier() == null) {
            Booth booth1 = new Booth();

            booth1.setBoothType(booth.getBoothType());
            booth1.setId(booth.getId());
            booth1.setX(booth.getX());
            booth1.setY(booth.getY());
            booth1.setBoothname(booth.getBoothname());
              boothRepo.save(booth1);

        }else{
            userRepository.save(booth.getSupplier());
            boothRepo.save(booth);
        }



    }
    public List<Booth> findAllBooths(){
        return boothRepo.findAll();
    }

    @Override
    public List<Booth> findAllBoothsByExhibitorId(Long exhibitor_id) {
        return boothRepo.findAllByExhibitorId(exhibitor_id);
    }

    @Override
    public void removeBooth(Long id) throws Exception {
        Booth booth = boothRepo.findById(id).orElseThrow(()-> new Exception("booth not found"));
         boothRepo.delete(booth);
    }

    @Override
    public void affectSupplierToBoothbyName(String nomBooth, Long idSupplier) {
        Optional<Supplier> optionalSupplier = userRepository.findById(idSupplier);

        if (optionalSupplier.isPresent()) {
            Supplier supplier = optionalSupplier.get();

            // Find the booth by name
            Booth booth = boothRepo.findByBoothname(nomBooth);

            if (booth != null) {
                // Update the booth's supplier
                booth.setSupplier(supplier);

                if (supplier.getBooths() == null) {
                    supplier.setBooths(new ArrayList<>());
                }
                // Add the booth to the supplier's booths
                supplier.getBooths().add(booth);

                // Save changes to supplier
                userRepository.save(supplier);

                // Save changes to booth
                boothRepo.save(booth);
            } else {
                // Handle the case when booth is not found
            }
        } else {
            // Handle the case when supplier is not found
        }
    }

    @Override
    public Boolean checkReserved(String BoothName) {
        Booth booth = boothRepo.findByBoothname(BoothName) ;
        if  (booth.getExhibitor() != null){
            return true ;
        }else{
            return false ;
        }
    }

    @Override
    public void affectBoothToExhibitor(String BoothName, Long ExhibitorId) {
        Booth booth = boothRepo.findByBoothname(BoothName) ;
        Exhibitor exhibitor = exhibitorRepository.findById(ExhibitorId).get();

        booth.setExhibitor(exhibitor);
        if(exhibitor.getBooth() == null){
            List<Booth> boothlist = new ArrayList<>();
            boothlist.add(booth);
            exhibitor.setBooth(boothlist);
        }else{
            exhibitor.getBooth().add(booth);

        }

        exhibitorRepository.save(exhibitor);
          boothRepo.save(booth);
    }

    @Override
    public Long ExhibitorIdByBooth(String boothName) {
        Booth booth = boothRepo.findByBoothname(boothName);

        Exhibitor exhibitor = exhibitorRepository.findByBooth(booth);

        if(exhibitor != null) {
            return exhibitor.getId();
        }
        return null ;
    }

    @Override
    public Long SupplierIdByBooth(String boothName) {
        Booth booth = boothRepo.findByBoothname(boothName);

        Supplier supplier = supplierRepository.findByBooths(booth);

        if(supplier != null) {
            return supplier.getId();
        }
        return null ;
    }


}
