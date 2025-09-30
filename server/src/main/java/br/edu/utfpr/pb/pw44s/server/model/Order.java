package br.edu.utfpr.pb.pw44s.server.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "tb_order")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private LocalDateTime data;

    @ManyToOne
    private User user;

    @ManyToOne
    private Address address;

    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"order"})
    private List<OrderItens> items;

    // Campo calculado - não é persistido no banco
    @Transient
    public BigDecimal getTotalOrder() {
        if (items == null || items.isEmpty()) {
            return BigDecimal.ZERO;
        }
        return items.stream()
                .map(OrderItens::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }


}
