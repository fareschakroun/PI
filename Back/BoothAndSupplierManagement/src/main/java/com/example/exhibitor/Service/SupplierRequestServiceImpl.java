package com.example.exhibitor.Service;

import com.example.exhibitor.Entity.Status;
import com.example.exhibitor.Entity.Supplier;
import com.example.exhibitor.Entity.SupplierRequest;
import com.example.exhibitor.Repository.SupplierRepository;
import com.example.exhibitor.Repository.SupplierRequestRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class SupplierRequestServiceImpl implements SupplierRequestService{

      SupplierRequestRepository supplierRequestRepository;

      SupplierRepository supplierRepository ;
    @Override
    public SupplierRequest addRequest(SupplierRequest request) {
        return supplierRequestRepository.save(request);
    }

    @Override
    public void deleteRequest(Long id) throws Exception {
        SupplierRequest s =supplierRequestRepository.findById(id).orElseThrow(() -> new Exception("supplierRequestNotFound"));

        supplierRequestRepository.delete(s);
    }

    @Override
    public SupplierRequest ModifyRequest(SupplierRequest request) {
        return supplierRequestRepository.save(request);
    }

    @Override
    public List<SupplierRequest> getAllRequests() {
        return supplierRequestRepository.findAll();
    }

    @Override
    public SupplierRequest AffectSupplierRequestToSupplier(Long supplierRequestId, Long supplierId) throws Exception {

        Supplier supplier = supplierRepository.findById(supplierId).orElseThrow(()-> new Exception("supplier not found"));
        SupplierRequest supplierRequest = supplierRequestRepository.findById(supplierRequestId).orElseThrow(() -> new Exception("supplier erquest not found"));

        supplier.getSupplierRequests().add(supplierRequest);
        supplierRequest.setSupplier(supplier);
         supplierRepository.save(supplier);
         supplierRequestRepository.save(supplierRequest);
         return supplierRequest ;
    }



    @Override
    public SupplierRequest getSupplierRequestStatus(Long requestid) throws Exception {
        return supplierRequestRepository.findById(requestid).orElseThrow(() -> new Exception("supplier request not found"));


    }

    @Override
    public void removeSupplier(Long supplyRequestId) throws Exception {

        SupplierRequest supplierRequest = supplierRequestRepository.findById(supplyRequestId).get();
            supplierRequest.setSupplier(null);
         supplierRequestRepository.save(supplierRequest);

    }

}
