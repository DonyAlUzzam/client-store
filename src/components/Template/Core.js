import {BrowserRouter, Route, NavLink, Switch, Redirect} from 'react-router-dom'
import React, {useState, useEffect }  from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Content from './Content'

function Core () {
  const userData = window.localStorage.getItem('userData') ? JSON.parse(window.localStorage.getItem('userData')) : false
  const [goto, setGoto] = useState('')
  useEffect(() => {
    if(!userData){
      setGoto(<Redirect to='/login'/>)
    }
  },[]) 
    return(
        <div id="main-wrapper" data-theme="light" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed" data-boxed-layout="full">
            {goto}
            <Header userData={userData} />
            <Content/>
            <Sidebar />
        </div>
    )
}

export default Core;