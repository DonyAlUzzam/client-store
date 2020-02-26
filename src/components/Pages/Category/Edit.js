import React, {useEffect,useState} from 'react'
import {NavLink, Redirect} from 'react-router-dom'
import axios from 'axios'
import BlockUi from 'react-block-ui'
import 'react-block-ui/style.css'
import {toast} from 'react-toastify'

function Edit(props) {
    const userData = window
        .localStorage
        .getItem('userData')
            ? JSON.parse(window.localStorage.getItem('userData'))
            : {}
    const [category_name, setCategoryName] = useState('')
    const [loading, setLoading] = useState(false)
    const [goto, setGoto] = useState(false)
    axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`
    }
    const saveData = async () => {
        if(userData.role.role === 'admin'){
            setLoading(true)
            const request = await axios.patch(
                process.env.REACT_APP_API_URL + 'category/'+props.match.params.id,
                {category_name}
            )
            setLoading(false)
            if (request.data.status) {
                toast.success(request.data.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000
                });
                setTimeout(function () {
                    setGoto(true)
                }, 2000);

            } else {
                toast.error(request.data.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000
                });
            }
        }else{
            toast.error("Not Authorization", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000
            });
            setLoading(false)
        }
        
    }
    const resetData = async () => {
        setCategoryName('')
    }
    const setFormData = async () => {
        const request = await axios.get(
            process.env.REACT_APP_API_URL + 'category/'+props.match.params.id,
            {category_name}
        )
        if (request.status) {
            setCategoryName(request.data.data[0].category_name)
        } else {
            toast.error(request.data.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000
            });
        }
    }
    useEffect(() => {
        setFormData()
    }, [])
    return (
        <div
            className="row"
            style={{
                paddingLeft: 15,
                paddingRight: 15
            }}>
            {
                goto
                    ? (<Redirect to='/category'/>)
                    : ''
            }
            <div className="col-12">
                <div className="card">

                    <div className="card-body">
                        <div className="border-bottom">
                            <h4 className="card-title">Edit Category</h4>
                        </div>

                        <div
                            className="form-body"
                            style={{
                                marginTop: 20
                            }}>
                            <BlockUi tag="div" blocking={loading}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Category Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={category_name}
                                                onChange={e => setCategoryName(e.target.value)}
                                                placeholder="Category Name"/>
                                        </div>
                                    </div>
                                </div>
                            </BlockUi>
                        </div>
                        <div className="form-actions">
                            <div className="text-right">
                                <button
                                    type="submit"
                                    className="btn btn-info"
                                    onClick={saveData}
                                    style={{
                                        marginRight: 5
                                    }}>Submit</button>
                                <button type="reset" onClick={resetData} className="btn btn-dark">Reset</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Edit;