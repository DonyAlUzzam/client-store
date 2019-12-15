import React, {useState, useEffect} from 'react'
import {NavLink, Redirect} from 'react-router-dom'
import axios from 'axios'
import BlockUi from 'react-block-ui'
import 'react-block-ui/style.css'
import {toast} from 'react-toastify'

function Login() {
    const userData = window.localStorage.getItem('userData') ? JSON.parse(window.localStorage.getItem('userData')) : ''
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const processLogin = async () => {
        setLoading(true)
        const request = await axios.post(
            process.env.REACT_APP_API_URL + '/users/login',
            {email, password}
        )
        setLoading(false)
        if (request.data.status) {
            toast.success(request.data.message, {position: toast.POSITION.TOP_CENTER});
            window.localStorage.setItem('userData', JSON.stringify(request.data))
            setTimeout(function () {
                window.location.href = '/'
            }, 3000)
        } else {
            toast.error(request.data.message, {position: toast.POSITION.TOP_CENTER});
        }
    }

    useEffect(() => {
        if(userData){
            window.location.href = '/'
        }
    },[]) 

    return (
        <div className="main-wrapper">
            <div
                className="auth-wrapper d-flex no-block justify-content-center align-items-center position-relative"
                style={{
                    background: 'url(../assets/images/big/bookback.jpg) no-repeat center center'
                }}>
                <div className="auth-box row">
                    <div
                        className="col-lg-7 col-md-5 modal-bg-img"
                        style={{
                            backgroundImage: 'url(../assets/images/big/bookstore.png)'
                        }}></div>
                    <div className="col-lg-5 col-md-7 bg-white">
                        <div className="p-3">
                            <div className="text-center">
                                <img src="../assets/images/big/avatar.png" style={{ width:50, height:50}} alt="wrapkit"/>
                            </div>
                            <h2 className="mt-3 text-center">Login</h2>
                            <p className="text-center">To access Book Store web app.</p>
                            <BlockUi tag="div" blocking={loading}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label className="text-dark">Email</label>
                                            <input
                                                className="form-control"
                                                type="email"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                placeholder="enter your email"/>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label className="text-dark">Password</label>
                                            <input
                                                className="form-control"
                                                type="password"
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                                placeholder="enter your password"/>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 text-center">
                                        <button type="submit" className="btn btn-block btn-dark" onClick={processLogin}>Login</button>
                                    </div>
                                    <div className="col-lg-12 text-center mt-5">
                                        Don't have an account?<NavLink className="text-danger" to="/register">Register</NavLink>
                                    </div>
                                </div>
                            </BlockUi>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login;