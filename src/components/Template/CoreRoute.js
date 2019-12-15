import React from 'react'
import {BrowserRouter, Route, NavLink, Switch} from 'react-router-dom'
import Login from './../../components/Pages/Auth/Login'
import Register from './../../components/Pages/Auth/Register'
import Core from './Core'

function CoreRoute () {
    return(
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" component={Core} />
        </Switch>
    )
}

export default CoreRoute;