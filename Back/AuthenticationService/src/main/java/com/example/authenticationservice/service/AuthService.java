package com.example.authenticationservice.service;

import com.example.authenticationservice.Client.UserClient;
import com.example.authenticationservice.dto.ExhibitorDTO;
import com.example.authenticationservice.entity.Supplier;
import com.example.authenticationservice.entity.UserCredential;
import com.example.authenticationservice.repository.UserCredentialRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.example.authenticationservice.entity.role;

import java.io.IOException;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
public class AuthService {

    private final UserClient userClient;

    private UserCredentialRepository repository;

    private PasswordEncoder passwordEncoder;

    private JwtService jwtService;

    /*
     * public String saveUser(UserCredential credential) {
     * credential.setPassword(passwordEncoder.encode(credential.getPassword()));
     * repository.save(credential);
     * return "user added to the system";
     * private String firstname;
     * private String lastname;
     * private String phoneNumber;
     * private LocalDate creationDate;
     * }
     */

    public UserCredential saveUser(UserCredential credential, String name , String email, role role , String password ,
                                   String firstname, String lastname, String phoneNumber, MultipartFile cv , String imageUrl,String imageId) throws IOException {
        credential.setName(name);
        credential.setEmail(email);
        credential.setRole(role);
        credential.setPassword(passwordEncoder.encode(password));
        credential.setFirstname(firstname);
        credential.setLastname(lastname);
        credential.setPhoneNumber(phoneNumber);
        credential.setCreationDate(LocalDate.now());
        credential.setImageId(imageId);
        credential.setImageUrl(imageUrl);
    credential.setPoints(100);
        ///sending data to supplier :


        if (cv != null && !cv.isEmpty()) {
            credential.setCv(cv.getBytes());
        }
        UserCredential savedUser = repository.save(credential);

        // Pass the generated user ID along with other details to Microservice B
        log.info("after Saved User ");
        if(credential.getRole() == com.example.authenticationservice.entity.role.supplier) {
            Supplier supplier = mapToSupplier(credential, savedUser.getId());
            userClient.functionInMicroserviceB(supplier);
        }
        if(credential.getRole() == com.example.authenticationservice.entity.role.exhibitor) {
            ExhibitorDTO exhibitorDTO = mapToExhibitor(credential, savedUser.getId());
            userClient.AddingExhibitorFromAuthenticationService(exhibitorDTO);
        }
        return savedUser ;
    }
    private Supplier mapToSupplier(UserCredential user, int userId) {
        Supplier supplier = new Supplier();
        supplier.setId(userId); // Set the same user ID in Microservice B
        supplier.setNom(user.getFirstname() + " " + user.getLastname());
        supplier.setNumeroTelephone(user.getPhoneNumber());
        // Set other attributes as needed
        return supplier;
    }
    private ExhibitorDTO mapToExhibitor(UserCredential user, int userId) {
        ExhibitorDTO exhibitorDTO = new ExhibitorDTO();
        exhibitorDTO.setId(userId); // Set the same user ID in Microservice B
        exhibitorDTO.setExhibitorName(user.getName());

        // Set other attributes as needed
        return exhibitorDTO;
    }




    public List<UserCredential> getAdmins() {
        return repository.findByRole(role.admin);
    }

    public String generateToken(String username) {
        return jwtService.generateToken(username);
    }

    public void validateToken(String token) {
        jwtService.validateToken(token);
    }

    public Integer getUserIdByEmail(String email) {
        return repository.findByEmail(email).get().getId();
    }

    public UserCredential getUserById(int id) {
        return repository.findById(id).get();
    }

    /*************************
     * added by eya /
     *
     */

    public void AffecterRoomToUser(long roomId, int id, int newPoints) {
        UserCredential user = repository.findById(id).orElse(null);
        user.setRoomid(roomId);
        // int oldpoints = user.getPoints();

        user.setPoints(newPoints);
        repository.save(user);

    }

    public long getRoomUser(int id) {
        UserCredential user = repository.findById(id).orElse(null);
        return user.getRoomid();

    }

    public UserCredential UpdateUserPoints(int id, int points) {
        UserCredential user = repository.findById(id).orElse(null);

        if (user.getPoints() > 0) {
            if (points == 50) {
                user.setPoints(user.getPoints() - points);
                repository.save((user));
            }
            if (points == 150) {
                user.setPoints(user.getPoints() - points);
                repository.save((user));
            }
            if (points == 100) {
                user.setPoints(user.getPoints() - points);
                repository.save((user));
            }
        }

        return user;

    }

    public void updateUserPointsWheneEnteringAuction(int id, int points) {
        UserCredential user = repository.findById(id).orElse(null);
        user.setPoints(points);
        repository.save(user);

    }

    public void RemoveUserRoom(int id) {
        UserCredential user = repository.findById(id).orElse(null);
        user.setRoomid(0);
        repository.save(user);

    }

    public UserCredential RembourssementPoints(int iduser, int points) {
        UserCredential user = repository.findById(iduser).orElse(null);
        user.setPoints(points);
        repository.save(user);
        return user;
    }

    public List<UserCredential> getUsersByIdRoom(long roomid) {
        return repository.findAllByRoomid(roomid);
    }
}