package com.example.exhibitor.Controller;

import com.example.exhibitor.Entity.Supplier;
import com.example.exhibitor.Repository.SupplierRepository;
import com.example.exhibitor.Service.NotificationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
public class NotificationsController {

    @Autowired
    private NotificationsService notificationService;
    @Autowired
    private SupplierRepository supplierRepository ;

    @GetMapping("/count/{userId}")
    public int getUnreadNotificationCount(@PathVariable("userId") Long userId) {
        Supplier user = supplierRepository.findSupplierById(userId); // Fetch user from database using userId
        return notificationService.getUnreadNotificationCountForUser(user);
    }

    @PostMapping("/markasread/{userId}")
    public void markNotificationsAsRead(@PathVariable("userId") Long userId) {
        Supplier user = supplierRepository.findSupplierById(userId); // Fetch user from database using userId
        notificationService.markNotificationsAsRead(user);
    }
    @PostMapping("/addNotification/{userId}")
    public void addNotification(@PathVariable("userId") Long userId) {
        notificationService.addNotification(userId);
    }

}
