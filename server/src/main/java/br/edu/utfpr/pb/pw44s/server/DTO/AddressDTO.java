package br.edu.utfpr.pb.pw44s.server.DTO;

import br.edu.utfpr.pb.pw44s.server.model.User;
import lombok.Data;

@Data
public class AddressDTO {
    private long id;
    private User user;
    private String city;
    private String logradouro;
    private String numero;
    private String bairro;
    private String complemento;
    private String cep;
    private String title;
}