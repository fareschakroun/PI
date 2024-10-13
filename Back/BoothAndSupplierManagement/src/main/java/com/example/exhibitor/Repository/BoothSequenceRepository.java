package com.example.exhibitor.Repository;

import com.example.exhibitor.Entity.BoothSequence;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoothSequenceRepository extends JpaRepository<BoothSequence,Long> {
    BoothSequence findFirstByIdIsNotNull();
}
