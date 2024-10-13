package com.example.claim.Service;


import com.example.claim.Entity.Response;
import com.example.claim.Repository.ResponseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ResponseServiceImp implements ResponseService {
    private final ResponseRepository responseRepository;


    public Response saveResponse(Response response) {
        return responseRepository.save(response);
    }

    public Optional<Response> getResponseByClaimId(Long claimId) {
        return responseRepository.findByClaimIdClaim(claimId);
    }
}