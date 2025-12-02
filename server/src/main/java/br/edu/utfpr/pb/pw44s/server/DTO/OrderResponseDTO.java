package br.edu.utfpr.pb.pw44s.server.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponseDTO {
    private long id;
    private LocalDateTime data;
    private UserDTO user;
    private AddressDTO address;
    private List<OrderItensResponseDTO> items;
    private BigDecimal total;
    private BigDecimal freight;
    private String paymentMethod;
}