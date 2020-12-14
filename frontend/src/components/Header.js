import React from 'react'
import {Link} from "react-router-dom"
import {Route} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'
const Header = () => {
  const userLogin=useSelector(state=>state.userLogin)
  const {userInfo}=userLogin
  const dispatch=useDispatch()
  const logoutHandler=()=>{
      dispatch(logout())
  }
  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <Link className="navbar-brand ml-5" to="/">eShop</Link>
      
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav">
          <li className="nav-item active">
          <Link  className="nav-link" to="/cart/:id">
            <i className="fa fa-shopping-cart mx-1" ></i>
            Cart
          </Link>
          </li>
          {userInfo?(
          <li className="nav-item dropdown">
          <Link  className="nav-link dropdown-toggle" data-toggle="dropdown" to="#" role="button" aria-haspopup="true" aria-expanded="false">{userInfo.name}</Link>
          <div className="dropdown-menu">
          <Link  className="dropdown-item" to="/profile">Profile</Link>
          <Link  className="dropdown-item" to="#" onClick={logoutHandler} >Logout</Link>
          </div>
          </li>
          ):(
            <>
          <li className="nav-item">
          <Link  className="nav-link" to="/signin">
            <i className="fa fa-user mr-1"></i>
             Signin</Link>
          </li>
          <li className="nav-item">
          <Link  className="nav-link" to="/register">Signup</Link>
          </li>
          </>
          )}
          {userInfo && userInfo.isAdmin && (
      <li className="nav-item dropdown">
        <Link  className="nav-link dropdown-toggle" data-toggle="dropdown" to="#" role="button" aria-haspopup="true" aria-expanded="false">Admin</Link>
        <div className="dropdown-menu">
          <Link  className="dropdown-item" to="/admin/userslist">Users</Link>
          <Link  className="dropdown-item" to="/admin/orderslist">Orders</Link>
          <Link  className="dropdown-item" to="/admin/productslist">Products</Link>
        </div>
      </li>

          )}
    </ul>
    <Route render={({history})=><SearchBox history={history} />}/>
  </div>
</nav>     
    </header>
  )
}

export default Header
