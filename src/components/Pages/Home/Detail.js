import React, {useEffect, useState} from 'react'
import {NavLink, Redirect} from 'react-router-dom'
import axios from 'axios'
import BlockUi from 'react-block-ui'
import 'react-block-ui/style.css'
import {toast} from 'react-toastify'

function Detail(props) {
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
            <div className="col-lg-8 col-md-8">
                <div className="card">
                    <img
                        className="card-img-top img-fluid"
                        src="/assets/images/big/bookstore7.png"
                        alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className="card-title">Title</h5>
                        <h4 className="card-text">{title}</h4>
                        <h5 className="card-title">Author</h5>
                        <p className="card-text">{author}</p>
                        <h5 className="card-title">Publisher</h5>
                        <p className="card-text">{publisher}</p>
                        <h5 className="card-title">Description</h5>
                        <p className="card-text">{description}</p>
                        <button className="btn btn-primary float-right">Add To Cart</button>
                    </div>
                    
                </div>
                

            </div>
        </div>

    )
}

export default Detail;