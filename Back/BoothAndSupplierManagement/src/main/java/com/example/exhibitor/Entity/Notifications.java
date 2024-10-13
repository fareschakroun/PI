package com.example.exhibitor.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.type.YesNoConverter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table
@Builder
public class Notifications {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Supplier supplier;

    @Convert(converter = YesNoConverter.class)
    private Boolean readornot;

    // Constructors, getters, and setters
}
