package tn.esprit.auction.Controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;


import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.core.io.Resource;

import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;
import tn.esprit.auction.Entites.CheckoutPayment;

import tn.esprit.auction.Entites.Pack;
import tn.esprit.auction.Entites.RandomRoulette;
import tn.esprit.auction.Entites.TypePack;
import tn.esprit.auction.Repository.RadomRouletteRepository;
import tn.esprit.auction.Services.PackageInterface;
import org.springframework.core.io.ClassPathResource;
import java.nio.charset.StandardCharsets;
import org.apache.commons.io.IOUtils;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.util.List;
import java.util.Map;

//@CrossOrigin(origins = "*, http://localhost:4203")
@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/packs")
public class PackageController {

    PackageInterface packageInterface;
    private JavaMailSender mailSender;
    @PostMapping("/sendMail/{userEmail}/{resetCode}")
    private void sendResetCodeByEmail(@PathVariable("userEmail") String userEmail, @PathVariable("resetCode") String resetCode) throws IOException, MessagingException {
        MimeMessage mg = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mg, true);
        helper.setTo(userEmail);
        helper.setSubject("Get your Auction room code");
        String htmlContent = loadHtmlFromResource("templates/emailTemplate.html");
        String cssContent = loadCssFromResource("static/styles/emailStyles.css");

        htmlContent = htmlContent.replace("{{resetCode}}", resetCode);
        htmlContent = htmlContent.replace("</head>", "<style>" + cssContent + "</style></head>");

        helper.setText(htmlContent, true);

        mailSender.send(mg);
    }
    @GetMapping("/getPayments")
    public  List<CheckoutPayment> getPayments() {
        return  packageInterface.getPayments();
    }
    @PutMapping("/SendCodeRoom/{email}/{code}")
    public void SendCodeRoom(@PathVariable("email") String email, @PathVariable("code") String code) {
       packageInterface.sendCoderoom(email,code);
    }
    private String loadCssFromResource(String filePath) throws IOException {
        Resource resource = new ClassPathResource(filePath);
        return IOUtils.toString(resource.getInputStream(), StandardCharsets.UTF_8);
    }
    private String loadHtmlFromResource(String filePath) throws IOException {
        Resource resource = new ClassPathResource(filePath);
        return IOUtils.toString(resource.getInputStream(), StandardCharsets.UTF_8);
    }
    @GetMapping("/getPackStatisticsByYearAndStatus")
    public  Map<Integer, Map<Long, Long>> getPackStatisticsByYearAndStatus() {
        return  packageInterface.getPackStatisticsByYear();
    }
    @GetMapping("/getPacksByStatus/{status}")
    public  List<Pack> getPacksByStatus(@PathVariable("status") Boolean status) {
        return  packageInterface.getPacksByStatus(status);
    }

    @GetMapping("/QuantitePeTypePack/{typePack}")
    public  int QuantitePeTypePack(@PathVariable("typePack") TypePack typePack) {
        return  packageInterface.QuantitePeTypePack(typePack);
    }
    @GetMapping("/revenueTotal")
    public  double revenueTotal() {
        return  packageInterface.revenueTotal();
    }
    @GetMapping("/RevenuePeTypePack/{typePack}")
    public  double RevenuePeTypePack(@PathVariable("typePack") TypePack typePack) {
        return  packageInterface.RevenuePeTypePack(typePack);
    }
    @GetMapping("/calculateReservationPercentageByType")
    public   List<Double> calculateReservationPercentageByType() {
        return  packageInterface.calculateReservationPercentageByType();
    }
    /*@GetMapping("/toployalcustomers")
    public List<Company> getTopLoyalCustomers() {

        return packageInterface.findTopLoyalCustomers(5);
    }
*/


    // Afficher les packs d'un room
    @GetMapping("/getRoomPackages")
    public List<Pack> getRoomPackages(@RequestParam Long idRomm) {
        return  packageInterface.findRoomPackages(idRomm);
    }
    @GetMapping("/getAllPacks")
    public List<Pack> getAllPacks() {
        return  packageInterface.getAllPacks();
    }

    // Afficher les packs d'un type spécifiques
    @GetMapping("/getpackBYType/{typePack}")
    public List<Pack> getpackBYType(@PathVariable("typePack") TypePack typePack) {
        return  packageInterface.getpackBYType(typePack);
    }

    //Associer pack To room
    @PutMapping("/AffecterPackToRoom")
    public Pack AffecterPackToRoom(@RequestParam Long p, @RequestParam Long idRoom) {
        return  packageInterface.AffecterPackToRoom(idRoom,p);
    }

    //ADD new package
    @PostMapping("/addPackge")
    public Pack addPackge(@RequestBody Pack pack) {

        return packageInterface.addPackge(pack);
    }

    //Update Package
    @PutMapping("/updatePackage")
    public Pack updatePackage(@RequestBody Pack p) {
        log.info("hhh"+p);
        return packageInterface.updatePackage(p);
    }

    // Afficher les details d'un packs
    @GetMapping("/retrievePackage/{idpack}")
    public Pack retrievePackage(@PathVariable("idpack") Long idpack) {
        return  packageInterface.retrievePackage(idpack);
    }

    @GetMapping("/findPacksByIdRoom/{idroom}")
    public List<Pack> findPacksByIdRoom(@PathVariable("idroom") Long idroom) {
        return  packageInterface.findPacksByIdRoom(idroom);
    }


    @DeleteMapping("/deletePack/{id}")
    public void deletePack(@PathVariable("id") Long id) {
          packageInterface.delete(id);
    }

    @GetMapping("/findMinPriceByTypePack/{typePack}")
    public float findMinPriceByTypePack(@PathVariable("typePack") TypePack typePack) {
        return  packageInterface.findMinPriceByTypePack(typePack);
    }

    @GetMapping("/findNonReservedPackPerType/{typePack}/{status}")
    public List<Pack> findNonReservedPackPerType(@PathVariable("typePack") TypePack typePack


    , @PathVariable("status") Boolean status) {
        return  packageInterface.findNonReservedPackPerType(typePack,status);
    }

}
