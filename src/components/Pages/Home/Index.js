import React, {useEffect, useState} from 'react'
import {NavLink, Redirect} from 'react-router-dom'
import axios from 'axios'

function Carditem(props) {
    return (
        <React.Fragment>
            <div className="col-lg-3 col-md-6">
                <div className="card">
                    <img
                        className="card-img-top img-fluid"
                        src="/assets/images/big/bookstore7.png"
                        alt="Card image cap"/>
                    <div className="card-body">
                        <h4 className="card-title">{props.item.title}</h4>
                        <p className="card-text">{props.item.author}
                            | {props.item.publisher}</p>
                            <NavLink
                                className="btn btn-primary"
                                style={{
                                    color: 'white'
                                }}
                            to={'/homedetail/'+props.item._id}>View Detail</NavLink>
                    </div>
                </div>

            </div>
        </React.Fragment>
    )
}
function Home() {
    const userData = window
        .localStorage
        .getItem('userData')
            ? JSON.parse(window.localStorage.getItem('userData'))
            : {}
    const [dataBook, setDataBook] = useState([])
    axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`
    }
    async function getDataBook() {
        const request = await axios.get(process.env.REACT_APP_API_URL + '/book')
        setDataBook(request.data.data)
    }
    useEffect(() => {
        getDataBook()
    }, [])
    return (
        <div>

            <div className="col-12">
                <div className="row">
                    {
                        dataBook.map(function (item, index) {
                            return (<Carditem key={index} item={item}/>)
                        })
                    }

                </div>
            </div>
        </div>

    )
}

export default Home;