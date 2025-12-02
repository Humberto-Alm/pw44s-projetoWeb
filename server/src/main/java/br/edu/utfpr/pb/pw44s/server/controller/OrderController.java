package br.edu.utfpr.pb.pw44s.server.controller;

import br.edu.utfpr.pb.pw44s.server.DTO.*;
import br.edu.utfpr.pb.pw44s.server.model.*;
import br.edu.utfpr.pb.pw44s.server.repository.OrderRepository;
import br.edu.utfpr.pb.pw44s.server.service.AuthService;
import br.edu.utfpr.pb.pw44s.server.service.ICrudService;
import br.edu.utfpr.pb.pw44s.server.service.IOrderItensService;
import br.edu.utfpr.pb.pw44s.server.service.IOrderService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("orders")
public class OrderController extends CrudController<Order, OrderDTO, Long> {
    private final IOrderService orderService;
    private final IOrderItensService orderItensService;
    private final ModelMapper modelMapper;
    private final AuthService authService;
    private final OrderRepository orderRepository;

    public OrderController(IOrderService orderService,
                           IOrderItensService orderItensService,
                           ModelMapper modelMapper,
                           AuthService authService,
                           OrderRepository orderRepository) {
        super(Order.class, OrderDTO.class);
        this.orderService = orderService;
        this.orderItensService = orderItensService;
        this.modelMapper = modelMapper;
        this.authService = authService;
        this.orderRepository = orderRepository;
    }

    @Override
    protected ICrudService<Order, Long> getService() {
        return orderService;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return modelMapper;
    }

    // Listar meus pedidos
    @GetMapping("/my_orders")
    public ResponseEntity<List<OrderResponseDTO>> getMyOrders() {
        User user = authService.getAuthenticatedUser();
        List<Order> orders = orderRepository.findByUser(user);

        List<OrderResponseDTO> response = orders.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    // Detalhes do pedido
    @GetMapping("/detail/{id}")
    public ResponseEntity<OrderResponseDTO> getOrderDetail(@PathVariable Long id) {
        Order order = orderService.findOrderById(id);
        if (order == null) return ResponseEntity.notFound().build();

        Long userId = authService.getAuthenticatedUserId();
        if (order.getUser().getId() != userId) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        return ResponseEntity.ok(convertToResponseDTO(order));
    }

    // Método auxiliar para converter Order -> OrderResponseDTO
    private OrderResponseDTO convertToResponseDTO(Order order) {
        OrderResponseDTO dto = new OrderResponseDTO();
        dto.setId(order.getId());
        dto.setData(order.getData());
        dto.setTotal(order.getTotalOrder());
        dto.setFreight(order.getFreight());
        dto.setPaymentMethod(order.getPaymentMethod());

        if (order.getAddress() != null) {
            dto.setAddress(modelMapper.map(order.getAddress(), AddressDTO.class));
        }

        if (order.getItems() != null) {
            List<OrderItensResponseDTO> itemsDto = order.getItems().stream().map(item -> {
                OrderItensResponseDTO iDto = new OrderItensResponseDTO();
                iDto.setId(item.getId());
                iDto.setQuantity((int) item.getQuantity());

                iDto.setUnit_price(item.getUnit_price());

                if (item.getProduct() != null) {
                    iDto.setProduct(modelMapper.map(item.getProduct(), ProductDTO.class));
                }
                return iDto;
            }).collect(Collectors.toList());
            dto.setItems(itemsDto);
        }

        return dto;
    }

    // Criar pedido
    @Override
    @PostMapping
    @Transactional
    public ResponseEntity<OrderDTO> create(@Valid @RequestBody OrderDTO orderDTO) {
        User authenticatedUser = authService.getAuthenticatedUser();

        Order order = new Order();
        order.setData(java.time.LocalDateTime.now());
        order.setUser(authenticatedUser);

        order.setAddress(modelMapper.map(orderDTO.getAddress(), Address.class));
        order.setFreight(orderDTO.getFreight());
        order.setPaymentMethod(orderDTO.getPaymentMethod());

        order = orderService.save(order);

        if (orderDTO.getItems() != null && !orderDTO.getItems().isEmpty()) {
            Order finalOrder = order;
            List<OrderItens> orderItensList = orderDTO.getItems().stream()
                    .map(itemDTO -> {
                        OrderItens item = new OrderItens();
                        item.setOrder(finalOrder);

                        Product product = new Product();
                        product.setId(itemDTO.getProductId());
                        item.setProduct(product);
                        item.setQuantity((double) itemDTO.getQuantity());

                        item.setUnit_price(itemDTO.getUnit_price());
                        return item;
                    })
                    .collect(Collectors.toList());

            orderItensService.saveAll(orderItensList);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(modelMapper.map(order, OrderDTO.class));
    }
}