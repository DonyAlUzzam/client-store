import React, {useEffect, useState} from 'react'
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
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [publisher, setPublisher] = useState('')
    const [author, setAuthor] = useState('')
    const [category, setCategory] = useState('')
    const [stock, setStock] = useState('')
    const [owner, setOwner] = useState('')
    const [dataCategory, setDataCategory] = useState([])
    const [loading, setLoading] = useState(false)
    const [goto, setGoto] = useState(false)
    axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`
    }
    const saveData = async () => {
        setLoading(true)
        const request = await axios.patch(
            process.env.REACT_APP_API_URL + '/book',
            {title, description, category, stock, owner, publisher, author, id:props.match.params.id}
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
        setTitle('')
        setDescription('')
        setStock('')
        setPublisher('')
        setAuthor('')
    }
    async function getDataCategory() {
        const request = await axios.get(
            process.env.REACT_APP_API_URL + '/category'
        )
        setDataCategory(request.data.data)
    }
    const setFormData = async () => {
        const request = await axios.get(
            process.env.REACT_APP_API_URL + '/book/'+props.match.params.id
        )
        if (request.data.status) {
            setTitle(request.data.data.title)
            setDescription(request.data.data.description)
            setStock(request.data.data.stock)
            setPublisher(request.data.data.publisher)
            setAuthor(request.data.data.author)
            setCategory(request.data.data.category)
            
        } else {
            toast.error(request.data.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000
            });
        }
    }
    useEffect(() => {
        setOwner(userData.data._id)
        getDataCategory()
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
                    ? (<Redirect to='/book'/>)
                    : ''
            }
            <div className="col-12">
                <div className="card">

                    <div className="card-body">
                        <div className="border-bottom">
                            <h4 className="card-title">Create New Book</h4>
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
                                            <label>Book Title</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={title}
                                                onChange={e => setTitle(e.target.value)}
                                                placeholder="Book Name"/>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Publisher</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={publisher}
                                                onChange={e => setPublisher(e.target.value)}
                                                placeholder="Book Name"/>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Author</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={author}
                                                onChange={e => setAuthor(e.target.value)}
                                                placeholder="Book Name"/>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Book Description</label>
                                            <textarea
                                                className="form-control"
                                                value={description}
                                                onChange={e => setDescription(e.target.value)}
                                                placeholder="Description..."
                                                defaultValue={""}rows={3}/>

                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Category</label>
                                            <select className="form-control" onChange={e => setCategory(e.target.value)}>
                                                <option value=''>Select Category</option>
                                                {
                                                    dataCategory.map(function (item, index) {
                                                        if(item._id == category){
                                                            return (<option key={index} selected value={item._id}>{item.category_name}</option>)
                                                        }else{
                                                           return (<option key={index} value={item._id}>{item.category_name}</option>)
                                                        }
                                                        
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Stock</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={stock}
                                                onChange={e => setStock(e.target.value)}
                                                placeholder="Stock"/>
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