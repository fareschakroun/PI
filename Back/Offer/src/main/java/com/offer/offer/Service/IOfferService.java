package com.offer.offer.Service;

import com.offer.offer.Entity.Offer;
import com.offer.offer.Entity.TypeOffer;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface IOfferService {
    List<Offer> getAllOffers();
    Offer getOfferById(long id);
    Offer addOffer(Offer offer,String titre ,String description, LocalDate lastDateApplication, int nbrCandidature, long exibitorId, TypeOffer typeOffer , MultipartFile file) throws IOException;
    Offer updateOffer(Long idOffer,String titre ,String description, LocalDate lastDateApplication, int nbrCandidature, long exibitorId,TypeOffer typeOffer ,MultipartFile file) throws IOException;
    Offer updateOfferWithout(Long idOffer,String titre ,String description, LocalDate lastDateApplication, int nbrCandidature, long exibitorId);

    void deleteOffer(long id);
    List<Offer> getOfferByexibitorId(long id);
    List<Offer> getOfferByDomaineEntreprise(long idExibitor);
    List<Offer> getOffersByTypeOffer(TypeOffer typeOffer, long id);
    List<Object[]> getCountOffersByType();

    boolean hasApplied(long idOffer, long idCandidat);


}
