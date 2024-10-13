package com.example.exhibitor.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table
@Builder
public class SupplierRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id ;

    private String requirement ;
    private String quantity ;
    private String price ;
    private String boothPosition ;
    private String productname ;
    private String servicename ;
    private LocalDate createdAt ;
    @Enumerated(EnumType.STRING)
    Type type ;
    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL)
    Supplier supplier ;
    @OneToOne
    Image image;
}
enum Type {
    isProduct,isService,isProductAndService
}
