package com.offer.offer.Repository;

import com.offer.offer.Entity.Application;
import com.offer.offer.Entity.Offer;
import com.offer.offer.Entity.TypeOffer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application,Long> {
    List<Application> findApplicationsByIdCandidat(long idCandidat);
    List<Application> findApplicationsByOffer(Offer offer);
    //nbr candidature pour chaque offre
    @Query("SELECT o, COUNT(a)," +
            "(SELECT COUNT(a1) FROM Application a1 WHERE a1.offer = o AND a1.status = 'accépté'), " +
            "(SELECT COUNT(a2) FROM Application a2 WHERE a2.offer = o AND a2.status = 'refusé'), " +
            "(SELECT COUNT(a3) FROM Application a3 WHERE a3.offer = o AND a3.status = 'en_cours') " +
            " FROM Offer o LEFT JOIN o.applications a GROUP BY o")
    List<Object[]> countApplicationsByOffer();

    @Query("SELECT o, COUNT(a)," +
            "(SELECT COUNT(a1) FROM Application a1 WHERE a1.offer = o AND a1.status = 'accépté'), " +
            "(SELECT COUNT(a2) FROM Application a2 WHERE a2.offer = o AND a2.status = 'refusé'), " +
            "(SELECT COUNT(a3) FROM Application a3 WHERE a3.offer = o AND a3.status = 'en_cours') " +
            " FROM Offer o LEFT JOIN o.applications a " +
            "WHERE o.offer= :typeOffer " +
            "GROUP BY o")
    List<Object[]> countApplicationsByOfferANdTypeOffer(@Param("typeOffer") TypeOffer typeOffer);

    //Offres+nbrCandidatureForExhibitor
    /*@Query("SELECT o, COUNT(a) FROM Offer o LEFT JOIN o.applications a where o.exibitorId =:exibitorId GROUP BY o ")
    List<Object[]> countApplicationsByOfferExhibitor(@Param("exibitorId") long exibitorId);*/

    @Query("SELECT o, COUNT(a), " +
            "(SELECT COUNT(a1) FROM Application a1 WHERE a1.offer = o AND a1.status = 'accépté'), " +
            "(SELECT COUNT(a2) FROM Application a2 WHERE a2.offer = o AND a2.status = 'refusé'), " +
            "(SELECT COUNT(a3) FROM Application a3 WHERE a3.offer = o AND a3.status = 'en_cours') " +
            "FROM Offer o LEFT JOIN o.applications a " +
            "WHERE o.exibitorId = :exibitorId " +
            "GROUP BY o")
    List<Object[]> countApplicationsByOfferExhibitor(@Param("exibitorId") long exibitorId);

    @Query("SELECT o, COUNT(a), " +
            "(SELECT COUNT(a1) FROM Application a1 WHERE a1.offer = o AND a1.status = 'accépté'), " +
            "(SELECT COUNT(a2) FROM Application a2 WHERE a2.offer = o AND a2.status = 'refusé'), " +
            "(SELECT COUNT(a3) FROM Application a3 WHERE a3.offer = o AND a3.status = 'en_cours') " +
            "FROM Offer o LEFT JOIN o.applications a " +
            "WHERE o.exibitorId = :exibitorId AND o.offer= :typeOffer " +
            "GROUP BY o")
    List<Object[]> countStagesByOfferExhibitor(@Param("exibitorId") long exibitorId,@Param("typeOffer") TypeOffer typeOffer);

    // nbr de candidature accepter et refusé et en_cours
    @Query("SELECT a.status, COUNT(a) " +
            "FROM Application a " +
            "GROUP BY a.status")
    List<Object[]> countCandidaturesByStatus();
    //Nombre de candidatures par période
    @Query("SELECT FUNCTION('MONTHNAME', a.applicationDate), COUNT(a) FROM Application a WHERE FUNCTION('YEAR', a.applicationDate) = :year GROUP BY FUNCTION('YEAR', a.applicationDate), FUNCTION('MONTH', a.applicationDate)")
    List<Object[]> countApplicationsByMonthAndYear(@Param("year") int year);

    List<Application> getApplicationsByIdCandidat(long id);

    @Query("SELECT o, " +
            "(SELECT COUNT(a1) FROM Application a1 WHERE a1.offer = o AND a1.status = 'ACCEPTED'), " +
            "(SELECT COUNT(a2) FROM Application a2 WHERE a2.offer = o AND a2.status = 'REJECTED'), " +
            "(SELECT COUNT(a3) FROM Application a3 WHERE a3.offer = o AND a3.status = 'IN_PROGRESS') " +
            "FROM Offer o " +
            "WHERE EXISTS (SELECT 1 FROM Application a WHERE a.idCandidat = :userId AND CONCAT('%',o.titre, '%') LIKE CONCAT('%', a.offer.titre, '%')) " +
            "AND o.offer IN (SELECT DISTINCT a.offer.offer FROM Application a WHERE a.idCandidat = :userId) " +
            "AND o.Id NOT IN (SELECT DISTINCT a.offer.Id FROM Application a WHERE a.idCandidat = :userId) " +
            "GROUP BY o")
    List<Object[]> findRecommendedOffersForUserApp(@Param("userId") long userId);

    @Query("SELECT o, COUNT(a)," +
            "(SELECT COUNT(a1) FROM Application a1 WHERE a1.offer = o AND a1.status = 'accépté'), " +
            "(SELECT COUNT(a2) FROM Application a2 WHERE a2.offer = o AND a2.status = 'refusé'), " +
            "(SELECT COUNT(a3) FROM Application a3 WHERE a3.offer = o AND a3.status = 'en_cours') " +
            " FROM Offer o LEFT JOIN o.applications a "+
            " WHERE o.titre LIKE %:rech% "+
            " GROUP BY o")
    List<Object[]> listeOfferRecherche(@Param("rech") String rech);
}
