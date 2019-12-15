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
    const [group_name, setGroupName] = useState('')
    const [loading, setLoading] = useState(false)
    const [goto, setGoto] = useState(false)
    axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`
    }
    const saveData = async () => {
        setLoading(true)
        const request = await axios.patch(
            process.env.REACT_APP_API_URL + '/group',
            {group_name, id:props.match.params.id}
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
    }
    const resetData = async () => {
        setGroupName('')
    }
    const setFormData = async () => {
        const request = await axios.get(
            process.env.REACT_APP_API_URL + '/group/'+props.match.params.id,
            {group_name}
        )
        if (request.data.status) {
            setGroupName(request.data.data.group_name)
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
                    ? (<Redirect to='/group'/>)
                    : ''
            }
            <div className="col-12">
                <div className="card">

                    <div className="card-body">
                        <div className="border-bottom">
                            <h4 className="card-title">Edit Group</h4>
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
                                            <label>Group Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={group_name}
                                                onChange={e => setGroupName(e.target.value)}
                                                placeholder="Group Name"/>
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