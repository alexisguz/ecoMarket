package guzman_segatti.ecomarket.repository;

import guzman_segatti.ecomarket.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
