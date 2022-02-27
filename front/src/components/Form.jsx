import React, { useRef, useState, useContext } from 'react'


const Form = (props) => {
    const formRef = useRef(null);
    const { dispatch, state: { todo } } = useContext(props.Store);
    const item = todo.item;
    const [state, setState] = useState(item);
  
    const onAdd = (event) => {
      event.preventDefault();
  
      const request = {
        name: state.name,
        id: null,
        completed: false
      };
  
  
      fetch(props.HOST_API+ "/todo", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then((todo) => {
          dispatch({ type: "add-item", item: todo });
          setState({ name: "" });
          formRef.current.reset();
        });
    }
  
    const onEdit = (event) => {
      event.preventDefault();
  
      const request = {
        name: state.name,
        id: item.id,
        isCompleted: item.isCompleted
      };
  
  
      fetch(props.HOST_API + "/todo", {
        method: "PUT",
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then((todo) => {
          dispatch({ type: "update-item", item: todo });
          setState({ name: "" });
          formRef.current.reset();
        });
    }
  
    return <form ref={formRef}>
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