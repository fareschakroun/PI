package com.example.exhibitor.Service;

import com.example.exhibitor.Entity.Notifications;
import com.example.exhibitor.Entity.Supplier;
import com.example.exhibitor.Repository.NotificationsRepository;
import com.example.exhibitor.Repository.SupplierRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.core.MessageSendingOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
public class NotificationsService {
    private int count = 0;
    @Autowired
    private NotificationsRepository notificationRepository;
    @Autowired
    private final MessageSendingOperations<String> messagingTemplate;
    @Autowired
    private final SupplierRepository supplierRepository ;

    public int getUnreadNotificationCountForUser(Supplier user) {
        return notificationRepository.countBySupplier(user);
    }

    public void addNotification(Long supplierId){
        Supplier supplier= supplierRepository.findById(supplierId).get() ;
        Notifications notifications = new Notifications();
        notifications.setSupplier(supplier);

        notificationRepository.save(notifications);

    }

    @Transactional
    public void markNotificationsAsRead(Supplier user) {
        notificationRepository.deleteBySupplier(user);
    }



    public NotificationsService(MessageSendingOperations<String> messagingTemplate, SupplierRepository supplierRepository) {
        this.messagingTemplate = messagingTemplate;
        this.supplierRepository = supplierRepository;
    }





    public void sendNotification() {
        count++;
        messagingTemplate.convertAndSend("/socket/notification/test", count);
        log.info("working");
    }
}
