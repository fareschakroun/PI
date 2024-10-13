package com.offer.offer.Service;

import com.offer.offer.Entity.Application;
import com.offer.offer.Entity.Offer;
import com.offer.offer.Entity.Status;
import com.offer.offer.Entity.TypeOffer;
import com.offer.offer.Repository.ApplicationRepository;
import com.offer.offer.Repository.OfferRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@Service
public class ApplicationService implements IApplicationService{

    @Autowired
    private JavaMailSender mailSender;
    private ApplicationRepository applicationRepository;
    private OfferRepository offerRepository;
    @Override
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    @Override
    public Application getApplicationById(long id) {
        return applicationRepository.findById(id).orElse(null);
    }

    @Override
    public Application addApplication(Application application, int idCandidat, long idOffer, MultipartFile lettreDeMotivation) throws IOException {
        boolean res=false;
        Offer offer = offerRepository.findById(idOffer).orElse(null);
        List<Application> applications = applicationRepository.findApplicationsByOffer(offer);
        for (Application app: applications) {
            if (app.getIdCandidat()==idCandidat){
                res=true;
            }
        }
        if (!res){
            application.setApplicationDate(LocalDateTime.now());
            application.setIdCandidat(idCandidat);
            application.setStatus(Status.en_cours);
            application.setOffer(offer);
            if (lettreDeMotivation != null && !lettreDeMotivation.isEmpty()) {
                application.setLettreDeMotivation(lettreDeMotivation.getBytes());
            }



                SimpleMailMessage message=new SimpleMailMessage();
                message.setFrom("anasmag15@gmail.com");
                /*message.setTo(toEmail);
                message.setText(body);
                message.setSubject(subject);*/
                //mettre l'@ email de l'etudiant
                message.setTo("anas.maghrebi@esprit.tn");
                message.setText("Candidature c bon");
                message.setSubject("Candidature");

                mailSender.send(message);

                System.out.println("Mail Sent successfully .. .");
            return applicationRepository.save(application);
        }
        else {
            return null;
        }
    }

    @Override
    public Application updateApplication(Long idApplication, Date applicationDate, int idCandidat, Offer offer, boolean status, MultipartFile lettreDeMotivation) throws IOException {
        Application application = applicationRepository.findById(idApplication).orElse(null);
        //application.setApplicationDate(applicationDate);
        application.setIdCandidat(idCandidat);
        //application.setStatus(status);
        application.setOffer(offer);
        if (lettreDeMotivation != null && !lettreDeMotivation.isEmpty()) {
            application.setLettreDeMotivation(lettreDeMotivation.getBytes());
        }
        return applicationRepository.save(application);
    }

    @Override
    public void deleteApplication(long id) {
        applicationRepository.deleteById(id);
    }

    @Override
    public List<Application> getAllApplicationByUser(long idCandidat) {
        return applicationRepository.findApplicationsByIdCandidat(idCandidat);
    }

    @Override
    public List<Application> getAllApplicationForOffer(long idOffer) {
        Offer offer = offerRepository.findById(idOffer).orElse(null);
        return applicationRepository.findApplicationsByOffer(offer);
    }

    @Override
    public Application changeStatus(Long idApplication, Status status) {
        Application app = applicationRepository.findById(idApplication).orElse(null);
        app.setStatus(status);
        return applicationRepository.save(app);
    }

    @Override
    public List<Object[]> nbrApplicationOnOffer() {
        return applicationRepository.countApplicationsByOffer();
    }

    @Override
    public List<Object[]> nbrStatusApplication() {
        return applicationRepository.countCandidaturesByStatus();
    }

    @Override
    public List<Object[]> nbrApplicationsByMonth(int year) {
        return applicationRepository.countApplicationsByMonthAndYear(year);
    }

    @Override
    public List<Offer> offersOfUser(long id) {
        List<Offer> offers = new ArrayList<>();
        List<Application> applications = applicationRepository.getApplicationsByIdCandidat(id);
        for (Application a: applications) {
            offers.add(a.getOffer());
        }
        return offers;
    }

    @Override
    public List<Object[]> getCountApplicationsByOfferExhibitor(long exhibitorId) {
        return applicationRepository.countApplicationsByOfferExhibitor(exhibitorId);
    }

    @Override
    public List<Object[]> getCountStagesByOfferExhibitor(long exhibitorId, TypeOffer typeOffer) {
        return applicationRepository.countStagesByOfferExhibitor(exhibitorId, typeOffer);
    }

    @Override
    public List<Object[]> countApplicationsByOfferANdTypeOffer(TypeOffer typeOffer) {
        return applicationRepository.countApplicationsByOfferANdTypeOffer(typeOffer);
    }

    @Override
    public List<Object[]> getRecommendedOffersForUserApp(long id) {
        return applicationRepository.findRecommendedOffersForUserApp(id);
    }

    @Override
    public List<Object[]> rechercheOffre(String titre) {
        return applicationRepository.listeOfferRecherche(titre);
    }

}
