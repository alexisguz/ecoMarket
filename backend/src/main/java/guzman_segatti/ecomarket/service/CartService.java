package guzman_segatti.ecomarket.service;

import guzman_segatti.ecomarket.model.Cart;
import guzman_segatti.ecomarket.model.CartItem;
import guzman_segatti.ecomarket.model.Product;
import guzman_segatti.ecomarket.repository.CartRepository;
import guzman_segatti.ecomarket.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class CartService {

    private static final Long CART_ID = 1L;

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    public Cart getCart() {
        return cartRepository.findById(CART_ID).orElseGet(() -> {
            Cart cart = new Cart();
            cart.setId(CART_ID);
            return cartRepository.save(cart);
        });
    }

    public Cart addItem(Long productId, Integer quantity) {
        Cart cart = getCart();
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));

        cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst()
                .ifPresentOrElse(
                        item -> item.setQuantity(item.getQuantity() + quantity),
                        () -> cart.getItems().add(CartItem.builder()
                                .cart(cart)
                                .product(product)
                                .quantity(quantity)
                                .build())
                );

        return cartRepository.save(cart);
    }

    public Cart updateItem(Long productId, Integer quantity) {
        Cart cart = getCart();
        CartItem item = cart.getItems().stream()
                .filter(i -> i.getProduct().getId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ítem no está en el carrito"));

        if (quantity <= 0) {
            cart.getItems().remove(item);
        } else {
            item.setQuantity(quantity);
        }

        return cartRepository.save(cart);
    }

    public Cart removeItem(Long productId) {
        Cart cart = getCart();
        boolean removed = cart.getItems().removeIf(item -> item.getProduct().getId().equals(productId));
        if (!removed) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Ítem no está en el carrito");
        }
        return cartRepository.save(cart);
    }

    public void clearCart(Cart cart) {
        cart.getItems().clear();
        cartRepository.save(cart);
    }
}
