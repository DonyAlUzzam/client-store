import React, {useLocation} from 'react'
import {NavLink} from 'react-router-dom'

function Sidebar(props) {
    return (
        <React.Fragment>
            <aside className="left-sidebar" data-sidebarbg="skin6">
                <div className="scroll-sidebar" data-sidebarbg="skin6">
                    <nav className="sidebar-nav">

                        <ul id="sidebarnav">
                            <li className={(
                                    window.location.pathname == '/')
                                    ? 'sidebar-item selected'
                                    : 'sidebar-item'}>
                                <NavLink className="sidebar-link" aria-expanded="false" to="/"><i data-feather="shopping-bag" className="feather-icon"/>
                                    <span className="hide-menu">Store</span>
                                </NavLink>
                            </li>
                            <li className="list-divider"/>
                            <li className="nav-small-cap">
                                <span className="hide-menu">Trasaction</span>
                            </li>
                            <li className={(
                                    window.location.pathname == '/mypurchase')
                                    ? 'sidebar-item selected'
                                    : 'sidebar-item'}>
                                <NavLink className="sidebar-link" aria-expanded="false" to="/mypurchase"><i data-feather="credit-card" className="feather-icon"/>
                                    <span className="hide-menu">My Purchase</span>
                                </NavLink>
                            </li>
                            <li className="nav-small-cap">
                                <span className="hide-menu">Data</span>
                            </li>
                            <li
                                className={(
                                    window.location.pathname == '/category' || window.location.pathname == '/categorycreate')
                                    ? 'sidebar-item selected'
                                    : 'sidebar-item'}>
                                <NavLink className="sidebar-link" aria-expanded="false" to="/category"><i data-feather="file-text" className="feather-icon"/>
                                    <span className="hide-menu">Category</span>
                                </NavLink>
                            </li>
                            <li className={(
                                    window.location.pathname == '/book')
                                    ? 'sidebar-item selected'
                                    : 'sidebar-item'}>
                                <NavLink className="sidebar-link" aria-expanded="false" to="/book"><i data-feather="book" className="feather-icon"/>
                                    <span className="hide-menu">Book</span>
                                </NavLink>
                            </li>
                            <li className={(
                                    window.location.pathname == '/trasaction')
                                    ? 'sidebar-item selected'
                                    : 'sidebar-item'}>
                                <NavLink className="sidebar-link" aria-expanded="false" to="/trasaction"><i data-feather="archive" className="feather-icon"/>
                                    <span className="hide-menu">Transaction</span>
                                </NavLink>
                            </li>
                            <li className={(
                                    window.location.pathname == '/user'  || window.location.pathname == '/usercreate')
                                    ? 'sidebar-item selected'
                                    : 'sidebar-item'}>
                                <NavLink className="sidebar-link" aria-expanded="false" to="/user"><i data-feather="users" className="feather-icon"/>
                                    <span className="hide-menu">User</span>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </React.Fragment>
    )
}

export default Sidebar;