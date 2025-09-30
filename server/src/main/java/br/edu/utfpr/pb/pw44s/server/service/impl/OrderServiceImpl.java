package br.edu.utfpr.pb.pw44s.server.service.impl;

import br.edu.utfpr.pb.pw44s.server.DTO.OrderDTO;
import br.edu.utfpr.pb.pw44s.server.model.Address;
import br.edu.utfpr.pb.pw44s.server.model.Order;
import br.edu.utfpr.pb.pw44s.server.model.User;
import br.edu.utfpr.pb.pw44s.server.repository.AddressRepository;
import br.edu.utfpr.pb.pw44s.server.repository.OrderRepository;
import br.edu.utfpr.pb.pw44s.server.repository.UserRepository;
import br.edu.utfpr.pb.pw44s.server.service.IOrderService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class OrderServiceImpl extends CrudServiceImpl<Order, Long> implements IOrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final AddressRepository addressRepository;

    public OrderServiceImpl(OrderRepository orderRepository, UserRepository userRepository, AddressRepository addressRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.addressRepository = addressRepository;
    }

    @Override
    protected JpaRepository<Order, Long> getRepository() {
        return orderRepository;
    }

    @Override
    public List<Order> findAllByUserId(Long userId){ return this.orderRepository.findAllByUserId(userId); }

    @Override
    public Order findOrderById(Long id){ return this.orderRepository.findOrderById(id); }

}
