package tn.esprit.auction.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.auction.Entites.CheckoutPayment;


public interface PaymentRepository extends JpaRepository<CheckoutPayment,Long> {
}
