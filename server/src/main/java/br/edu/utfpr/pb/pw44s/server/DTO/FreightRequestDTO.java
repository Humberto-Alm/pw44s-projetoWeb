package br.edu.utfpr.pb.pw44s.server.DTO;

import lombok.Data;

@Data
public class FreightRequestDTO {
    private String cep;
    private Double totalValue; // Valor total do carrinho para o seguro
}