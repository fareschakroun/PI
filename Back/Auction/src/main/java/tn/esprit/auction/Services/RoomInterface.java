package tn.esprit.auction.Services;

import tn.esprit.auction.Entites.Pack;
import tn.esprit.auction.Entites.Room;

import java.util.List;

public interface RoomInterface {
    void addRoom(Room room);

    Room findRoom(Long idroom);

    List<Room> findAllRooms();

    Room updateRoom(Room room);

    Room updateRoomParticipant(long roomid);

    void deleteRoom(Room room);

    void ParticipateToRoom(Long idroom, int idCompany);

    float UpdatePrice(float nbrpoint, Long idRoom);

    // List<Company> getCapaniesParticipants( Long roomId);

void updateRoomStatus(long roomId);
    List<Pack> getRoomPacks(Long roomId);

    void ReservePack(Long idpack, Long idRoom);

    public double calculateTotalAmountFor50pt(int quantity);

    public double calculateTotalAmountFor150pt(int quantity);

    public double calculateTotalAmountFor100pt(int quantity);


}
