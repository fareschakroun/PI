package com.example.exhibitor.Service;

import com.example.exhibitor.Entity.Status;
import com.example.exhibitor.Entity.SupplierRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SupplierRequestService  {
    SupplierRequest addRequest(SupplierRequest request);
    void deleteRequest(Long id) throws Exception;

    SupplierRequest ModifyRequest (SupplierRequest request);

    List<SupplierRequest> getAllRequests();

    SupplierRequest AffectSupplierRequestToSupplier(Long supplierRequestId,Long supplierId) throws Exception;


    SupplierRequest getSupplierRequestStatus(Long requestid) throws Exception;

    void removeSupplier(Long supplyRequestId) throws Exception;


}
