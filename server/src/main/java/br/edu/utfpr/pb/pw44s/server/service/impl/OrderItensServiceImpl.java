package br.edu.utfpr.pb.pw44s.server.service.impl;

import br.edu.utfpr.pb.pw44s.server.model.Order;
import br.edu.utfpr.pb.pw44s.server.model.OrderItens;
import br.edu.utfpr.pb.pw44s.server.model.Product;
import br.edu.utfpr.pb.pw44s.server.model.User;
import br.edu.utfpr.pb.pw44s.server.repository.OrderItensRepository;
import br.edu.utfpr.pb.pw44s.server.repository.OrderRepository;
import br.edu.utfpr.pb.pw44s.server.service.IOrderItensService;
import br.edu.utfpr.pb.pw44s.server.service.IOrderService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class OrderItensServiceImpl extends CrudServiceImpl<OrderItens, Long> implements IOrderItensService{

    private final OrderItensRepository orderItensRepository;

    public OrderItensServiceImpl(OrderItensRepository orderItensRepository) {
        this.orderItensRepository = orderItensRepository;
    }

    @Override
    protected JpaRepository<OrderItens, Long> getRepository() {
        return orderItensRepository;
    }

    public List<OrderItens> findAllByOrderId(Long orderId) {
        return this.orderItensRepository.findAllByOrderId(orderId);
    }

}