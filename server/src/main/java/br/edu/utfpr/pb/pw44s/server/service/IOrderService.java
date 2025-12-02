package br.edu.utfpr.pb.pw44s.server.service;

import br.edu.utfpr.pb.pw44s.server.model.Order;
import br.edu.utfpr.pb.pw44s.server.model.User;

import java.util.List;

public interface IOrderService extends ICrudService<Order, Long> {

    List<Order> findAllByUserId(Long userId);
    Order findOrderById(Long id);
}