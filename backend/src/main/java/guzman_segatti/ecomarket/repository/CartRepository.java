package guzman_segatti.ecomarket.repository;

import guzman_segatti.ecomarket.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
}
