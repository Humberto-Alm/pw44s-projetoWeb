package br.edu.utfpr.pb.pw44s.server.DTO;

import br.edu.utfpr.pb.pw44s.server.model.Address;
import br.edu.utfpr.pb.pw44s.server.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
    private long id;
    private LocalDateTime data;
    private User user;
    private Address address;
    private List<OrderItemCreateDTO> items;
    private BigDecimal total;
}