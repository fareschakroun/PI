package tn.esprit.auction.Repository;

import feign.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tn.esprit.auction.Entites.Enchere;
import tn.esprit.auction.Entites.Room;

import java.awt.print.Pageable;
import java.util.List;

public interface EnchereRepository extends JpaRepository<Enchere,Long> {
    Enchere findByIdcompanyAndRoomIdRoom(int companyId, Long roomid);
    Enchere findByIdcompanyAndRoom(int companyId, Room roomid);
    List<Enchere> findByRoom(Room room);

void deleteByIdcompanyAndRoom(int idCompany, Room room);

    @Query("SELECT e FROM Enchere e WHERE e.room.idRoom = :roomId AND e.status = true ORDER BY e.pricing DESC")
    List<Enchere> findTopEncheresByRoomId(Long roomId);

    @Query("SELECT e FROM Enchere e WHERE e.room.idRoom = :roomId ORDER BY e.pricing DESC ")
    List<Enchere> findHighestPricedEnchereByRoomId(@Param("roomId") Long roomId);
}