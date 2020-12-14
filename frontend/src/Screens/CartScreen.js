import React, { useEffect } from 'react'
import { Alert, Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import {useSelector,useDispatch} from "react-redux"
import { Link } from 'react-router-dom'
import { addToCart, removeCart } from '../actions/cartActions'
import Meta from '../components/Meta'

const CartScreen = ({match,location,history}) => {
  const productId=match.params.id ===':id' ? null : match.params.id
  const qty =location.search ? Number(location.search.split('=')[1]) : 1
  const cart=useSelector(state=>state.cart)
  const {cartItems}=cart
  const dispatch=useDispatch()
  useEffect(()=>{
    if(productId){
      dispatch(addToCart(productId,qty))
    }
  },[dispatch,productId,qty])
  const removeCartHandler=(id)=>{
      dispatch(removeCart(id))
  }
  const checkoutHandler=()=>{
      history.push('/signin?redirect=shipping')
  }
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
             <Meta title={`Your cart`}/>

        {cartItems.length ===0 ? ( <Alert variant="info">Your cart is empty <Link to="/" className="btn btn-light btn-sm mx-3 text-dark" >Go Back</Link> </Alert>):(
   
   <ListGroup variant='flush' >
            {cartItems.map(item=>(
            <ListGroup.Item key={item.product} >
                <Row>
                  <Col md={2} sm={4} xs={3} >
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3} sm={5} xs={4} >
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2} sm={1} xs={2} > 
                    ${item.price}
                  </Col>
                  <Col md={2} sm={1} xs={2} >
                  <select 
                  value={item.qty}
                  onChange={(e)=>dispatch(addToCart(item.product,e.target.value))}  
                  className="custom-select custom-select-sm">
                    {[...Array(item.countInStock).keys()].map(x=>(
                    <option key={x+1} value={x+1}>{x+1}</option> 
                    ))}
                    </select>                    
                  </Col>
                  <Col md={2} sm={1} xs={1} >
                      <Button type="button" variant="light" className="btn-sm" 
                      title={`Remove ${item.qty>1 ?'these':'this'} item from cart.`}
                      onClick={()=>{
                        removeCartHandler(item.product)
                      }}><i className="fa fa-trash"></i></Button>
                  </Col>
                </Row>
            </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Subtotal
                 ({ cartItems.reduce((acc,item)=>Number(acc)+Number(item.qty) , 0) }) items
              </h2>
             <strong> ${cartItems.reduce((acc,item)=>acc+Number(item.qty)*Number(item.price),0).toFixed(2)}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type="button" className='btn-block btn-success ' disabled={cartItems.length===0}
               onClick={checkoutHandler}
               >
               Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
