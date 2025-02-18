package co.com.sofka.crud.service;

import co.com.sofka.crud.dto.TodoDto;
import co.com.sofka.crud.dto.TodoListDto;
import co.com.sofka.crud.exception.NotFoundIdException;
import co.com.sofka.crud.exception.TodoBusinessException;
import co.com.sofka.crud.models.Todo;
import co.com.sofka.crud.models.TodoList;
import co.com.sofka.crud.repository.TodoListRepository;
import co.com.sofka.crud.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class TodoListServices {

    public static final String NO_FAULT_ID = "No existe el Id de la Lista";
    private TodoListRepository todoListRepository;
    private TodoRepository todoRepository;

    @Autowired
    public TodoListServices(TodoListRepository todoListRepository, TodoRepository todoRepository) {
        this.todoListRepository = todoListRepository;
        this.todoRepository = todoRepository;
    }

    public Set<TodoDto> getTodoByListId(Long id){
        return todoListRepository.findById(id)
                .orElseThrow(() -> new NotFoundIdException(NO_FAULT_ID))
                .getTodos().stream()
                .map(item -> new TodoDto(item.getId(), item.getName(), item.isCompleted(), id))
                .collect(Collectors.toSet());
    }

    public TodoDto addNewTodoByListId(Long listId, TodoDto aTodoDto){
        var listTodo = todoListRepository.findById(listId)
                .orElseThrow(() -> new NotFoundIdException(NO_FAULT_ID));
        var todo = new Todo();

        todo.setCompleted(aTodoDto.isCompleted());
        todo.setName(Objects.requireNonNull(aTodoDto.getName()));
        todo.setId(aTodoDto.getId());

        if(todo.getName().isEmpty() || todo.getName().length() < 3){
            throw new TodoBusinessException("No valid entity To-Do to be save");
        }

        //adicion de un nuevo to-do
        listTodo.getTodos().add(todo);

        var listUpdated = todoListRepository.save(listTodo);

        //Ultimo item
        var lastTodo = listUpdated.getTodos().stream()
                .max(Comparator.comparingInt(item -> item.getId().intValue()))
                .orElseThrow();
        aTodoDto.setId(lastTodo.getId());
        aTodoDto.setGroupListId(listId);
        return aTodoDto;
    }

    public TodoDto updateATodoListById(Long listId, TodoDto aTodoDto){
        var listTodo = todoListRepository.findById(listId)
                .orElseThrow(() -> new NotFoundIdException(NO_FAULT_ID));

        //Editar to-do
        for(var item : listTodo.getTodos()){
            if(item.getId().equals(aTodoDto.getId())){
                item.setCompleted(aTodoDto.isCompleted());
                item.setName(Objects.requireNonNull(aTodoDto.getName()));
                item.setId(Objects.requireNonNull(aTodoDto.getId()));
            }
        }
        todoListRepository.save(listTodo);

        return aTodoDto;
    }

    public TodoListDto newListTodo(TodoListDto atodoListDto){
        var listTodo = new TodoList();
        listTodo.setName(Objects.requireNonNull(atodoListDto.getName()));
        if(listTodo.getName().isEmpty() || listTodo.getName().length() < 3){
            throw new TodoBusinessException("No valid entity List to-do to be save");
        }
        var id = todoListRepository.save(listTodo).getId();
        atodoListDto.setId(id);
        return atodoListDto;
    }

    public  Set<TodoListDto> getAllListTodo(){
        return StreamSupport
                .stream(todoListRepository.findAll().spliterator(), false).map(todoList -> {
                    var listDto = todoList.getTodos()
                            .stream()
                            .map(item -> new TodoDto(item.getId(), item.getName(), item.isCompleted()))
                            .collect(Collectors.toSet());
                    return new TodoListDto(todoList.getId(), todoList.getName()); //listDto
                })
                .collect(Collectors.toSet());
    }

    public void deleteListById(Long listId){
        var listTodo = todoListRepository.findById(listId)
                .orElseThrow(() -> new NotFoundIdException(NO_FAULT_ID));
        todoListRepository.delete(listTodo);
    }

    public void deleteATodoById(Long id){
        var todo = todoRepository.findById(id).orElseThrow();
        todoRepository.delete(todo);
    }
}
