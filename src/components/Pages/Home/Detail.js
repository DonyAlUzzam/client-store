import React, {useEffect, useState} from 'react'
import {NavLink, Redirect} from 'react-router-dom'
import axios from 'axios'
import BlockUi from 'react-block-ui'
import 'react-block-ui/style.css'
import {toast} from 'react-toastify'


function CoverBook(url){
    let cover = {
      backgroundImage: `url("http://localhost:8081/${url}")`
    };
    return cover;
  }
  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

function Detail(props) {
    const userData = window
        .localStorage
        .getItem('userData')
            ? JSON.parse(window.localStorage.getItem('userData'))
            : {}
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [author, setAuthor] = useState('')
    const [category, setCategory] = useState('')
    const [stock, setStock] = useState('')
   
    axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`
    }
    
    const setFormData = async () => {
        const request = await axios.get(
            process.env.REACT_APP_API_URL + 'book/'+props.match.params.id
        )
        if (request.data.status) {
            console.log(request.data.data[0].book_name)
            setTitle(request.data.data[0].book_name)
            setImage(request.data.data[0].cover)
            setDescription(request.data.data[0].desc)
            setStock(request.data.data[0].qty)
            setPrice(request.data.data[0].price)
            setAuthor(request.data.data[0].author)
            setCategory(request.data.data[0].category)
            
        } 
        else {
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
      
    <div className="container" style={{marginTop:"70px"}}>
        <div className="row mb-4">
            <div className="col-12 bg-light resit-shadow">
                <div className="row" style={{padding: "0 13px"}}>
                    <div className="col-6" style={{padding: "0 10px"}}>
                        <div className="resit-foto resit-radius-1" style={CoverBook(image)}>
                        </div>
                    </div>
                <div className="col-6">
                <div style={{padding: "30px 0",fontSize: "25px"}}>
                    <h3>Judul</h3>
                    <div className="resit-judul-detail">{title}</div>
                </div>
                <hr/>
                <div style={{padding: "30px 0",fontSize: "25px"}}>
                    <h3>Author</h3>
                    <div className="resit-author-detail">{author}</div>
                </div>
                <hr/>
                <div style={{padding: "30px 0",fontSize: "25px"}}>
                    <h3>Deskripsi</h3>
                    <div className="resit-deskripsi-detail">{description}</div>
                </div>
                <hr/>
                <div style={{padding: "30px 0",fontSize: "25px"}}>
                    <h3>Stok</h3>
                    <div className="resit-author-detail">{stock}</div>
                </div>
                <hr/>
                <div style={{padding: "30px 0",fontSize: "25px"}}>
                    <h3>Harga</h3>
                    <div className="resit-harga-detail text-danger">Rp. {price}</div>
                </div>
                <hr/>
                <div style={{padding: "30px 0",fontSize: "25px"}} class="row mb-2">
                <div className="col-6">
                     <button class="btn btn-block btn-outline-success resit-radius-2 resit-outline-size-2" style={{fontWeight: "bold"}}>Add to cart </button>
                </div>
                <div className="col-6">
                     <button className="btn btn-block btn-outline-danger resit-radius-2 resit-outline-size-2" style={{fontWeight: "bold"}}>Beli </button>
                </div>
                </div>
                </div>
                </div>
            </div>
        </div>
    </div>

    )
}

export default Detail;