package tn.esprit.auction.Services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.auction.Entites.Enchere;
import tn.esprit.auction.Entites.Pack;
import tn.esprit.auction.Entites.Room;
import tn.esprit.auction.Repository.EnchereRepository;
import tn.esprit.auction.Repository.PackgeRepository;
import tn.esprit.auction.Repository.RoomRepository;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class RoomService implements RoomInterface {

    RoomRepository roomRepository;

    PackgeRepository packgeRepository;
    EnchereRepository enchereRepository;

    EnchereInterface enchereInterface;

    @Override
    public void addRoom(Room room) {
        List<Pack> packs = packgeRepository.findByTypePackAndStatus(room.getTypePack(), true);
        room.setQuantity(packs.size());
        room.setMaxWinners(packs.size());
        room.setPriceAuction(room.getPrice());
        room.setStatus(true);
        SecureRandom random = new SecureRandom();
        StringBuilder codeBuilder = new StringBuilder();
        String allowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        int maxLength = 4;

        room.setPackages(packs);
        room.setStatus(false);
        for (int i = 0; i < maxLength; i++) {
            int randomIndex = random.nextInt(allowedChars.length());
            char randomChar = allowedChars.charAt(randomIndex);
            codeBuilder.append(randomChar);
        }
        room.setCodeRoom(codeBuilder.toString());
        roomRepository.save(room);
        for (Pack p : packs) {
            p.setRoom(room);
            packgeRepository.save(p);
        }
    }

    @Override
    public Room findRoom(Long idroom) {
        return roomRepository.findById(idroom).orElse(null);
    }

    @Override
    public List<Room> findAllRooms() {
        return roomRepository.findAll();
        //test al true
    }

    @Override
    public Room updateRoom(Room room) {

        room.setStatus(true);

        return roomRepository.save(room);
    }

    @Override
    public Room updateRoomParticipant(long roomid) {
        Room room = roomRepository.findById(roomid).orElse(null);
        if (room != null) {
            int p = room.getConfirmedParticipant();
            room.setConfirmedParticipant(p + 1);
            roomRepository.save(room);
        }

        return room;
    }

    @Override
    public void deleteRoom(Room room) {
        roomRepository.delete(room);
    }

    @Override
    public void ParticipateToRoom(Long idroom, int idCompany) {

    }

    /* @Override
     public void ParticipateToRoom(Long idroom , int idCompany) {
         Company company = companyRepository.findById(idCompany).orElse(null);
         Room room = roomRepository.findById(idroom).orElse(null);
         if(room != null ){
             company.setRoom(room);
             companyRepository.save(company);}


     }
 */
    @Override
    public float UpdatePrice(float nbrpoint, Long idRoom) {
        Room room = roomRepository.findById(idRoom).get();
       /* float somme =0;
        if(nbrpoint==50)
        {
           somme= room.getPriceAuction() + 30;
        }
        if(nbrpoint==100)
        {
            somme= room.getPriceAuction() + 50;
        }
        if(nbrpoint==150)
        {
            somme= room.getPriceAuction() + 100;
        }*/
        room.setPriceAuction(nbrpoint);
        roomRepository.save(room);
        return nbrpoint;
    }

    @Override
    public void updateRoomStatus(long roomId) {
        Room room = roomRepository.findById(roomId).orElse(null);
        room.setStatus(false);
        roomRepository.save(room);

    }

   /* @Override
    public List<Company> getCapaniesParticipants( Long roomId) {
        Room room = roomRepository.findById(roomId).get();

        return room.getCompanies();
    }*/

    @Override
    public List<Pack> getRoomPacks(Long roomId) {
        List<Room> listrooms = roomRepository.findAll();

        List<Pack> packs = new ArrayList<>();
        if(listrooms.size()>0){
             Room room = roomRepository.findById(roomId).orElse(null);
             if(room!=null)
             {  for (Pack p : room.getPackages()) {
                 if (p.isReserved() == false) {
                     packs.add(p);
                 }
             }}}


        return packs;
    }

    @Override
    public void ReservePack(Long idpack, Long idRoom) {

        List<Enchere> encheres = enchereInterface.getTopEncheresByRoomId(idRoom);

        Pack pack = packgeRepository.findById(idpack).get();

        pack.setCompany(encheres.get(0).getIdcompany());

        encheres.get(0).setStatus(false);
        enchereRepository.save(encheres.get(0));

        pack.setReserved(true);
        packgeRepository.save(pack);
    }

    @Override
    public double calculateTotalAmountFor50pt(int quantity) {
        double rate50Points = 30.0;

        double totalAmount = rate50Points * quantity;

        return totalAmount;
    }

    @Override
    public double calculateTotalAmountFor150pt(int quantity) {
        double rate50Points = 50.0;

        double totalAmount = rate50Points * quantity;

        return totalAmount;
    }

    @Override
    public double calculateTotalAmountFor100pt(int quantity) {
        double rate50Points = 100.0;

        double totalAmount = rate50Points * quantity;

        return totalAmount;
    }


}
