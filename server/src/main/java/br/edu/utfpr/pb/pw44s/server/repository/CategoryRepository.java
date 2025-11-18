package br.edu.utfpr.pb.pw44s.server.repository;

import br.edu.utfpr.pb.pw44s.server.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findByNameContaining(String name);

    List<Category> findByNameStartingWith(String name);

   // @Query(value = "Select * from tb_category where name LIKE :name", nativeQuery = true)
   // List<Category> findByMeuFind(String name);


}
