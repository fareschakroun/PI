package com.example.exhibitor.Repository;

import com.example.exhibitor.Entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Supplier,Long> {
}
