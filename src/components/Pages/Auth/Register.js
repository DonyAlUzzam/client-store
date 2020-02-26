import React, {useState} from 'react'
import {NavLink, Redirect} from 'react-router-dom'
import axios from 'axios'
import BlockUi from 'react-block-ui'
import 'react-block-ui/style.css'
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import {toast} from 'react-toastify'



const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    }
  }));
  
function Register() {

    const classes = useStyles();
   
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [avatar, setAvatar] = useState("")
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [goto, setGoto] = useState(false)

    const processRegister = async (e) => {
        e.preventDefault()
        const full_name = first_name+' '+last_name
        const formData = new FormData()
        formData.append('avatar',avatar)
        formData.append('first_name',first_name)
        formData.append('last_name',last_name)
        formData.append('full_name',full_name)
        formData.append('email',email)
        formData.append('password',password)
        formData.append('role',role)
        
        setLoading(true)
        const request = await axios.post(
            process.env.REACT_APP_API_URL + 'users/register',formData
        )
        setLoading(false)
        if (request.data.status) {
            toast.success(request.data.message, {position: toast.POSITION.TOP_CENTER});
            setTimeout(function () {
                setGoto(true)
            }, 3000);

        } else {
            toast.error(request.data.message, {position: toast.POSITION.TOP_CENTER});
        }
    }

    return (
        <div className="main-wrapper">
            {
                goto
                    ? (<Redirect to='/login'/>)
                    : ''
            }
            <div
                className="auth-wrapper d-flex no-block justify-content-center align-items-center position-relative"
                style={{
                    background: 'url(../assets/images/big/bookback.jpg) no-repeat center center'
                }}>
                <div className="auth-box row text-center">
                    <div
                        className="col-lg-7 col-md-5 modal-bg-img"
                        style={{
                            backgroundImage: 'url(../assets/images/big/bookstore.png)'
                        }}></div>
                    <div className="col-lg-5 col-md-7 bg-white">
                        <div className="p-3">
                        <img src="../assets/images/big/avatar.png" style={{ width:50, height:50}} alt="wrapkit"/>
                            <h2 className="mt-3 text-center">Register</h2>
                            <p className="text-center">Create your account here.</p>
                            <BlockUi tag="div" blocking={loading}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="text"
                                                value={first_name}
                                                onChange={e => setFirstName(e.target.value)}
                                                placeholder="your firts name"/>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="text"
                                                value={last_name}
                                                onChange={e => setLastName(e.target.value)}
                                                placeholder="your last name"/>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="email"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                placeholder="email address"/>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="password"
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                                placeholder="password"/>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <input
                                              className="form-control"
                                              variant="outlined"
                                              margin="normal"
                                              required
                                              fullWidth
                                              name="upload"
                                              type="file"
                                              onChange={event=>setAvatar(event.target.files[0])}
                                              id="file"
                                              inputProps={{ accept: 'images/jpeg, images/jpg, images/png' }}/>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                        <Select
                                            className="form-control"
                                            native
                                            value={role}
                                            onChange={e => setRole(e.target.value)}
                                            // inputProps={{
                                            //     name: 'age',
                                            //     id: 'age-native-simple',
                                            // }}
                                            >
                                            <option value={'5e51340738159d1ae69d01c4'}>Admin</option>
                                            <option value={'5e51340d38159d1ae69d01c5'}>User</option>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 text-center">
                                        <button
                                            type="submit"
                                            className="btn btn-block btn-dark"
                                            onClick={processRegister}>Register</button>
                                    </div>
                                    <div className="col-lg-12 text-center mt-5">
                                        Already have an account?
                                        <NavLink className="text-danger" to="/login">Login</NavLink>
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

export default Register;