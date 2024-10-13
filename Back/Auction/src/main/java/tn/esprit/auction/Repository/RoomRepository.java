package tn.esprit.auction.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.auction.Entites.Room;
import tn.esprit.auction.Entites.TypePack;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room,Long> {

    Room findByTypePack(TypePack typePack);
    Room findByCodeRoom(String code);
    List <Room> findByStatus(Boolean status);
}
