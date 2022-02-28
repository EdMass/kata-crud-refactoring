import React, { createContext } from 'react';
import Form from './components/Form';
import List from './components/List';
import StoreProvider from './components/StoreProvider';
import FormList from './components_list/FormList';


export const HOST_API = "http://localhost:8080/api";

const initialState = {
  todo: { list: [], item: {} }
};

const Store = createContext(initialState)


function App() {
  return (
    <> 
    <h3>To-Do List</h3>
    <FormList />
    <p></p>
    <StoreProvider Store={Store} initialState={initialState}>
      
      <Form Store={Store} />
      <List Store={Store} />
    </StoreProvider>
    </>)
}

export default App;
