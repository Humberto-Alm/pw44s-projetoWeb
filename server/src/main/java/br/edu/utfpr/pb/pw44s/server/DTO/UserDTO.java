package br.edu.utfpr.pb.pw44s.server.DTO;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {

    private Long id;

    @NotNull(message = "O nome de usuário é obrigatório")
    @Size(min = 4, max = 50, message = "O nome de usuário deve ter entre 4 e 50 caracteres")
    private String username;

    @NotNull(message = "O nome completo é obrigatório")
    @Size(min = 4, max = 50, message = "O nome completo deve ter entre 4 e 50 caracteres")
    private String displayName;

    @NotNull(message = "A senha é obrigatória")
    @Size(min = 6, message = "A senha deve ter no mínimo 6 caracteres")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$",
            message = "A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número")
    private String password;

    @NotNull(message = "O CPF é obrigatório")
    @Size(min = 11, max = 14, message = "O CPF deve ter 11 ou 14 caracteres")
    private String cpf;

    @NotNull(message = "O telefone é obrigatório")
    @Size(min = 10, max = 15, message = "O telefone deve ser válido")
    private String telefone;
}