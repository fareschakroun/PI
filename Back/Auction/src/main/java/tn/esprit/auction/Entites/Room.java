package tn.esprit.auction.Entites;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idRoom")
    private Long idRoom;
    private String codeRoom;
    private float price;
    private float priceAuction;
    private int maxWinners;
    private int quantity ;
    @Enumerated(EnumType.STRING)
    private TypePack typePack ;
    private Date dateDebut;
    private int duration ;
    private int maxParticipants ;
    private int confirmedParticipant ;
    private String description ;
    private Boolean status ;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "room", fetch = FetchType.EAGER)
    @JsonBackReference
    private List<Pack> packages;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "room")
    @JsonIgnore
    private List<Enchere> encheres;

}
