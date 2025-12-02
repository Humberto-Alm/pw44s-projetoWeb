package br.edu.utfpr.pb.pw44s.server.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FreightResponseDTO {
    private Double value;        // Preço do frete
    private Integer deliveryDays; // Dias para entrega
}