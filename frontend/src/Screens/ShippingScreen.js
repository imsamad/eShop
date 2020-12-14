import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import {Container,Form,Button,Row,Col, Alert} from "react-bootstrap"
import {useSelector,useDispatch} from "react-redux"
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
const ShippingScreen = ({history}) => {
  const [shipment,setShipment]=useState({
    address:"",
    city:"",
    postalCode:"",
    country:"",
    })
  const cart=useSelector(state=>state.cart)
  const {shippingAddress}=cart
  const userLogin =useSelector(state=>state.userLogin)
  const {userInfo}=userLogin
  useEffect(()=>{

  if(!userInfo  ){
    history.push("/signin?redirect=shipping")
  }
    if(Object.keys(shippingAddress).length !== 0){
    for (const property in shippingAddress) {
       setShipment((p)=>{
        return {...p,[property]:shippingAddress[property]}
       }) 
    }
  }      
  },[shippingAddress,userInfo,history])

  const dispatch = useDispatch()
  const inputHandle=(e)=>{
      const {name,value}=e.target
      setShipment((p)=>{
        return {
          ...p,
          [name]:value
        }
      })
  }

  const submitHandle=(e)=>{
    e.preventDefault()
    dispatch(saveShippingAddress(shipment))
    history.push("/payment")
  }

  return (
    <Container>
      <CheckoutSteps step1 step2/>
      {cart.cartItems.length===0 && <Alert variant="success">Your cart <i className="fa fa-shopping-cart"></i> is empty,<Link className="btn btn-link mx-1 p-0" to="/">Add</Link> products to cart. </Alert>}
      <Row>
        <Col className="mx-auto" md={6} xs={12}>
          <Form onSubmit={submitHandle} className="border p-2" >
            <h5 className="text-center" >Ship To:-</h5>
            <Form.Group >
              {/* <Form.Label>Address</Form.Label> */}
              <Form.Control type="text"  value={shipment.address} placeholder="Enter Address" name="address" required
                onChange={inputHandle}>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              {/* <Form.Label>City</Form.Label> */}
              <Form.Control type="text" value={shipment.city}  placeholder="Enter City" name="city" required
                onChange={inputHandle}>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              {/* <Form.Label>City</Form.Label> */}
              <Form.Control type="text" value={shipment.postalCode}  placeholder="Enter Postal Code" name="postalCode" required
                onChange={inputHandle}>
              </Form.Control>
            </Form.Group>
            <Form.Group >
              {/* <Form.Label>City</Form.Label> */}
              <Form.Control type="text" value={shipment.country}  placeholder="Enter Country" name="country" required
                onChange={inputHandle}>
              </Form.Control>
            </Form.Group>
            <Button disabled={cart.cartItems.length===0}   type="submit" className="btn-success  my-2" variant="primary">
             {false ? 
             (
              <>
              <div className="spinner-grow text-light" style={{width:"0.8rem",height:"0.8rem"}} role="status"></div>
              <div className="spinner-grow text-light mx-2" style={{width:"0.8rem",height:"0.8rem"}} role="status"></div>
              <div className="spinner-grow text-light" style={{width:"0.8rem",height:"0.8rem"}} role="status"></div>
              </>
              ):'Proceed'
              }
              </Button>

          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default ShippingScreen
