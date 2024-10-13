package tn.esprit.auction.Entites;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserCredential {
    private int id;
    private String name;
    private String password;
    private String email ;
    private int points ;
    private long roomid ;
}
