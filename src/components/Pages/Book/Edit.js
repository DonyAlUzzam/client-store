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
    const [book_name, setBookName] = useState('')
    const [desc, setDesc] = useState('')
    const [cover, setCover] = useState('')
    const [author, setAuthor] = useState('')
    const [category, setCategory] = useState('')
    const [qty, setQty] = useState('')
    const [price, setPrice] = useState('')
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
                process.env.REACT_APP_API_URL + 'book/'+props.match.params.id,{
                    book_name, author, desc, category, qty, price
                }
                
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
        setBookName('')
        setDesc('')
        setQty('')
        setPrice('')
        setAuthor('')
    }
    async function getDataCategory() {
        const request = await axios.get(
            process.env.REACT_APP_API_URL + 'category'
        )
        console.log(request.data, "d")
        setDataCategory(request.data.data)
    }
    const setFormData = async () => {
        const request = await axios.get(
            process.env.REACT_APP_API_URL + 'book/'+props.match.params.id
        )
        if (request.data.status) {
            setBookName(request.data.data[0].book_name)
            setDesc(request.data.data[0].desc)
            setQty(request.data.data[0].qty)
            setPrice(request.data.data[0].price)
            setAuthor(request.data.data[0].author)
            setCategory(request.data.data[0].category_id.category_name)
            
        } else {
            toast.error(request.data.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000
            });
        }
    }
    useEffect(() => {
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
                                                value={book_name}
                                                onChange={e => setBookName(e.target.value)}
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
                                                value={desc}
                                                onChange={e => setDesc(e.target.value)}
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
                                                        return (<option key={index} value={item._id}>{item.category_name}</option>)
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
                                                value={qty}
                                                onChange={e => setQty(e.target.value)}
                                                placeholder="Stock"/>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Price</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={price}
                                                onChange={e => setPrice(e.target.value)}
                                                placeholder="Book Name"/>
                                        </div>
                                    </div>
                                    {/* <div className="col-lg-12">
                                        <div className="form-group">
                                        <label>Cover</label>
                                            <input
                                              className="form-control"
                                              variant="outlined"
                                              margin="normal"
                                              required
                                              fullWidth
                                              name="upload"
                                              type="file"
                                              onChange={event=>setCover(event.target.files[0])}
                                              id="file"
                                              inputProps={{ accept: 'images/jpeg, images/jpg, images/png' }}/>
                                        </div>
                                    </div> */}
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