import React from 'react';
import FormList from './components_list/FormList';
import ListCategory from './components_list/ListCategory';
import { StoreProvider } from './Store';


export const HOST_API = "http://localhost:8080/api";



function App() {
  return (
    <> 
    <h3>To-Do List</h3>
    
    <StoreProvider >
      <FormList />
      <p></p>
      <ListCategory />
      
    </StoreProvider>
    </>)
}

export default App;
