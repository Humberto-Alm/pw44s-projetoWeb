package br.edu.utfpr.pb.pw44s.server.controller;

import br.edu.utfpr.pb.pw44s.server.DTO.OrderDTO;
import br.edu.utfpr.pb.pw44s.server.model.Order;
import br.edu.utfpr.pb.pw44s.server.model.User;
import br.edu.utfpr.pb.pw44s.server.service.AuthService;
import br.edu.utfpr.pb.pw44s.server.service.ICrudService;
import br.edu.utfpr.pb.pw44s.server.service.IOrderService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("orders")
public class OrderController extends CrudController<Order, OrderDTO, Long> {
    private final IOrderService orderService;
    private final ModelMapper modelMapper;
    private final AuthService authService;


    public OrderController(IOrderService orderService, ModelMapper modelMapper, AuthService authService) {
        super(Order.class, OrderDTO.class);
        this.orderService = orderService;
        this.modelMapper = modelMapper;
        this.authService = authService;
    }

    @Override
    protected ICrudService<Order, Long> getService() {
        return orderService;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return modelMapper;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderDTO>> getOrdersByUser(@PathVariable Long userId) {
    List<Order> orders = orderService.findAllByUserId(userId);
    List<OrderDTO> orderDTO = orders.stream()
            .map(order -> modelMapper.map(order, OrderDTO.class))
            .collect(Collectors.toList());
    return ResponseEntity.ok(orderDTO);
    }

    @GetMapping("/{orderId}/total")
    public ResponseEntity<BigDecimal> getOrderTotal(@PathVariable Long orderId) {
        Order order = orderService.findOrderById(orderId);
        if (order == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(order.getTotalOrder());
    }

    @Override
    @PostMapping
    public ResponseEntity<OrderDTO> create(@Valid @RequestBody OrderDTO orderDTO) {
        User authenticatedUser = authService.getAuthenticatedUser();

        if (orderDTO.getUser() != null &&
                orderDTO.getUser().getId() != authenticatedUser.getId()) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Você não pode criar pedidos para outros usuários"
            );
        }
        orderDTO.setUser(authenticatedUser);
        Order order = modelMapper.map(orderDTO, Order.class);
        order = orderService.save(order);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(modelMapper.map(order, OrderDTO.class));
    }

    @GetMapping("/my_orders")
    public ResponseEntity<List<OrderDTO>> getMyOrders() {
        Long userId = authService.getAuthenticatedUserId();
        List<Order> orders = orderService.findAllByUserId(userId);
        List<OrderDTO> orderDTOs = orders.stream()
                .map(order -> modelMapper.map(order, OrderDTO.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(orderDTOs);
    }



}