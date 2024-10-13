package com.offer.offer.Service;

import com.offer.offer.Entity.Application;
import com.offer.offer.Entity.Offer;
import com.offer.offer.Entity.Status;
import com.offer.offer.Entity.TypeOffer;
import org.springframework.data.repository.query.Param;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface IApplicationService {
    List<Application> getAllApplications();
    Application getApplicationById(long id);
    Application addApplication(Application application, int idCandidat, long idOffer, MultipartFile lettreDeMotivation) throws IOException;
    Application updateApplication(Long idApplication, Date applicationDate, int idCandidat, Offer offer,boolean status , MultipartFile lettreDeMotivation) throws IOException;
    void deleteApplication(long id);
    List<Application> getAllApplicationByUser(long idCandidat);
    List<Application> getAllApplicationForOffer(long idOffer);
    Application changeStatus(Long idApplication, Status status);
    List<Object[]> nbrApplicationOnOffer();
    List<Object[]> nbrStatusApplication();
    List<Object[]> nbrApplicationsByMonth(int year);
    List<Offer> offersOfUser(long id);

    List<Object[]> getCountApplicationsByOfferExhibitor(long exhibitorId);
    //countStagesByOfferExhibitor
    List<Object[]> getCountStagesByOfferExhibitor(long exhibitorId, TypeOffer typeOffer);
    List<Object[]> countApplicationsByOfferANdTypeOffer(TypeOffer typeOffer);

    List<Object[]> getRecommendedOffersForUserApp(long id);

    List<Object[]> rechercheOffre(String titre );
}
