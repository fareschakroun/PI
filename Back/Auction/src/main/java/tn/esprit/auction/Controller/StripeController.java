package tn.esprit.auction.Controller;

import lombok.AllArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;

import com.stripe.Stripe;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import tn.esprit.auction.Entites.CheckoutPayment;
import tn.esprit.auction.Entites.Room;
import tn.esprit.auction.Repository.PaymentRepository;
import tn.esprit.auction.Repository.RoomRepository;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@RestController
@RequestMapping(value = "/api/stripe")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class StripeController {
    private JavaMailSender mailSender;
    private void sendResetCodeByEmail(String userEmail,String resetCode) throws IOException, MessagingException {
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
    // create a Gson object
    private static Gson gson = new Gson();
PaymentRepository paymentRepository;
RoomRepository roomRepository ;
    private String loadCssFromResource(String filePath) throws IOException {
        Resource resource = new ClassPathResource(filePath);
        return IOUtils.toString(resource.getInputStream(), StandardCharsets.UTF_8);
    }
    private String loadHtmlFromResource(String filePath) throws IOException {
        Resource resource = new ClassPathResource(filePath);
        return IOUtils.toString(resource.getInputStream(), StandardCharsets.UTF_8);
    }
    @PostMapping("/payment/{roomId}/{companyId}")
    /**
     * Payment with Stripe checkout page
     *
     * @throws StripeException
     */
    public String paymentWithCheckoutPage(@PathVariable("companyId") int companyId,@PathVariable("roomId") Long roomId,@RequestBody CheckoutPayment payment) throws StripeException, MessagingException, IOException {
        // We initilize stripe object with the api key
        init();
        // We create a  stripe session parameters
        SessionCreateParams params = SessionCreateParams.builder()
                // We will use the credit card payment method
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT).setSuccessUrl(payment.getSuccessUrl())
                .setCancelUrl(
                        payment.getCancelUrl())
                .addLineItem(
                        SessionCreateParams.LineItem.builder().setQuantity(payment.getQuantity())
                                .setPriceData(
                                        SessionCreateParams.LineItem.PriceData.builder()
                                                .setCurrency(payment.getCurrency()).setUnitAmount(payment.getAmount())
                                                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData
                                                        .builder().setName(payment.getName()).build())
                                                .build())

                                .build())
                .setSuccessUrl("http://localhost:4201/ListPacks/ListRooms")

                .build();
        // create a stripe session
        Session session = Session.create(params);

        // Mise à jour de la base de données ou autres actions après le succès du paiement
        payment.setPaymentDay(new Date());
        payment.setCompanyId(companyId);
        Room room = roomRepository.findById(roomId).orElse(null);
        room.setConfirmedParticipant(room.getConfirmedParticipant() + 1);
        roomRepository.save(room);

        // Envoi du code par email
        sendResetCodeByEmail("eya.somai@esprit.tn", room.getCodeRoom());

        // Sauvegarde du paiement dans la base de données
        paymentRepository.save(payment);

        // Retour de l'ID de la session
        Map<String, String> responseData = new HashMap<>();
        responseData.put("id", session.getId());
        return gson.toJson(responseData);
    }
    @PostMapping("/sucess")

    private void sucess(){
        System.out.println("Payment SUcess");
    }
    private static void init() {
        Stripe.apiKey = "sk_test_51OpCPlJKKu0bIqcHRUzKgwqTjNoU66HHgjlKmJ0EQKHjNiQ8RqjqnXMLkMJNTidHRzOBeUFKQw4aA2cpxxltiYdt00Jssqzgyq";
    }
}