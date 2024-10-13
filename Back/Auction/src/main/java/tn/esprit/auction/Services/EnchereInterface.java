package tn.esprit.auction.Services;

import tn.esprit.auction.Entites.Enchere;
import tn.esprit.auction.Entites.EnchereUserDTO;

import java.util.List;

public interface EnchereInterface {

    Enchere addEncherForUser(int companyId, Long roomId);

    void updatePricing(int companyId, Long RoomId, int Points);

    Boolean getUserEnchere(int companyId, Long RoomId);

    List<EnchereUserDTO> getUsersEnterningAuction(Long RoomId);

    List<Enchere> getTopEncheresByRoomId(Long roomId);

    void deleteEnchereSortieUser(int idCompany, long room);

    Enchere getCurrentUserBiding(int idCompany, long room);

    Enchere findHighestPricedEnchereByRoomId(long roomId);

}
