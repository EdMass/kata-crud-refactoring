import React, { createContext } from 'react';
import Form from './components/Form';
import List from './components/List';
import StoreProvider from './components/StoreProvider';


export const HOST_API = "http://localhost:8080/api";



const initialState = {
  todo: { list: [], item: {} }
};

const Store = createContext(initialState)


function App() {
  return (
    <> 
    <StoreProvider Store={Store} initialState={initialState}>
      <h3>To-Do List</h3>
      <Form HOST_API={HOST_API} Store={Store} />
      <List Store={Store} />
    </StoreProvider>
    </>)
}

export default App;
