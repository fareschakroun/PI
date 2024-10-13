package com.example.exhibitor.Repository;


import com.example.exhibitor.Entity.Booth;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoothRepository extends JpaRepository<Booth,Long> {
   List<Booth> findAllByExhibitorId(Long id);

   Booth findByBoothname(String boothname);



}
