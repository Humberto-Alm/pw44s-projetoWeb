package br.edu.utfpr.pb.pw44s.server.controller;

import br.edu.utfpr.pb.pw44s.server.DTO.OrderItensDTO;
import br.edu.utfpr.pb.pw44s.server.model.OrderItens;
import br.edu.utfpr.pb.pw44s.server.service.AuthService;
import br.edu.utfpr.pb.pw44s.server.service.ICrudService;
import br.edu.utfpr.pb.pw44s.server.service.IOrderItensService;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("orders_itens")
public class OrderItensController extends CrudController<OrderItens, OrderItensDTO, Long> {
    private final IOrderItensService orderItensService;
    private final ModelMapper modelMapper;


    public OrderItensController(IOrderItensService orderItensService, ModelMapper modelMapper, AuthService authService) {
        super(OrderItens.class, OrderItensDTO.class);
        this.orderItensService = orderItensService;
        this.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<OrderItens, Long> getService() {
        return orderItensService;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return modelMapper;
    }

}