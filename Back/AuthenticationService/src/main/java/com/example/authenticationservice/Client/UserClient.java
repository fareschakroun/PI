package com.example.authenticationservice.Client;

import com.example.authenticationservice.dto.ExhibitorDTO;
import com.example.authenticationservice.entity.Supplier;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "BoothAndSupplier", url = "http://localhost:8763") // URL of Microservice B
public interface UserClient {

    @PostMapping("/api/supplyrequest/addingsupplierfromuser")
    void functionInMicroserviceB(@RequestBody Supplier supplier);

    @PostMapping("/api/BoothAndSupplier/addExhibitor")
    void AddingExhibitorFromAuthenticationService(@RequestBody ExhibitorDTO exhibitorDTO);
}