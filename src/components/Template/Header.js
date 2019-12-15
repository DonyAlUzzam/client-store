import React, {useState} from 'react'
import axios from 'axios'

function Header(props) {
    
    const[name, setName] = useState(props.userData ? props.userData.data.name : '')
    const processLogout = async () => {
        await axios.post('http://localhost:3000/users/logout', {
            headers: {
            Authorization: `Bearer ${props.userData.token}`,
            },
        })
        window.localStorage.removeItem('userData')
        window.location.href = '/login'
    }
    return (
        <React.Fragment>
            <header className="topbar" data-navbarbg="skin6">
                <nav className="navbar top-navbar navbar-expand-md">
                    <div className="navbar-header" data-logobg="skin6">
                        <a className="nav-toggler waves-effect waves-light d-block d-md-none"><i className="ti-menu ti-close"/></a>
                        <div className="navbar-brand">
                            <a href="#">
                                <b className="logo-icon">
                                    <img src="/assets/images/icon-book.png" alt="homepage" style={{ width: 50, height: 50, }} className="dark-logo"/>
                                </b>
                                <span className="logo-text">
                                    <img src="/assets/images/text-book.png" alt="homepage" className="dark-logo"/>
                                </span>
                            </a>
                        </div>
                        <a
                            className="topbartoggler d-block d-md-none waves-effect waves-light"
                            data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"><i className="ti-more"/></a>
                    </div>
                    <div className="navbar-collapse collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav float-left mr-auto ml-3 pl-1"></ul>
                        <ul className="navbar-nav float-right ml-3 pl-1">
                            <li className="nav-item d-none d-md-block">
                                <a
                                    className="nav-link dropdown-toggle pl-md-3 position-relative"
                                    id="bell"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                    <span><i data-feather="shopping-cart" className="svg-icon"/></span>
                                    <span className="badge badge-primary notify-no rounded-circle">5</span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right mailbox animated bounceInDown">
                                    <ul className="list-style-none">
                                        <li>
                                            <div className="message-center notifications position-relative">
                                                {/* Message */}
                                                <a
                                                    
                                                    className="message-item d-flex align-items-center border-bottom px-3 py-2">
                                                    <div className="btn btn-danger rounded-circle btn-circle"><i data-feather="airplay" className="text-white"/></div>
                                                    <div className="w-75 d-inline-block v-middle pl-2">
                                                        <h6 className="message-title mb-0 mt-1">Luanch Admin</h6>
                                                        <span className="font-12 text-nowrap d-block text-muted">Just see the my new admin!</span>
                                                        <span className="font-12 text-nowrap d-block text-muted">9:30 AM</span>
                                                    </div>
                                                </a>
                                                {/* Message */}
                                                <a
                                                    
                                                    className="message-item d-flex align-items-center border-bottom px-3 py-2">
                                                    <span className="btn btn-success text-white rounded-circle btn-circle"><i data-feather="calendar" className="text-white"/></span>
                                                    <div className="w-75 d-inline-block v-middle pl-2">
                                                        <h6 className="message-title mb-0 mt-1">Event today</h6>
                                                        <span className="font-12 text-nowrap d-block text-muted text-truncate">Just a reminder that you have event</span>
                                                        <span className="font-12 text-nowrap d-block text-muted">9:10 AM</span>
                                                    </div>
                                                </a>
                                                {/* Message */}
                                                <a
                                                    
                                                    className="message-item d-flex align-items-center border-bottom px-3 py-2">
                                                    <span className="btn btn-info rounded-circle btn-circle"><i data-feather="settings" className="text-white"/></span>
                                                    <div className="w-75 d-inline-block v-middle pl-2">
                                                        <h6 className="message-title mb-0 mt-1">Settings</h6>
                                                        <span className="font-12 text-nowrap d-block text-muted text-truncate">You can customize this template as you want</span>
                                                        <span className="font-12 text-nowrap d-block text-muted">9:08 AM</span>
                                                    </div>
                                                </a>
                                                {/* Message */}
                                                <a
                                                    
                                                    className="message-item d-flex align-items-center border-bottom px-3 py-2">
                                                    <span className="btn btn-primary rounded-circle btn-circle"><i data-feather="box" className="text-white"/></span>
                                                    <div className="w-75 d-inline-block v-middle pl-2">
                                                        <h6 className="message-title mb-0 mt-1">Pavan kumar</h6>
                                                        <span className="font-12 text-nowrap d-block text-muted">Just see the my admin!</span>
                                                        <span className="font-12 text-nowrap d-block text-muted">9:02 AM</span>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li>
                                            <a className="nav-link pt-3 text-center text-dark" >
                                               <button className="btn btn-warning" style={{ color: "white" }}>Payment</button>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                    <img
                                        src="/assets/images/avatar.png"
                                        alt="user"
                                        className="rounded-circle"
                                        width={40}/>
                                    <span className="ml-2 d-none d-lg-inline-block">
                                        <span>Hello,</span>
                                        <span className="text-dark">{name}</span>
                                        <i data-feather="chevron-down" className="svg-icon"/></span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right user-dd animated flipInY">
                                    <a className="dropdown-item"><i data-feather="user" className="svg-icon mr-2 ml-1"/>
                                        My Profile</a>
                                    <div className="dropdown-divider"/>
                                    <button  className="dropdown-item" onClick={processLogout}><i data-feather="power" className="svg-icon mr-2 ml-1"/>Logout</button>  
                                </div>
                            </li>

                        </ul>
                    </div>
                </nav>
            </header>
        </React.Fragment>
    )
}

export default Header;