package br.edu.utfpr.pb.pw44s.server.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemCreateDTO {
    private Long productId;
    private double quantity;
    private BigDecimal unit_price;
}