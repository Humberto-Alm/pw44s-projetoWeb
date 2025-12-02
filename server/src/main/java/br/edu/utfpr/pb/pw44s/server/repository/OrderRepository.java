package br.edu.utfpr.pb.pw44s.server.repository;

import br.edu.utfpr.pb.pw44s.server.model.Order;
import br.edu.utfpr.pb.pw44s.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // Método usado pelo Controller (busca passando o objeto Usuário inteiro)
    List<Order> findByUser(User user);

    // Método usado pelo Service (busca passando apenas o ID do usuário)
    List<Order> findAllByUserId(Long id);
}