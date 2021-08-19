import React from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import useLocalStorage from '../hooks/useLocalStorage';

const App = () => {

  const[id , setId] = useLocalStorage('id');

  console.log(id);

  return (
    id ? <Dashboard id={id} /> : <Login onIdSubmit={setId} />
  )
}

export default App;
