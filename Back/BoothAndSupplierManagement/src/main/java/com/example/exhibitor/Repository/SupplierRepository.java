package com.example.exhibitor.Repository;

import com.example.exhibitor.Entity.Booth;
import com.example.exhibitor.Entity.Exhibitor;
import com.example.exhibitor.Entity.Supplier;
import com.example.exhibitor.Entity.SupplierRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SupplierRepository extends JpaRepository<Supplier,Long> {

    Supplier findSupplierById(Long supplierId);


    List<Supplier> findSupplierBySupplierRequests(SupplierRequest supplierRequest);

    Supplier findByBooths(Booth booth);
}
