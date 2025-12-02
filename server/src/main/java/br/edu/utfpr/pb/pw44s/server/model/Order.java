package br.edu.utfpr.pb.pw44s.server.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "tb_order")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private LocalDateTime data;
    private BigDecimal freight;       // Valor do frete
    private String paymentMethod;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;

    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"order"})
    private List<OrderItens> items;

    @Transient
    public BigDecimal getTotalOrder() {
        BigDecimal totalItems = BigDecimal.ZERO;
        if (items != null && !items.isEmpty()) {
            totalItems = items.stream()
                    .map(OrderItens::getTotalPrice)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
        }
        // Soma o frete ao total se existir
        return totalItems.add(freight != null ? freight : BigDecimal.ZERO);
    }
}
