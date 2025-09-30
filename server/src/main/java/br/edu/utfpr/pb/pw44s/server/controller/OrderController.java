package br.edu.utfpr.pb.pw44s.server.controller;

import br.edu.utfpr.pb.pw44s.server.DTO.OrderDTO;
import br.edu.utfpr.pb.pw44s.server.model.Order;
import br.edu.utfpr.pb.pw44s.server.service.AuthService;
import br.edu.utfpr.pb.pw44s.server.service.ICrudService;
import br.edu.utfpr.pb.pw44s.server.service.IOrderService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("orders")
public class OrderController extends CrudController<Order, OrderDTO, Long> {
    private final IOrderService orderService;
    private final ModelMapper modelMapper;


    public OrderController(IOrderService orderService, ModelMapper modelMapper, AuthService authService) {
        super(Order.class, OrderDTO.class);
        this.orderService = orderService;
        this.modelMapper = modelMapper;
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

}