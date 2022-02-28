import React, { useRef, useState, useContext } from 'react'
import ConexionList from './ConexionList';
import EventsList from './EventsList';
import Store from '../Store';
 

export default () => {
    const formRef = useRef(null);
    const { dispatch } = useContext(Store);
    const [state, setState] = useState({name: ""});
    

    const OnCreate = (e) => {
        e.preventDefault();
        ConexionList.save({name: state.name, id: null})
            .then((response) => {
                if(response.ok) {
                    response.json().then((newList) => {
                        dispatch(EventsList.saved(newList));
                        formRef.current.reset();
                        setState({name: ""})
                    })
                }
            })
    };

    return <form ref={formRef}>
        <input 
            type="text" 
            name='name'
            className='form-control mb-2'
            placeholder='Lista de To-Dos'
            onChange={(e) => {
                setState({name: e.target.value})
            }}
        />
        <button className="btn btn-warning me-2" onClick={OnCreate}>Nueva Lista</button>
    </form>

}