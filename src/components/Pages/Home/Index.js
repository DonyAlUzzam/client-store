import React, {useEffect, useState} from 'react'
import {NavLink, Redirect} from 'react-router-dom'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import { makeStyles, fade } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.info.main, 0.55),
    '&:hover': {
      backgroundColor: fade(theme.palette.info.main, 0.25),
    },
    marginRight: theme.spacing(5),
    marginLeft: theme.spacing(2),
    width: '100%',
  },
  category: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.info.main, 0.55),
    '&:hover': {
      backgroundColor: fade(theme.palette.info.main, 0.25),
    },
    marginRight: theme.spacing(5),
    width: '100%',
    
  },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    },
    hide: {
			display: 'none'
		}
}));

function CoverBook(url){
    let cover = {
      backgroundImage: `url('${process.env.REACT_APP_API_URL}${url}')`
    };
    return cover;
  }
  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }

function Home() {


    const classes = useStyles();
    const userData = window
        .localStorage
        .getItem('userData')
            ? JSON.parse(window.localStorage.getItem('userData'))
            : {}
    const [dataBook, setDataBook] = useState([])
    const [pageNo, setPageNo] = useState(1)
    const [size, setSize] = useState(12)
    const [total_page, setTotalPage] = useState()
    const [per_page, setPerPage] = useState()
    const [search, setSearch] = useState('')
    const [category_id, setCategory] = useState('')
    const [dataCategory, setDataCategory] = useState([])


    axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`
    }
    const pageNumbers=[]
    if (total_page !== null) {
      for (let i = 1; i <= total_page; i++) {
        pageNumbers.push(i)
        }
      }
    async function getDataBook(pageNo) {
        const request = await axios.get(process.env.REACT_APP_API_URL + 'books?pageNo='+pageNo+'&size='+size+'&search='+search)
        setDataBook(request.data.data)
        setTotalPage(request.data.totalPages)
        setPerPage(request.data.per_page)
    }

    async function getDataBookFilter(pageNo) {
      const request = await axios.get(process.env.REACT_APP_API_URL + 'filter-books?pageNo='+pageNo+'&size='+size+'&filter='+category_id)
      setDataBook(request.data.data)
      setTotalPage(request.data.totalPages)
      setPerPage(request.data.per_page)
  }

    async function getDataCategory() {
      const request = await axios.get(
          process.env.REACT_APP_API_URL + 'category'
      )
      setDataCategory(request.data.data)
  }

    const page = pageNumbers.length > 1 ? pageNumbers.map(number => {
      let data = pageNo === number ? ".active": ''
      return (
        <span key={number} className={data} onClick={() => getDataBook(number) }>{number}</span>
      )
    }) : ''

    useEffect(() => {
        getDataBook()
        getDataCategory()
    }, [])
    return (
        <div>
            <div className="col-12">
                <div className="row"  style={{marginTop: 25}}>
                  <div className="col-7">
                    <div className={classes.search}>
                      <div className={classes.searchIcon}>
                        <SearchIcon />
                      </div>
                      <InputBase
                        placeholder="Search Book"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        onKeyUp={e => getDataBook(pageNo)}
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                      />
                    </div>
                  </div>
                  <div className="col-3" >
                    <div className={classes.category}>
                        <select className="form-control" onChange={e => setCategory(e.target.value)} >
                            <option value=''>Select Category</option>
                            {
                                dataCategory.map(function (item, index) {
                                    return (<option key={index} value={item._id}>{item.category_name}</option>)
                                })
                            }
                        </select>
                      </div>
                  </div>
                   <div className="col-2" >
                      <div >
                      <Button variant="contained" color="primary" onClick={() => getDataBookFilter(1)}>
                        Filter
                      </Button>
                      </div>
                  </div>
                </div>
                <div className="row col-12"  style={{marginTop: 25}}>
                    {
                        dataBook.map(function (item, index) {
                            return(
                                <div
                                className="col-lg-3 col-md-4 col-6 resit-master-box"
                                key={index}
                              >
                                <div className="resit-box-produk">
                                  <NavLink
                                    to={'/homedetail/'+item._id}>
                                    <div className="resit-produk">
                                      <div className="resit-foto" style={CoverBook(item.cover)}></div>
                                      <div className="resit-nama-produk">
                                        {item.book_name}
                                      </div>
                                      <div className="resit-harga-produk">
                                        <span className="resit-harga">
                                          Rp.{formatNumber(item.price)}
                                        </span>
                                      </div>
                                      <div className="resit-produk-terjual">
                                        {" "}
                                        Stok : {item.qty}{" "}
                                      </div>
                                    </div>
                                    </NavLink>
                                </div>
                              </div>
                            )
                        })
                    }
                    <div className="row col-12">
                        <div className="col-sm">
                        </div>
                        <div className="col-sm">
                            <div className="pagination">
                                <span id="paginate" className={pageNumbers.length > 1 ? '' : classes.hide}  onClick={() => getDataBook(1)}>&laquo;</span>
                                {
                                page
                                }
                                <span id="paginate2" className={pageNumbers.length > 1 ? '' : classes.hide} onClick={() => getDataBook(1)}>&raquo;</span>
                            </div>
                          </div>
                        <div className="col-sm">
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Home;