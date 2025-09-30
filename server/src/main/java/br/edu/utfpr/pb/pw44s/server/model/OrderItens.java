package br.edu.utfpr.pb.pw44s.server.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.GetMapping;

import java.math.BigDecimal;
import java.util.List;

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
    @JsonIgnore
    private Order order;

    @ManyToOne
    private Product product;
    private double quantity;
    private BigDecimal unit_price;

    public BigDecimal getTotalPrice() {
        return unit_price.multiply(BigDecimal.valueOf(quantity));
    }
}
