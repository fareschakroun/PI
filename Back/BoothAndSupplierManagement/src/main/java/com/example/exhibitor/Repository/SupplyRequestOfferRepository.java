package com.example.exhibitor.Repository;

import com.example.exhibitor.Entity.SupplierRequest;
import com.example.exhibitor.Entity.SupplyRequestOffer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SupplyRequestOfferRepository extends JpaRepository<SupplyRequestOffer,Long> {

    List<SupplyRequestOffer> findBySupplierRequestFK(Long supplierRequestId);
    List<SupplyRequestOffer> findBySupplierFkAndSupplierRequestFK(Long userId,Long supplierRequestId);
}
