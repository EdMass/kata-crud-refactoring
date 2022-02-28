import React, { createContext, useReducer } from 'react'
import Reducers from './reducers/Reducers';

const initialState = {
    list: {
        elements: []
    },
    todo: { 
        elements: [],
        item: {}
    },
    mensage: {}
  }
  
  const Store = createContext(initialState)
  const listReducer = {...Reducers()}

  function reducer(state, action){

      console.log("dispatch =>", action.type)      
      return listReducer[action.type] ? listReducer[action.type](state, action) : state
  }

  export const StoreProvider = ({children}) => {
      const [state, dispatch] = useReducer(reducer, initialState)
      return <Store.Provider value={{state, dispatch}}>
          {children}
      </Store.Provider>
  }

  export default Store;

