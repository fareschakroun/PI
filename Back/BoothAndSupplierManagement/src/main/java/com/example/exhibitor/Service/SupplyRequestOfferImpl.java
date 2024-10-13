package com.example.exhibitor.Service;

import com.example.exhibitor.Entity.Status;
import com.example.exhibitor.Entity.Supplier;
import com.example.exhibitor.Entity.SupplierRequest;
import com.example.exhibitor.Entity.SupplyRequestOffer;
import com.example.exhibitor.Repository.SupplierRepository;
import com.example.exhibitor.Repository.SupplierRequestRepository;
import com.example.exhibitor.Repository.SupplyRequestOfferRepository;
import com.example.exhibitor.dto.SupplierListDTO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class SupplyRequestOfferImpl implements SupplyRequestOfferService {

    SupplyRequestOfferRepository supplyRequestOfferRepository ;
    SupplierRequestRepository supplierRequestRepository ;
    SupplierRepository supplierRepository ;

    @Override
    public SupplyRequestOffer addSupplyOffer(SupplyRequestOffer supplyRequestOffer, Long supplierId, Long supplyRequestId) throws Exception {

       // Supplier supplier = supplierRepository.findById(supplierId).orElseThrow(() -> new Exception("supplier not found"));
       // SupplierRequest supplierRequest = supplierRequestRepository.findById(supplyRequestId).get();

        supplyRequestOffer.setSupplierRequestFK(supplyRequestId);
        supplyRequestOffer.setSupplierFk(supplierId);

         return supplyRequestOfferRepository.save(supplyRequestOffer);
    }

    @Override
    public List<SupplierListDTO> supplyRequestOffers(Long supplyRequestId) {
       // SupplierRequest supplierRequest = supplierRequestRepository.findById(supplyRequestId).get();
       List<SupplyRequestOffer> supplierRequestOffers = supplyRequestOfferRepository.findBySupplierRequestFK(supplyRequestId);

       List<SupplierListDTO> supplierListDTOS = new ArrayList<>();

        for (SupplyRequestOffer supp: supplierRequestOffers
             ) {
            SupplierListDTO supplierOfferInfo = new SupplierListDTO();
            supplierOfferInfo.setId(supp.getId());
            supplierOfferInfo.setPrice(supp.getPrice());
            supplierOfferInfo.setDescription(supp.getDescription());
            supplierOfferInfo.setSupplier( supplierRepository.findSupplierById(supp.getSupplierFk()));
            supplierOfferInfo.setStatus(supp.getStatus());
            supplierListDTOS.add(supplierOfferInfo);
        }
       return supplierListDTOS ;
    }

    @Override
    public List<SupplierListDTO> getAllSupplyRequests() {
        List<SupplyRequestOffer> supplierRequestOffers = supplyRequestOfferRepository.findAll();
        List<SupplierListDTO> supplierListDTOS = new ArrayList<>();

        for (SupplyRequestOffer supp: supplierRequestOffers
        ) {
            SupplierListDTO supplierOfferInfo = new SupplierListDTO();
            supplierOfferInfo.setId(supp.getId());
            supplierOfferInfo.setPrice(supp.getPrice());
            supplierOfferInfo.setDescription(supp.getDescription());
            supplierOfferInfo.setStatus(supp.getStatus());
            supplierOfferInfo.setSupplier( supplierRepository.findSupplierById(supp.getSupplierFk()));
            supplierOfferInfo.setSupplierRequest(supplierRequestRepository.findById(supp.getSupplierRequestFK()).get());
            supplierListDTOS.add(supplierOfferInfo);
        }
        return supplierListDTOS ;
    }

    @Override
    public void removeSupplyOffer(Long userId,Long SupplyOfferId) {

        SupplyRequestOffer supplyOffer = supplyRequestOfferRepository.findBySupplierFkAndSupplierRequestFK(userId,SupplyOfferId).get(0);
        supplyRequestOfferRepository.delete(supplyOffer);
    }
    @Override
    public SupplyRequestOffer changeSupplierRequestStatus(Status status, Long requestid) throws Exception {
        SupplyRequestOffer supplierRequest=supplyRequestOfferRepository.findById(requestid).orElseThrow(() -> new Exception("supplier request not found"));
        if(status.equals(Status.Approved))
        {
            supplierRequest.setStatus(Status.Approved);
        }
        else {
            supplierRequest.setStatus(Status.NotApproved);

            

        }
        return supplyRequestOfferRepository.save(supplierRequest);

    }

    @Override
    public SupplyRequestOffer changeOfferPrice(Long price, Long supplyrequestId) {
        SupplyRequestOffer offer = supplyRequestOfferRepository.findBySupplierRequestFK(supplyrequestId).get(0);
        offer.setPrice(price);
        return supplyRequestOfferRepository.save(offer);

    }

}
