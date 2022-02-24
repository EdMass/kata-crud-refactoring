package co.com.sofka.crud.repository;

import co.com.sofka.crud.models.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
}
