package tn.esprit.auction.Entites;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class RandomRoulette {
    @Id
    @Column(name="id")
    private Long id;
    private int randomValue;
}
