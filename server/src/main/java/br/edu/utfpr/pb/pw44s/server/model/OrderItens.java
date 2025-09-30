package br.edu.utfpr.pb.pw44s.server.model;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
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
    @JoinColumn(name = "order_id")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    private Order order;

    @ManyToOne
    private Product product;
    private double quantity;
    private BigDecimal unit_price;

    public BigDecimal getTotalPrice() {
        return unit_price.multiply(BigDecimal.valueOf(quantity));
    }
}
