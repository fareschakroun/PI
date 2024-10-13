package tn.esprit.auction.Services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.auction.Entites.Enchere;
import tn.esprit.auction.Entites.EnchereUserDTO;
import tn.esprit.auction.Entites.Room;
import tn.esprit.auction.Entites.UserCredential;
import tn.esprit.auction.Repository.EnchereRepository;
import tn.esprit.auction.Repository.RoomRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor

public class EnchereService implements EnchereInterface {

    private final ClientUser clientUser;
    EnchereRepository enchereRepository;
    RoomRepository roomRepository;

    @Override
    public Enchere addEncherForUser(int companyId, Long roomId) {
        Enchere enchere = new Enchere();
        UserCredential userCredential = clientUser.getUserById(companyId);
        enchere.setPoints(userCredential.getPoints());
        enchere.setIdcompany(companyId);
        enchere.setStatus(true);
        Room room = roomRepository.findById(roomId).get();
        enchere.setPricing(room.getPrice());
        enchere.setRoom(room);
        enchereRepository.save(enchere);
        return enchere;
    }

    @Override
    public void updatePricing(int companyId, Long RoomId, int Points) {
        Enchere enchere = enchereRepository.findByIdcompanyAndRoomIdRoom(companyId, RoomId);

        if (Points == 50) {
            float price = enchere.getPricing() + 30;
            enchere.setPricing(price);
            enchereRepository.save(enchere);

        }

        if (Points == 150) {
            float price = enchere.getPricing() + 100;
            enchere.setPricing(price);
            enchereRepository.save(enchere);

        }
        if (Points == 100) {
            float price = enchere.getPricing() + 150;
            enchere.setPricing(price);
            enchereRepository.save(enchere);

        }


    }

    @Override
    public Boolean getUserEnchere(int companyId, Long RoomId) {
        Boolean test = false;
        Enchere enchere = enchereRepository.findByIdcompanyAndRoomIdRoom(companyId, RoomId);
        if (enchere != null) {
            test = true;
        }
        return test;
    }

    @Override
    public List<EnchereUserDTO> getUsersEnterningAuction(Long RoomId) {


        Room room = roomRepository.findById(RoomId).orElse(null);
        List<Enchere> encheres = enchereRepository.findByRoom(room);
        List<EnchereUserDTO> result = new ArrayList<>();

        for (Enchere enchere : encheres) {
            UserCredential user = clientUser.getUserById(enchere.getIdcompany());
            if (user != null) {
                EnchereUserDTO dto = new EnchereUserDTO();
                dto.setPricing(enchere.getPricing());
                dto.setName(user.getName());
                dto.setEmail(user.getEmail());
                result.add(dto);
            }
        }

        return result;
    }

    @Override
    public List<Enchere> getTopEncheresByRoomId(Long roomId) {
        Room room = roomRepository.findById(roomId).orElse(null);
        List<Enchere> topwinners = enchereRepository.findTopEncheresByRoomId(roomId);
        List<Enchere> topwinnersFinal = new ArrayList<>();
        if (room != null) {

            int maxWinners = room.getMaxWinners();
            for (Enchere e : topwinners) {
                if (topwinnersFinal.size() < maxWinners) {
                    topwinnersFinal.add(e);
                } else {
                    break;
                }
            }
            return topwinnersFinal;
        } else {
            throw new RuntimeException("La salle avec l'id " + roomId + " n'a pas été trouvée.");
        }
    }

    @Override
    public void deleteEnchereSortieUser(int idCompany, long room) {
        Room room1 = roomRepository.findById(room).orElse(null);
        System.out.println(room);
        System.out.println(idCompany);
        Enchere enchere = enchereRepository.findByIdcompanyAndRoom(idCompany, room1);
        if (enchere != null) {
            enchereRepository.delete(enchere);
        }

    }

    @Override
    public Enchere getCurrentUserBiding(int idCompany, long room) {
        return enchereRepository.findByIdcompanyAndRoomIdRoom(idCompany, room);
    }

    @Override
    public Enchere findHighestPricedEnchereByRoomId(long roomId) {
        return enchereRepository.findHighestPricedEnchereByRoomId(roomId).get(0);
    }


}