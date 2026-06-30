package guzman_segatti.ecomarket.controller;

import guzman_segatti.ecomarket.dto.AddToCartRequest;
import guzman_segatti.ecomarket.dto.UpdateCartItemRequest;
import guzman_segatti.ecomarket.model.Cart;
import guzman_segatti.ecomarket.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public Cart getCart() {
        return cartService.getCart();
    }

    @PostMapping("/items")
    public Cart addItem(@RequestBody AddToCartRequest request) {
        return cartService.addItem(request.getProductId(), request.getQuantity());
    }

    @PutMapping("/items/{productId}")
    public Cart updateItem(@PathVariable Long productId, @RequestBody UpdateCartItemRequest request) {
        return cartService.updateItem(productId, request.getQuantity());
    }

    @DeleteMapping("/items/{productId}")
    public Cart removeItem(@PathVariable Long productId) {
        return cartService.removeItem(productId);
    }
}
