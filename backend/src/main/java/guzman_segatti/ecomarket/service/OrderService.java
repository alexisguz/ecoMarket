package guzman_segatti.ecomarket.service;

import guzman_segatti.ecomarket.model.Cart;
import guzman_segatti.ecomarket.model.Order;
import guzman_segatti.ecomarket.model.OrderItem;
import guzman_segatti.ecomarket.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartService cartService;

    public Order confirmOrder(String message) {
        Cart cart = cartService.getCart();
        if (cart.getItems().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El carrito está vacío");
        }

        Order order = Order.builder()
                .message(message)
                .total(cart.getTotal())
                .confirmedAt(LocalDateTime.now())
                .items(new ArrayList<>())
                .build();

        cart.getItems().forEach(cartItem -> {
            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .productName(cartItem.getProduct().getName())
                    .productPrice(cartItem.getProduct().getPrice())
                    .quantity(cartItem.getQuantity())
                    .build();
            order.getItems().add(orderItem);
        });

        Order saved = orderRepository.save(order);
        cartService.clearCart(cart);
        return saved;
    }

    public List<Order> findAll() {
        return orderRepository.findAll();
    }
}
