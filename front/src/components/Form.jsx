import React, { useRef, useState, useContext } from 'react'
import Events from '../reducers/Events';
import ConexionTodo from './ConexionTodo';
import Store from "../Store"

const Form = ({listId, todo}) => {
    const formRef = useRef(null);
    const { dispatch } = useContext(Store);
    const item = todo.item[listId] ? todo.item[listId] :{}
    const [state, setState] = useState(item);

    const onAdd = (event) => {
      event.preventDefault();
  
      const request = {
        name: state.name,
        id: null,
        completed: false
      };
  
      ConexionTodo.save(listId, request).then((response) => {
        if(response.ok){
          response.json().then((result) => {
            console.log(result)
            dispatch(Events.savedItem(listId, result))
            setState({name: ""})
            formRef.current.reset()
          })
        }
      })     
        
    }
  
    const onEdit = (event) => {
      event.preventDefault();
  
      const request = {
        name: state.name,
        id: item.id,
        isCompleted: item.isCompleted
      };
      
      ConexionTodo.update(listId, request).then((response) => {
        if(response.ok){
          response.json().then((result) => {
            dispatch(Events.updatedItem(listId, result))
            setState({name: ""})
            formRef.current.reset()
          })
        }
      })
  
      
    }
  
    return <form ref={formRef} >
      <input
        type="text"
        name="name"
        className='form-control mb-2'
        placeholder="¿Qué planeas hacer hoy?"
        defaultValue={item.name}
        onChange={(event) => {
          setState({ ...state, name: event.target.value })
        }}  />
      {item.id && <button className="btn btn-danger me-2" onClick={onEdit}>Actualizar</button>}
      {!item.id && <button className="btn btn-warning" onClick={onAdd} type="submit" >Crear</button>}
    </form>
  }

export default Form