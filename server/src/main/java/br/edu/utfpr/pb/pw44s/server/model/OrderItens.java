package br.edu.utfpr.pb.pw44s.server.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "tb_order_itens")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderItens {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    private Order order;

    @ManyToOne
    private Product product;
    private double quantity;
    private BigDecimal unit_price;
}
