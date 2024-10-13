package com.example.exhibitor.Service;

import com.example.exhibitor.Entity.Supplier;
import com.example.exhibitor.Entity.SupplierRequest;

import java.util.List;

public interface SupplierService {

Supplier addSupplier(Supplier supplier);

Supplier findSupplierByid(Long id);

List<Supplier> showAllSuppliers();

List<Supplier> getSuppliersBySupplyRequest(Long supplyRequestId);

    public SupplierRequest getSupplierRequestStatus(Long requestid) throws Exception;

}
