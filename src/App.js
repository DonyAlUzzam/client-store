import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css'
import "./assets/resitdc/css/resitdc.css";
import Core from './components/Template/Core'
import Login from './components/Pages/Auth/Login'
import Register from './components/Pages/Auth/Register'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <BrowserRouter>
      <ToastContainer/>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" component={Core} />
      </Switch>
    </BrowserRouter> 
  );
}

export default App;
