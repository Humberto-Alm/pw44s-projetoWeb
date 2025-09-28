package br.edu.utfpr.pb.pw44s.server.DTO;

import br.edu.utfpr.pb.pw44s.server.model.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItensDTO {
    private long id;
    private Product product;
    private double quantity;
    private BigDecimal unit_price;
}
