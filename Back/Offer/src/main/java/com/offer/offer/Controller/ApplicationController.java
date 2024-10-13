package com.offer.offer.Controller;

import com.offer.offer.Entity.Application;
import com.offer.offer.Entity.Offer;
import com.offer.offer.Entity.Status;
import com.offer.offer.Entity.TypeOffer;
import com.offer.offer.Service.IApplicationService;
import lombok.AllArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/Application")
@AllArgsConstructor
//@CrossOrigin
public class ApplicationController {

    private final IApplicationService applicationService;
    /*
    Application updateApplication(Long idApplication, Date applicationDate, int idCandidat, Offer offer,boolean status , MultipartFile lettreDeMotivation) throws IOException;
    List<Application> getAllApplicationByUser(long idCandidat);
     */
    @GetMapping("/allApplications")
    public List<Application> retrieveAllApplications() {
        return applicationService.getAllApplications();
    }

    @GetMapping("/application/{idApplication}")
    public Application retrieveApplicationById(@PathVariable("idApplication") long id) {
        return applicationService.getApplicationById(id);
    }
    @PostMapping("/add")
    public ResponseEntity<?> addOffer(@RequestParam("idCandidat")int idCandidat,
                                      @RequestParam("idOffer") long idOffer,
                                      @RequestParam("file") MultipartFile file) throws IOException {
        Application application = new Application();
        Application savedApplication =  applicationService.addApplication(application,idCandidat,idOffer,file);
        return ResponseEntity.ok(savedApplication);
    }
    @DeleteMapping("/{idApplication}")
    public void deleteApplication(@PathVariable("idApplication") long id){
        applicationService.deleteApplication(id);
    }

    @GetMapping("/allApplicationsByUser/{idUser}")
    public List<Application> retrieveAllApplicationsByUser(@PathVariable("idUser") long id) {
        return applicationService.getAllApplicationByUser(id);
    }

    @GetMapping("/allApplicationsByOffer/{idOffer}")
    public List<Application> retrieveAllApplicationsByOffer(@PathVariable("idOffer") long id) {
        return applicationService.getAllApplicationForOffer(id);
    }
    @PutMapping("/application/status")
    public Application changeStatus(@RequestParam("idApplication") long id,
                                    @RequestParam("status")Status status){
        return applicationService.changeStatus(id,status);
    }
    @GetMapping("nbrCandidature")
    public List<Object[]> nbrCandidatureOnOffer()
    {
        return applicationService.nbrApplicationOnOffer();
    }
    @GetMapping("nbrStatusApplication")
    public List<Object[]> nbrStatusApplication()
    {
        return applicationService.nbrStatusApplication();
    }

    @GetMapping("nbrApplicationsByMonth/{year}")
    public List<Object[]> nbrApplicationsByMonth(@PathVariable("year") int year)
    {
        return applicationService.nbrApplicationsByMonth(year);
    }
    //getCountApplicationsByOfferExhibitor
    @GetMapping("getCountApplicationsByOfferExhibitor/{exhibitorId}")
    public List<Object[]> getCountApplicationsByOfferExhibitor(@PathVariable("exhibitorId") long exhibitorId)
    {
        return applicationService.getCountApplicationsByOfferExhibitor(exhibitorId);
    }
    //getCountStagesByOfferExhibitor
    @GetMapping("getCountStagesAndOffersByOfferExhibitor/{exhibitorId}/{typeOffer}")
    public List<Object[]> getCountStagesAndOffersByOfferExhibitor(@PathVariable("exhibitorId") long exhibitorId, @PathVariable("typeOffer")TypeOffer typeOffer)
    {
        return applicationService.getCountStagesByOfferExhibitor(exhibitorId,typeOffer);
    }

    @GetMapping("getCountApplicationsByOfferANdTypeOffer/{typeOffer}")
    public List<Object[]> getCountApplicationsByOfferANdTypeOffer(@PathVariable("typeOffer")TypeOffer typeOffer)
    {
        return applicationService.countApplicationsByOfferANdTypeOffer(typeOffer);
    }
    //getRecommendedOffersForUserApp
    @GetMapping("getRecommendedOffersForUserApp/{idUser}")
    public List<Object[]> getRecommendedOffersForUserApp(@PathVariable("idUser")long idUser)
    {
        return applicationService.getRecommendedOffersForUserApp(idUser);
    }
    @GetMapping("/telecharger-pdf/{idApplication}")
    public ResponseEntity<Resource> telechargerPDF(@PathVariable("idApplication") long idApplication) {
        // Récupérer le tableau de bytes depuis votre entité et stockez-le dans une variable byte[]
        Application application= applicationService.getApplicationById(idApplication);
        ByteArrayResource resource = new ByteArrayResource(application.getLettreDeMotivation());

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=fichier.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(application.getLettreDeMotivation().length)
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);
    }

    @GetMapping("/rechercheOffre/{titre}")
    public List<Object[]> nbrStatusApplication(@PathVariable("titre") String titre)
    {
        return applicationService.rechercheOffre(titre);
    }

}
