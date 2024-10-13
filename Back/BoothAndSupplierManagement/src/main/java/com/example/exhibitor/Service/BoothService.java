package com.example.exhibitor.Service;



import com.example.exhibitor.Entity.Booth;

import java.util.List;

public interface BoothService {

public void saveBooth(Booth booth);
    public List<Booth> findAllBooths();

    List<Booth> findAllBoothsByExhibitorId(Long exhibitor_id);

    void removeBooth(Long id) throws Exception;

    void affectSupplierToBoothbyName(String nomBooth,Long idSupplier);

    Boolean checkReserved(String BoothName);
    void affectBoothToExhibitor(String BoothName,Long ExhibitorId);

    Long ExhibitorIdByBooth(String boothName);
    Long SupplierIdByBooth(String boothName);

}
