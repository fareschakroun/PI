<<<<<<<< HEAD:Back/Booth/src/main/java/com/example/Event/Repository/BoothRepository.java
package com.example.Event.Repository;

import com.example.Event.Entity.Booth;
========
package com.example.exhibitor.Repository;



import com.example.exhibitor.Entity.Booth;
>>>>>>>> main:Back/BoothAndSupplierManagement/src/main/java/com/example/exhibitor/Repository/BoothRepository.java
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoothRepository extends JpaRepository<Booth,Long> {
   List<Booth> findAllByExhibitorId(Long id);

   Booth findByBoothname(String boothname);



}
