package com.example.exhibitor.Service;

import com.example.exhibitor.Entity.Supplier;
import com.example.exhibitor.Entity.SupplierRequest;
import com.example.exhibitor.Repository.SupplierRepository;
import com.example.exhibitor.Repository.SupplierRequestRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class SupplierServiceImpl implements SupplierService{
    SupplierRequestRepository supplierRequestRepository ;
    SupplierRepository supplierRepository ;

    @Override
    public Supplier addSupplier(Supplier supplier) {
        return supplierRepository.save(supplier);
    }

    @Override
    public Supplier findSupplierByid(Long id) {
        return supplierRepository.findSupplierById(id);
    }

    @Override
    public List<Supplier> showAllSuppliers() {
        return supplierRepository.findAll();
    }

    @Override
    public List<Supplier> getSuppliersBySupplyRequest(Long supplyRequestId) {
        SupplierRequest supplierRequest = supplierRequestRepository.findById(supplyRequestId).get();


        return  supplierRepository.findSupplierBySupplierRequests(supplierRequest);
    }
    @Override
    public SupplierRequest getSupplierRequestStatus(Long requestid) throws Exception {
        return supplierRequestRepository.findById(requestid).orElseThrow(() -> new Exception("supplier request not found"));


    }
}
