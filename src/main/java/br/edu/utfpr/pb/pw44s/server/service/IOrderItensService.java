package br.edu.utfpr.pb.pw44s.server.service;

import br.edu.utfpr.pb.pw44s.server.model.OrderItens;

import java.util.List;


public interface IOrderItensService extends ICrudService<OrderItens, Long> {
    List<OrderItens> findAllByOrderId(Long orderId);
    List<OrderItens> saveAll(List<OrderItens> orderItens);
}
