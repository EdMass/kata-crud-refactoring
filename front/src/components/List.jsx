import React, {useContext, useEffect, useState} from 'react'
import Store from "../Store"
import ConexionTodo from './ConexionTodo';
import Events from '../reducers/Events';

const List = ({listId, todo}) => {
    const { dispatch } = useContext(Store);
    const [loaded, setLoaded] = useState(false)
    const list = todo.elements.filter((element) => {
      console.log(element)
      return element.groupListId === listId
    })    
  
    useEffect(() => {
      ConexionTodo.findAll(listId).then((response) => {
        if(response.ok){
          response.json().then((items) => {
            console.log("Successful To do")
            setLoaded(true)
            dispatch(Events.findedItem(listId, items));
          })
        }
      })
    }, [listId, dispatch]);
  
  
    const onDelete = (itemId) => {
      ConexionTodo.delete(itemId).then((response) =>{
        if(response.ok){
          dispatch(Events.deletedItem(listId, itemId))
        }
      })
    };
  
    const onEdit = (item) => {
      dispatch(Events.onEditedItem(listId, item))
    };
  
    const onChange = (event, item) => {
      const request = {
        name: item.name,
        id: item.id,
        completed: event.target.checked
      };
      ConexionTodo.update(listId, request).then((response) => {
        if(response.ok){
          response.json().then(() => {
            dispatch(Events.updatedItem(listId, request))
          })
        }
      })
    };
  
    const decorationDone = {
      textDecoration: 'line-through'
    };
    return <div>
      {!loaded && <div>Loading...</div> }
      <table >
        <thead>
          <tr>
            <td >ID</td>
            <td>Tarea</td>
            <td>¿Completado?</td>
          </tr>
        </thead>
        <tbody>
          {list.map((todo) => {
            return <tr key={todo.id} style={todo.completed ? decorationDone : {}}>
              <td>{todo.id}</td>
              <td>{todo.name}</td>
              <td>
                <input 
                  type="checkbox" 
                  defaultChecked={todo.completed}
                  onChange={(event) => onChange(event, todo)} />
              </td>
              <td><button className="btn btn-danger me-2" onClick={() => onDelete(todo.id)}>Eliminar</button></td>
              <td><button className="btn btn-warning" onClick={() => onEdit(todo)}>Editar</button></td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  }

export default List