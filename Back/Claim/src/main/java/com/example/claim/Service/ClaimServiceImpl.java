package com.example.claim.Service;



import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.example.claim.Entity.Claim;
import com.example.claim.Entity.ClaimType;
import com.example.claim.Repository.ClaimRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service

public class ClaimServiceImpl implements ClaimService {

    private static final Logger logger = LoggerFactory.getLogger(ClaimServiceImpl.class);

    @Autowired
    private ClaimRepository claimRepo;

    private final JavaMailSender javaMailSender;

    @Autowired
    public ClaimServiceImpl(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Override
    public void saveClaim(Claim claim) {
        claimRepo.save(claim);
    }

    @Override
    public Claim addClaim(Claim claim,MultipartFile file) {
        // Setting the level of disappointment based on the description
        String description = claim.getDescription();
        if (description != null) {
            description = description.toLowerCase();
            if (description.contains("angry") || description.contains("worst") || description.contains("urgent")) {
                claim.setLevel(1);
            } else if (description.contains("disappointed") || description.contains("medium")) {
                claim.setLevel(2);
            } else {
                claim.setLevel(3);
            }
        } else {
            // Handle null description here if needed
        }
//          String fileName = StringUtils.cleanPath(file.getOriginalFilename());
//        if(fileName.contains(".."))
//        {
//            log.error("not a valid file");
//        }
//        try {
//            claim.setAttachment(Base64.getEncoder().encodeToString(file.getBytes()));
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
        // Setting the status to "pending" by default
        claim.setStatus("pending");
        // Setting the current date
        claim.setDate(new SimpleDateFormat("dd/MM/yyyy HH:mm:ss").format(new Date()));
        // Save the claim
        return claimRepo.save(claim);
    }

   /* @Override
    public Claim addClaim(Claim claim, MultipartFile file) {
        try {
            // Setting the level of disappointment based on the description
            String description = claim.getDescription().toLowerCase();
            if (description != null) {
                description = description.toLowerCase();
                if (description.contains("angry") || description.contains("worst") || description.contains("urgent")) {
                    claim.setLevel(1);
                } else if (description.contains("disappointed") || description.contains("medium")) {
                    claim.setLevel(2);
                } else {
                    claim.setLevel(3);
                }
            } else {
                // Handle the case when description is null
            }

            // Setting the status to "pending" by default
            claim.setStatus("pending");

            // Setting the current date
            claim.setDate(new SimpleDateFormat("dd/MM/yyyy HH:mm:ss").format(new Date()));

            // Save the claim
            Claim savedClaim = claimRepo.save(claim);

            // Handle file attachment if provided
            if (file != null && !file.isEmpty()) {
                // Convert MultipartFile to byte array
                byte[] fileBytes = file.getBytes();
                // Set the attachment
                savedClaim.setAttachment(fileBytes);
                // Save the claim with attachment
                claimRepo.save(savedClaim);
            }

            return savedClaim;
        } catch (IOException e) {
            throw new RuntimeException("Failed to add claim with attachment.", e);
        }
    }
*/

    @Override
    public List<Claim> findAllClaims() {
        return claimRepo.findAll();
    }

    @Override
    public Claim retrieveClaim(Long claimId) {
        return claimRepo.findById(claimId).orElse(null);
    }

    @Override
    public void removeClaim(Long claimId) {
        claimRepo.deleteById(claimId);
    }

    @Override
    public Claim modifyClaim(Claim claim) {
        return claimRepo.save(claim);
    }

    @Override
    public Claim FindClaim(Long id) {
        return claimRepo.findById(id).orElse(null);
    }

    @Override
    public List<Claim> FindBySubject(ClaimType subject) {
        return claimRepo.findBysubject(subject);
    }

    @Override
    public List<Claim> FindByStatus(String status) {
        return claimRepo.findBystatus(status);
    }

    @Override
    public Optional<Claim> FindByDate(String date) {
        return claimRepo.findByDate(date);
    }

    public List<Claim> GetClaimsByLevelorder(String status) {
        List<Claim> claims= claimRepo.getClaimsByLevelorder();
        if(!status.equals("pending") && !status.equals("Treated")){
            status="pending";
        }
        String finalStatus = status;
        return claims.stream().filter((claim)-> claim.getStatus().equals(finalStatus)).toList();
    }

    public List<Claim> GetClaimsByLevelorder2(String status) {
        List<Claim> claims= claimRepo.getClaimsByLevelorder2();
        if(!status.equals("pending") && !status.equals("Treated")){
            status="pending";
        }
        String finalStatus = status;
        return claims.stream().filter((claim)-> claim.getStatus().equals(finalStatus)).toList();

    }

    @Override
    public ResponseEntity<HttpStatus> updateClaimDecision(long claimId) {
        // Retrieve the claim from the database based on the claimId
        Claim claim = claimRepo.findById(claimId).orElse(null);
        if (claim == null) {
            return ResponseEntity.notFound().build();
        }
        // Update claim decision and status
        updateClaimDecisionAndStatus(claim);
        // Send email
        try {
            sendEmail(claim.getDecision());
            logger.info("Email sent successfully for claim ID: {}", claimId);
            return ResponseEntity.ok().build();
        } catch (MailException e) {
            logger.error("Failed to send email for claim ID: {}", claimId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private void updateClaimDecisionAndStatus(Claim claim) {
        if (claim.getTitle() == ClaimType.SYSTEM) {
            switch (claim.getSystemProblem()) {
                case SERVER:
                    claim.setDecision("Hi, we are incredibly sorry. We may be facing some technical issues with our servers. We are working on it to provide the best services. Thank you for contacting us.");
                    break;
                case OPERATIONAL_MALFUNCTION:
                    claim.setDecision("Hi, we apologize for the operational malfunctions that you have faced. We will fix this abnormality as soon as possible. Thank you for contacting us.");
                    break;
                case UNCORRECT_TIMING:
                    claim.setDecision("Hi, thank you for reaching us. Our team is working on renewing the expired certificate to fix the timing problem. We are sorry for the encountered issue. Thank you for contacting us.");
                    break;
                default:
                    // Handle unexpected system problem
                    break;
            }
        } else if (claim.getTitle() == ClaimType.SERVICE) {
            switch (claim.getServiceProblem()) {
                case STAFF_SHORTAGE:
                    claim.setDecision("Hi, we apologize for the inconvenience caused by the shortage of staff during the event. We are working to address this issue to ensure smoother operations in the future. Thank you for bringing this to our attention.");
                    break;
                case DESORGANISATION:
                    claim.setDecision("Hi, we apologize for the disorganization experienced during the event. We are taking steps to improve our organizational processes to prevent such issues from reoccurring. Thank you for your patience and understanding.");
                    break;
                default:
                    // Handle unexpected service problem
                    break;
            }
        }

        // Update status
        claim.setStatus("Treated");

        // Save updated claim
        claimRepo.save(claim);
    }

    public void sendEmail(String text) throws MailException {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo("salmasaidi1110@gmail.com");
        simpleMailMessage.setSubject("Claim Response");
        simpleMailMessage.setText(text);
        javaMailSender.send(simpleMailMessage);
    }
}
