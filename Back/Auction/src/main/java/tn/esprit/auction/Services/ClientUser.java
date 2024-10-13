package tn.esprit.auction.Services;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import tn.esprit.auction.Entites.UserCredential;

@FeignClient(name = "AuthenticationService", url = "http://localhost:8080")
public interface ClientUser {

    @GetMapping("/auth/getUserById/{userid}")
    UserCredential getUserById(@PathVariable("userid") int userid);
}