package guzman_segatti.ecomarket.repository;

import guzman_segatti.ecomarket.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
