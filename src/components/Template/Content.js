import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Footer from './Footer'
import Home from '../Pages/Home/Index.js'
import HomeDetail from '../Pages/Home/Detail.js'
import Category from '../Pages/Category/Index.js'
import CategoryCreate from '../Pages/Category/Create.js'
import CategoryEdit from '../Pages/Category/Edit.js'
import User from '../Pages/User/Index.js'
import UserCreate from '../Pages/User/Create.js'
import UserEdit from '../Pages/User/Edit.js'
import Book from '../Pages/Book/Index.js'
import BookCreate from '../Pages/Book/Create.js'
import BookEdit from '../Pages/Book/Edit.js'


function Content () {
    return(
        <div className="page-wrapper">
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/homedetail/:id"  component={HomeDetail} />

                {/* category */}
                <Route path="/category" component={Category} />
                <Route path="/categorycreate" component={CategoryCreate} />
                <Route path="/categoryedit/:id" component={CategoryEdit} />

                {/* user */}
                <Route path="/user" component={User} />
                <Route path="/usercreate" component={UserCreate} />
                <Route path="/useredit/:id" component={UserEdit} />

                {/* book */}
                <Route path="/book" component={Book} />
                <Route path="/bookcreate" component={BookCreate} />
                <Route path="/bookedit/:id" component={BookEdit} />

            </Switch>
            <Footer />  
        </div>
    )
}

export default Content;