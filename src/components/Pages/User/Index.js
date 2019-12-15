import React, {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import MUIDataTable from "mui-datatables";
import axios from 'axios'
import {toast} from 'react-toastify'

function User() {
    const userData = window
        .localStorage
        .getItem('userData')
            ? JSON.parse(window.localStorage.getItem('userData'))
            : {}
    const [data, setData] = useState([])
    const columns = [
        {
            name: "name",
            label: "Name",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "email",
            label: "Email",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "group",
            label: "Group",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "creation_date",
            label: "Creation Date",
            options: {
                filter: true,
                sort: true
            }
        }, {
            name: "action",
            label: "Action",
            options: {
                filter: false,
                sort: false
            }
        }
    ];

    const options = {
        filterType: 'checkbox',
        selectableRows: false
    };

    axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`
    }
    async function getData() {
        const request = await axios.get(
            process.env.REACT_APP_API_URL + '/user'
        )
        const result = []
        request
            .data
            .data
            .map(function (item, index) {
                result.push({
                    name: item.name,
                    email: item.email,
                    group: item.group,
                    creation_date: new Date(item.createdAt).toISOString().slice(0,10),
                    action: <React.Fragment>
                            <NavLink
                                className="btn btn-warning"
                                style={{
                                    marginRight: 5,
                                    color: 'white'
                                }}
                            to={'/useredit/'+item._id}>Edit</NavLink>
                            <button className="btn btn-danger" onClick={() => deleteData(item._id)}>
                                Delete
                            </button>
                        </React.Fragment>
                })
            })
        setData(result)
    }
    const deleteData = async id => {
        const requestdelete = await axios.delete(
            process.env.REACT_APP_API_URL + '/user/' + id
        )
        if (requestdelete.data.status) {
            toast.success(requestdelete.data.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            });
            getData()
        } else {
            toast.error(requestdelete.data.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000
            });
        }

    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <div classname="row" style={{
                marginLeft: 5
            }}>
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <NavLink className="btn btn-primary float-left" to="/usercreate">Create New</NavLink>
                        <div className="table-responsive">
                            <MUIDataTable
                                title={"Data User"}
                                data={data}
                                columns={columns}
                                options={options}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default User;