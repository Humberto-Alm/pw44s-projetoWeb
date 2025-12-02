package br.edu.utfpr.pb.pw44s.server.DTO;

import br.edu.utfpr.pb.pw44s.server.model.Category;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CategoryDTO {

    private Long id;

    @NotNull
    @Size(min = 2, max = 50)
    private String name;

    public Category convertToEntity() {
        return new Category(this.id, this.name);
    }
}
