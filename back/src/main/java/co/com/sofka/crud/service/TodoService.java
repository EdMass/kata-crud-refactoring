package co.com.sofka.crud.service;

import co.com.sofka.crud.dto.TodoDto;
import co.com.sofka.crud.models.Todo;
import co.com.sofka.crud.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TodoService {

    @Autowired
    private TodoRepository repository;

    public List<TodoDto> list(){
        List <Todo> todos =repository.findAll();
        return todos.stream().map(item -> new TodoDto(item.getId(), item.getName(),
                item.isCompleted(), item.getGroupListId())).collect(Collectors.toList());
    }

    public TodoDto save(TodoDto todoDto){
        Todo todoOrigin = new Todo();
        todoOrigin.setName(todoDto.getName());
        todoOrigin.setCompleted(todoDto.isCompleted());
        todoOrigin.setGroupListId(todoDto.getGroupListId());
        Todo todo = repository.save(todoOrigin);
        todoDto.setId(todo.getId());
        return todoDto;
    }

    public void delete(Long id){
        repository.delete(repository.findById(id).orElseThrow());
    }

    public TodoDto get(Long id){
        Todo todo = repository.findById(id).orElseThrow();
        TodoDto todoDto = new TodoDto();
        todoDto.setId(todo.getId());
        todoDto.setName(todo.getName());
        todoDto.setCompleted(todo.isCompleted());
        todoDto.setGroupListId(todo.getGroupListId());
        return todoDto;
    }

}
