package com.example.exhibitor.dto;

import com.example.exhibitor.Entity.Status;
import com.example.exhibitor.Entity.Supplier;
import com.example.exhibitor.Entity.SupplierRequest;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SupplierListDTO {
    private Long id;
    private String description;
    private Long price;


    private Supplier supplier;

    private SupplierRequest supplierRequest ;

    private Status status ;

}