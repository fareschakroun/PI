package com.example.claim.Service;

import com.example.claim.Entity.Response;

import java.util.Optional;

public interface ResponseService {

    public Response saveResponse(Response response);

    public Optional<Response> getResponseByClaimId(Long claimId);
}
