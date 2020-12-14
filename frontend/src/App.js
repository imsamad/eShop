import React from 'react'
import {BrowserRouter as Router,Route } from "react-router-dom" 
import {Container} from "react-bootstrap"
import Footer from './components/Footer'
import Header from './components/Header'
import HomeScreen from './Screens/HomeScreen'
import ProductScreen from './Screens/ProductScreen'
import CartScreen from './Screens/CartScreen'
import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen'
import ProfileScreen from './Screens/ProfileScreen'
import ShippingScreen from './Screens/ShippingScreen'
import PaymentScreen from './Screens/PaymentScreen'
import PlaceOrderScreen from './Screens/PlaceOrderScreen'
import OrderScreen from './Screens/OrderScreen'
import UserListScreen from "./Screens/UserListScreen"
import UserEditScreen from './Screens/UserEditScren'
import ProductsListScreen from './Screens/ProductsListScreen'
import ProductEditScreen from './Screens/ProductEditScreen'
import OrdersListScreen from './Screens/OrdersListScreen'
const App = () => {
  return (
    <Router>

        <Header/>
         <main className="py-3">
          <Container>
          <Route exact path="/admin/productslist/:pageNumber" component={ProductsListScreen}/>
          <Route exact path="/admin/productslist" component={ProductsListScreen}/>
          
          <Route path="/product/:id" component={ProductScreen}/>
          <Route path="/cart/:id?" component={CartScreen}/>
          <Route path="/signin" component={LoginScreen}/>
          <Route path="/register" component={RegisterScreen}/>
          <Route path="/profile" component={ProfileScreen}/> 
          <Route path="/shipping" component={ShippingScreen}/>
          <Route path="/payment" component={PaymentScreen}/>
          <Route path="/placeorder" component={PlaceOrderScreen}/>
          <Route path="/order/:id" component={OrderScreen}/>
          <Route path="/admin/userslist" component={UserListScreen}/>
          <Route path="/admin/user/:id/edit" component={UserEditScreen}/>
          <Route path="/admin/product/:id/edit" component={ProductEditScreen}/>
          <Route path="/admin/orderslist" component={OrdersListScreen}/>

          <Route path="/search/:keyword" component={HomeScreen} />
          <Route path="/page/:pageNumber" component={HomeScreen}/>
          <Route path="/search/:keyword/page/:pageNumber" component={HomeScreen}/>
          <Route path="/" component={HomeScreen} exact/>
          </Container>
        </main>
        <Footer/>      
    </Router>
  )
}

export default App
