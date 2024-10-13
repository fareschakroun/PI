package com.example.exhibitor.Repository;

import com.example.exhibitor.Entity.Notifications;
import com.example.exhibitor.Entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationsRepository extends JpaRepository<Notifications,Long> {
    int countBySupplierAndReadornot(Supplier user, boolean read);
    int countBySupplier(Supplier user);
    void deleteBySupplier(Supplier supplier);
}
