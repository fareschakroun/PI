package com.offer.offer.Controller;

import com.offer.offer.Entity.Offer;
import com.offer.offer.Entity.TypeOffer;
import com.offer.offer.Service.IApplicationService;
import com.offer.offer.Service.IOfferService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;


import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayOutputStream;



//@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/Offer")
@AllArgsConstructor
public class OfferController {
    private IOfferService offerService;
    private IApplicationService applicationService;


    @GetMapping("/allOffers")
    public List<Offer> retrieveAllOffers() {
        return offerService.getAllOffers();
    }

    @GetMapping("/offer/{idOffer}")
    public Offer retrieveOfferById(@PathVariable("idOffer") long id) {
        return offerService.getOfferById(id);
    }

    @PostMapping("/add")
    public  ResponseEntity<?> addOffer(@RequestParam("titre") String titre,
                          @RequestParam("description")String description,
                          @RequestParam("lastDateApplication") LocalDate lastDateApplication,
                          @RequestParam("nbrCandidature")int nbrCandidature,
                          @RequestParam("exibitorId")long exibitorId,
                          @RequestParam("typeOffer") TypeOffer typeOffer,
                          @RequestParam("file") /*@Size(max = 10 * 1024 * 1024)*/ MultipartFile file) throws IOException {
        Offer offer = new Offer();
        Offer savedOffer =  offerService.addOffer(offer,titre,description,lastDateApplication,nbrCandidature,exibitorId,typeOffer,file);
        return ResponseEntity.ok(savedOffer);
    }
    /*@PutMapping("/update/{ifOffer}")
    public ResponseEntity<?> updateOffer(@PathVariable("idOffer") long id,
                             @RequestParam("description")String description,
                             @RequestParam("lastDateApplication") LocalDate lastDateApplication,
                             @RequestParam("nbrCandidature")int nbrCandidature,
                             @RequestParam("exibitorId")long exibitorId,
                             @RequestParam("file") MultipartFile file) throws IOException {
        Offer offer = new Offer();
        Offer savedOffer =  offerService.updateOffer(id,offer,description,lastDateApplication,nbrCandidature,exibitorId,file);
        return ResponseEntity.ok(savedOffer);
    }*/
    @DeleteMapping("/{idOffer}")
    public void deleteOffer(@PathVariable("idOffer") long id){
        offerService.deleteOffer(id);
    }

    @GetMapping("/offerExibitor/{exibitorId}")
    public List<Offer> getOfferByexibitorId(@PathVariable("exibitorId") long id) {
        return offerService.getOfferByexibitorId(id);
    }
    @PutMapping("/update")
    public ResponseEntity<?> updateOffer(@RequestParam("idOffer") long id,
                                         @RequestParam("titre") String titre,
                             @RequestParam("description")String description,
                             @RequestParam("lastDateApplication") LocalDate lastDateApplication,
                             @RequestParam("nbrCandidature")int nbrCandidature,
                             @RequestParam("exibitorId")long exibitorId,
                             @RequestParam("typeOffer") TypeOffer typeOffer,
                             @RequestParam("file") MultipartFile file) throws IOException {

        Offer savedOffer =  offerService.updateOffer(id,titre,description,lastDateApplication,nbrCandidature,exibitorId,typeOffer,file);
        return ResponseEntity.ok(savedOffer);
    }

    @PutMapping("/updateWithout")
    public ResponseEntity<?> updateOfferWithout(@RequestParam("idOffer") long id,
                                         @RequestParam("titre") String titre,
                                         @RequestParam("description")String description,
                                         @RequestParam("lastDateApplication") LocalDate lastDateApplication,
                                         @RequestParam("nbrCandidature")int nbrCandidature,
                                         @RequestParam("exibitorId")long exibitorId) throws IOException {

        Offer savedOffer =  offerService.updateOfferWithout(id,titre,description,lastDateApplication,nbrCandidature,exibitorId);
        return ResponseEntity.ok(savedOffer);
    }

    @GetMapping("/OffersByTypeOffer/{exibitorId}/{typeOffer}")
    public List<Offer> retrieveOffersByTypeOffer(@PathVariable("typeOffer") TypeOffer typeOffer,
                                                 @PathVariable("exibitorId") long id) {
        return offerService.getOffersByTypeOffer(typeOffer,id);
    }

    //Telechargement du file
    @GetMapping("/convertToPdf/{idOffer}")
    public ResponseEntity<byte[]> convertToPdf(@PathVariable("idOffer") long id) throws Exception {
        Offer offer = offerService.getOfferById(id);
        // Retrieve the blob content from the database (assuming you have the file stored as a byte array)
        byte[] blobContent = offer.getFile(); // Replace with your actual retrieval logic

        // Convert the blob content to PDF
        XWPFDocument document = new XWPFDocument();
        XWPFParagraph paragraph = document.createParagraph();
        paragraph.createRun().setText(new String(blobContent));

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        document.write(outputStream);

        // Configure the response headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "converted_file.pdf");

        // Return the converted PDF content as the response
        return ResponseEntity.ok()
                .headers(headers)
                .body(outputStream.toByteArray());
    }
    @GetMapping("/getCountOffersByType")
    public List<Object[]> getCountOffersByType(){
       return offerService.getCountOffersByType();
    }

    @GetMapping("/getOffersAppliedByUser/{idUser}")
    public List<Offer> getOffersAppliedByUser(@PathVariable("idUser")long id){
        return applicationService.offersOfUser(id);
    }
    @GetMapping("/hasApplied/{idUser}/{idOffer}")
    public boolean hasApplied(@PathVariable("idUser")long idUser,@PathVariable("idOffer")long idOffer){
        return offerService.hasApplied(idOffer, idUser);
    }
    @GetMapping("/telecharger-pdf/{idOffer}")
    public ResponseEntity<Resource> telechargerPDF(@PathVariable("idOffer") long idOffer) {
        // Récupérer le tableau de bytes depuis votre entité et stockez-le dans une variable byte[]
        Offer offer = offerService.getOfferById(idOffer);
        ByteArrayResource resource = new ByteArrayResource(offer.getFile());

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=fichier.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(offer.getFile().length)
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);
    }


}