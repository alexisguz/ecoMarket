package guzman_segatti.ecomarket.controller;

import guzman_segatti.ecomarket.dto.ConfirmOrderRequest;
import guzman_segatti.ecomarket.model.Order;
import guzman_segatti.ecomarket.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Order confirmOrder(@RequestBody ConfirmOrderRequest request) {
        return orderService.confirmOrder(request.getMessage());
    }

    @GetMapping
    public List<Order> getHistory() {
        return orderService.findAll();
    }
}
