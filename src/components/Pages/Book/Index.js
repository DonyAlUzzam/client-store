import React, {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import MUIDataTable from "mui-datatables";
import axios from 'axios'
import {toast} from 'react-toastify'

function Book() {
    const userData = window
        .localStorage
        .getItem('userData')
            ? JSON.parse(window.localStorage.getItem('userData'))
            : {}
    const [data, setData] = useState([])
    const columns = [
        {
            name: "title",
            label: "Book Name",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "category",
            label: "Category",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "creation_user",
            label: "Creation User",
            options: {
                filter: true,
                sort: true
            }
        },{
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
            process.env.REACT_APP_API_URL + '/book'
        )
        const result = []
        request
            .data
            .data
            .map(function (item, index) {
                result.push({
                    title: item.title,
                    category: item.category.category_name,
                    creation_user: item.owner.name,
                    creation_date: new Date(item.createdAt).toISOString().slice(0,10),
                    action: <React.Fragment>
                            <NavLink
                                className="btn btn-warning"
                                style={{
                                    marginRight: 5,
                                    color: 'white'
                                }}
                            to={'/bookedit/'+item._id}>Edit</NavLink>
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
            process.env.REACT_APP_API_URL + '/book/' + id
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
                        <NavLink className="btn btn-primary float-left" to="/bookcreate">Create New</NavLink>
                        <div className="table-responsive">
                            <MUIDataTable
                                title={"Data Book"}
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

export default Book;