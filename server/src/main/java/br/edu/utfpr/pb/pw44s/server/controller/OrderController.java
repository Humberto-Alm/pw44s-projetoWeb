package br.edu.utfpr.pb.pw44s.server.controller;

import br.edu.utfpr.pb.pw44s.server.DTO.OrderDTO;
import br.edu.utfpr.pb.pw44s.server.model.Order;
import br.edu.utfpr.pb.pw44s.server.service.AuthService;
import br.edu.utfpr.pb.pw44s.server.service.ICrudService;
import br.edu.utfpr.pb.pw44s.server.service.IOrderService;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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

}