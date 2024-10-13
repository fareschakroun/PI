package tn.esprit.auction.Services;


import tn.esprit.auction.Entites.CheckoutPayment;
import tn.esprit.auction.Entites.Pack;
import tn.esprit.auction.Entites.TypePack;

import java.util.List;
import java.util.Map;

public interface PackageInterface {
    float findMinPriceByTypePack(TypePack typePack);
    List<Pack> getpackBYType(TypePack typePack);
    List<Pack> findNonReservedPackPerType(TypePack typePack , Boolean etat);
    List<Pack> getAllPacks();

    Pack AffecterPackToRoom(Long roomId, Long packid);

    Pack addPackge(Pack pack);

    Pack updatePackage(Pack pack);

    Pack retrievePackage(Long idpack);

    List<Pack> findRoomPackages(Long idRoom);

    List<Pack> findReservedPacks();

    List<Pack> finfNonReservedPacks();

    List<Pack> findMyPacks();

    List<Pack> findPacksByIdRoom(Long idroom);

    void delete(Long idpack);

    List<Pack> getPacksByStatus(Boolean status);

    Map<Integer, Map<Long, Long>> getPackStatisticsByYear();


    double RevenuePeTypePack(TypePack pack);

    List<Double> calculateReservationPercentageByType();
    //  List<int> findTopLoyalCustomers(int topCount);

    void sendCoderoom(String emailCompany, String codeRoom);

    int QuantitePeTypePack(TypePack typePack);

    float revenueTotal();

    List<CheckoutPayment> getPayments();

}
