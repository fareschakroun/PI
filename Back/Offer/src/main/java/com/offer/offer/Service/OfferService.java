package com.offer.offer.Service;

import com.offer.offer.Entity.Offer;
import com.offer.offer.Entity.TypeOffer;
import com.offer.offer.Repository.OfferRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class OfferService implements IOfferService{
    private OfferRepository offerRepository;

    @Override
    public List<Offer> getAllOffers() {
        return offerRepository.findAll();
    }

    @Override
    public Offer getOfferById(long id) {
        return offerRepository.findById(id).orElse(null);
    }

    /*@Override
    public Offer addOffer(Offer offer,MultipartFile file) throws IOException {

        FileEntity fileEntity = new FileEntity();
        fileEntity.setFilename(file.getOriginalFilename());
        fileEntity.setContentType(file.getContentType());
        fileEntity.setData(file.getBytes());
        fileEntity.setOffer(offer);
        fileRepository.save(fileEntity);
        return offerRepository.save(offer);
    }*/

    @Override
    public Offer addOffer(Offer offer,String titre ,String description, LocalDate lastDateApplication, int nbrCandidature, long exibitorId, TypeOffer typeOffer, MultipartFile file) throws IOException {
        offer.setTitre(titre);
        offer.setOffer(typeOffer);
        offer.setDescription(description);
        offer.setLastDateApplication(lastDateApplication);
        offer.setNbrCandidature(nbrCandidature);
        offer.setExibitorId(exibitorId);
        if (file != null && !file.isEmpty()) {
            offer.setFile(file.getBytes());
        }
        return offerRepository.save(offer);
    }

    @Override
    public Offer updateOffer(Long idOffer,String titre ,String description, LocalDate lastDateApplication, int nbrCandidature, long exibitorId,TypeOffer typeOffer ,MultipartFile file) throws IOException {
        Offer offer = offerRepository.findById(idOffer).orElse(null);
        offer.setTitre(titre);
        offer.setOffer(typeOffer);
        offer.setDescription(description);
        offer.setLastDateApplication(lastDateApplication);
        offer.setNbrCandidature(nbrCandidature);
        offer.setExibitorId(exibitorId);
        if (file != null && !file.isEmpty()) {
            offer.setFile(file.getBytes());
        }
        return offerRepository.save(offer);
    }

    @Override
    public Offer updateOfferWithout(Long idOffer, String titre, String description, LocalDate lastDateApplication, int nbrCandidature, long exibitorId) {
        Offer offer = offerRepository.findById(idOffer).orElse(null);
        offer.setTitre(titre);
        offer.setDescription(description);
        offer.setLastDateApplication(lastDateApplication);
        offer.setNbrCandidature(nbrCandidature);
        offer.setExibitorId(exibitorId);
        return offerRepository.save(offer);
    }

    @Override
    public void deleteOffer(long id) {
        offerRepository.deleteById(id);
    }

    @Override
    public List<Offer> getOfferByexibitorId(long id) {
        return offerRepository.findOffersByExibitorId(id);
    }

    @Override
    public List<Offer> getOfferByDomaineEntreprise(long idExibitor) {
        return null;
    }

    @Override
    public List<Offer> getOffersByTypeOffer(TypeOffer typeOffer, long id) {
        return offerRepository.findOffersByOfferAndExibitorId(typeOffer,id);
    }

    @Override
    public List<Object[]> getCountOffersByType() {
        return offerRepository.countOffersByType();
    }


    @Override
    public boolean hasApplied(long idOffer, long idCandidat) {
        return offerRepository.hasApplied(idOffer, idCandidat);
    }


}
