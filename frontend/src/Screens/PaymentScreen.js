import React,{useState} from 'react'
import { useEffect } from 'react'
import {Container,Form,Button,Row,Col, Alert} from "react-bootstrap"
import {Link} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
const PaymentScreen = ({history}) => {
  const cart=useSelector(state=>state.cart)
  const {shippingAddress}=cart
  let addressIncomplete=''
  if(Object.keys(shippingAddress).length<4){
   addressIncomplete=true
  }

  const [paymentMethod,setPaymentMethod]=useState('PayPal')
 
  const dispatch = useDispatch()
  const userLogin=useSelector(state=>state.userLogin)
  const {userInfo}=userLogin
  useEffect(()=>{
    if(!userInfo){
      history.push("/signin?redirect=payment")
    }
  })  
  const submitHandle=(e)=>{
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push("/placeorder")
  }

  return (
    <Container>
      <CheckoutSteps step1 step2 step3/>
       <Row><Col md={8} className="mx-auto" >     {addressIncomplete && <Alert variant="info">
         Your shippping  address is incomplete.Please fill 
             <Link className="mx-1 btn btn-link p-1" to="/shipping" >Shipping</Link>
         fields.
             </Alert>}
             </Col></Row>
      <Row>
        <Col className="mx-auto" md={6} xs={12}>
          <Form onSubmit={submitHandle} className="border p-2" >
            <h5 className="text-center" >Select Payment Method:-</h5>
            <Form.Group>
              <Form.Label as="legend">Select Method</Form.Label>
            </Form.Group>
            <Col>
              <Form.Check type="radio" label="PayPal or Credit" 
                      id="PayPal" name="paymentMethod" className="my-2" 
                      value="PayPal" onChange={(e)=>{setPaymentMethod(e.target.value)}}>
              </Form.Check>
              <Form.Check type="radio" disabled label="Stripe" 
                      id="Stripe" name="paymentMethod" 
                      value="Stripe"  onChange={(e)=>{setPaymentMethod(e.target.value)}}>
              </Form.Check>
            </Col>
            <Button disabled={false || addressIncomplete}   type="submit" className="btn-sm btn-success my-2" variant="primary">
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

export default PaymentScreen

