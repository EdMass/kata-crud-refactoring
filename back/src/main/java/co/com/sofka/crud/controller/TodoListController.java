package co.com.sofka.crud.controller;

import co.com.sofka.crud.dto.TodoDto;
import co.com.sofka.crud.dto.TodoListDto;
import co.com.sofka.crud.exception.NotFoundIdException;
import co.com.sofka.crud.service.TodoListServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class TodoListController {

    private TodoListServices todoListServices;

    @Autowired
    public TodoListController(TodoListServices todoListServices) {
        this.todoListServices = todoListServices;
    }

    @GetMapping(value = "api/list")
    public Iterable<TodoListDto> getAllListTodos(){
        return todoListServices.getAllListTodo();
    }

    @GetMapping(value = "api/{listId}/todos")
    public Iterable<TodoDto> getTodoByListId(@PathVariable("listId") Long listId){
        return todoListServices.getTodoByListId(listId);
    }

    @PostMapping(value = "api/todolist")
    public TodoListDto newListTodo(@RequestBody TodoListDto todoListDto){
        return todoListServices.newListTodo(todoListDto);
    }

    @DeleteMapping(value = "api/{id}/todolist")
    public void deleteListById(@PathVariable("id") Long id){
        todoListServices.deleteListById(id);
    }

    @PutMapping(value = "api/{listId}/todos")
    public TodoDto updateATodoByListId(@PathVariable("listId") Long listId, @RequestBody TodoDto todoDto){
        if(todoDto.getId() != null){
            return todoListServices.updateATodoListById(listId, todoDto);
        }
        throw new NotFoundIdException("No existe el Id, no se puede actualizar");
    }

    @PostMapping(value = "api/{listId}/todos")
    public TodoDto addNewTodoByListid(@PathVariable("listId") Long listId, @RequestBody TodoDto todoDto){
        return todoListServices.addNewTodoByListId(listId, todoDto);
    }

    @DeleteMapping(value = "api/{listId}/todos")
    public void deleteATodobyId(@PathVariable("listId") Long id){
         todoListServices.deleteATodoById(id);
    }
}
