package com.example.exhibitor.Controller;


import com.example.exhibitor.Entity.*;
import com.example.exhibitor.Repository.SupplierRequestRepository;
import com.example.exhibitor.Service.BoothService;
import com.example.exhibitor.Service.SupplierRequestService;
import com.example.exhibitor.Service.SupplierService;
import com.example.exhibitor.dto.SupplierListDTO;
import jakarta.ws.rs.Path;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/supplyrequest")
public class SupplierController {
    @Autowired
    private SimpMessagingTemplate template;
    // Initialize Notifications



    @Autowired
    private SupplierRequestService supplierRequestService ;

    @Autowired
    private SupplierRequestRepository supplierRequestRepository;

    @Autowired
    private SupplierService supplierService ;

    @Autowired
    private BoothService boothService;

    @GetMapping("/showAllsuppliers")
    public List<Supplier> showAllsuppliers(){
        return supplierService.showAllSuppliers();
    }
    @GetMapping("/allRequests")
    public List<SupplierRequest> getAllRequests(){
        return supplierRequestService.getAllRequests();
    }
    @PostMapping("/addsupplierrequest")
    public SupplierRequest addSupplierRequest(@RequestBody SupplierRequest supplierRequest){
        supplierRequest.setCreatedAt(LocalDate.now());
        return supplierRequestService.addRequest(supplierRequest);
    }
    @PutMapping("/modifysupplierrequest/{supplierRequestID}")
    public SupplierRequest modifySupplierRequest(
            @PathVariable("supplierRequestID") Long supplierRequestID,
            @RequestBody SupplierRequest supplierRequest
    ) throws Exception {
        SupplierRequest s =  supplierRequestRepository.findById(supplierRequestID).orElseThrow(() -> new Exception("supplierRequestNotfound"));
        s.setPrice(supplierRequest.getPrice());
        s.setRequirement(supplierRequest.getRequirement());
        s.setProductname(supplierRequest.getProductname());
        s.setQuantity(supplierRequest.getQuantity());
        s.setServicename(supplierRequest.getServicename());
        s.setBoothPosition(supplierRequest.getBoothPosition());
        s.setType(supplierRequest.getType());
        return supplierRequestService.ModifyRequest(s);
    }
    @PostMapping("/deletesupplierrequest/{supplierRequestID}")
    public void deleteSupplierRequest(@PathVariable("supplierRequestID") Long id) throws Exception {

         supplierRequestService.deleteRequest(id);
    }
    @PostMapping("/affectrequesttosupplier/{connectedsupplier-id}/{supplyrequest-id}")
    public SupplierRequest affectsupplyrequestosupplier(@PathVariable("connectedsupplier-id") Long id,
                                                              @PathVariable("supplyrequest-id") Long requestid

    ) throws Exception
    {
    return  supplierRequestService.AffectSupplierRequestToSupplier(requestid,id);
    }
    @PostMapping("/addSupplier")
    public Supplier addSupplier(@RequestBody Supplier supplier


    )
    {
        return  supplierService.addSupplier(supplier);
    }
    @GetMapping("/Supplierbyid/{supplier-id}")
    public Supplier addSupplier(@PathVariable("supplier-id") Long supplierId
    )
    {
        return  supplierService.findSupplierByid(supplierId);
    }

    @GetMapping("/SupplierRequestStatus/{supplierRequest-id}")
    public SupplierRequest Getstatus(@PathVariable("supplierRequest-id") Long supplierRequestId
    ) throws Exception {
        return  supplierRequestService.getSupplierRequestStatus(supplierRequestId);
    }

    @PostMapping("/RefuseSupplierRequest/{supplier-id}")
    public void removeSupplierFromRequest(@PathVariable("supplier-id") Long supplierID
    ) throws Exception {
          supplierRequestService.removeSupplier(supplierID);
    }
    @GetMapping("/checkReserved/{boothname}")
    public Boolean Getstatus(@PathVariable("boothname") String boothName
    )  {
       return boothService.checkReserved(boothName);
    }
    @GetMapping("/affectBoothToexhibitor/{boothname}/{exhibitorid}")
    public void affectBoothToexihibiotr(@PathVariable("boothname") String boothName, @PathVariable("exhibitorid") Long exhibitorid
    ) throws Exception {
         boothService.affectBoothToExhibitor(boothName,exhibitorid);
    }
    @GetMapping("/findExhibitorByBooth/{boothname}")
    public Long getExhibitorByBooth(@PathVariable("boothname") String boothName
    ) throws Exception {
        return boothService.ExhibitorIdByBooth(boothName);
    }
    @GetMapping("/findSupplierByBooth/{boothname}")
    public Long findSupplierByBooth(@PathVariable("boothname") String boothName
    ) throws Exception {
        return boothService.SupplierIdByBooth(boothName);
    }
    @GetMapping("/getAllSuppliersBySupplyRequest/{supplyRequestId}")
    public List<Supplier> getAllSuppliersBySupplyRequest(@PathVariable("supplyRequestId") Long supplyRequestId
    ) throws Exception {
        return supplierService.getSuppliersBySupplyRequest(supplyRequestId);
    }



    //to be consumed from other microservices
    @PostMapping("/addingsupplierfromuser")
    public void functionInMicroserviceB(@RequestBody Supplier supplier) {
        log.info("saving supplier worked");
        supplierService.addSupplier(supplier);
    }



}
