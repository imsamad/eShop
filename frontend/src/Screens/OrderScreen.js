import React,{useEffect} from 'react'
import ButtonLoader from "../components/ButtonLoader"
import {Spinner,Row,Col,ListGroup,Image,Card,Alert, Button} from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import { Link } from 'react-router-dom'
import { deliverOrder, getOrderDetails, payOrder } from "../actions/orderActions"
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants'
import PayPalButton from "../components/PayPalButton"
import { CART_RESET_ITEM } from '../constants/cartConstants'
import Progress from "../components/Progress"
const OrderScreen = ({match,history}) => {
  const dispatch = useDispatch()
  
  const orderId=match.params.id
  const {userInfo} =useSelector(state=>state.userLogin)

  const orderPay=useSelector(state=>state.orderPay)
  const {loading:loadingPay,success:successPay,error:errorPay}=orderPay

  const orderDetails=useSelector(state=>state.orderDetails)
  const {loading,order,error}=orderDetails

  const orderDeliver=useSelector(state=>state.orderDeliver)
  const {loading:loadingDeliver,message:messageDeliver,error:errorDeliver,success:successDeliver}=orderDeliver
  useEffect(()=>{
    if(!userInfo){
      history.push("/signin")
    }
    if(!order || order._id !== orderId || successDeliver || successPay) {
          dispatch(getOrderDetails(orderId))  
          successPay && dispatch({type:ORDER_PAY_RESET})  
          successDeliver && dispatch({type:ORDER_DELIVER_RESET})
    }
  },[dispatch,orderId,successPay,order,successDeliver,userInfo,history])

  const successHandler=(paymentResult)=>{
    dispatch(payOrder(orderId,paymentResult))
    dispatch(getOrderDetails(orderId))
    dispatch({type:ORDER_PAY_RESET})
    dispatch({type:CART_RESET_ITEM})
  }
  const deliverHandler=()=>{
    dispatch(deliverOrder(orderId))
  }
  return ( 
  <>
    {loading ? (
    <Row>
    <Col className="text-center pt-5" >
    <Progress/>
    </Col>
    </Row>
  ):error && (
  <Row>
  <Col xs={6} className="mx-auto">
  <Alert variant="danger">{error}</Alert>
  </Col>
  </Row>
  )}
  { Object.keys(order).length!==0 && (
    <>
    <h3>ORDER:-{order._id}</h3>
    <Row>
      <Col md={8}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>Shipping...</h2>
            <p><strong>Username:-</strong>{order.user.name}</p> 
            <p><strong>Email:-</strong> <a href={`mailto:${order.user.email}`} className="link" >{order.user.email}</a></p>
            <p><strong>Address:-</strong>{order.shippingAddress.address},{order.shippingAddress.city},
            {order.shippingAddress.postalCode},{' '}{order.shippingAddress.country}
             </p>
            {order.isDelivered ?(
              <Alert variant="success">Order Delivered at {order.deliveredAt.substring(0,10)}</Alert>
            ):(
              <Alert variant="danger">Not Delivered.</Alert>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Payment Method:-</h2>
            <strong>Method :-</strong>
            {order.paymentMethod}
            {order.isPaid || successPay ?(
              <Alert className="my-2" variant="success">Order Paid at { order.paidAt && order.paidAt.substring(0,10)}</Alert>
            ):(
              <Alert className="my-2" variant="danger">Not Paid.</Alert>
            )}
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Order Items</h2>
            {order.orderItems.length===0? (<Alert variant="danger">Your cart is empty.</Alert>):
            (
              <ListGroup variant="flush" >
                  {order.orderItems.map((item,index)=>(
                <ListGroup.Item key={index}>
                   <Row>
                    <Col xs={2}>
                      <Image src={item.image} alt={item.name} fluid rounded/>
                    </Col>
                    <Col>
                    <Link to={`/product/${item.product}`} >{item.name}</Link>
                    </Col>
                    <Col md={4}>
                    {item.qty} X ${item.price} = ${(item.qty*item.price).toFixed(2)}
                    </Col>  
                    </Row> 
                </ListGroup.Item>
                  ))}                  
              </ListGroup>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Item </Col>
                <Col>${order.itemsPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping </Col>
                <Col>${order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>${order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>${(order.totalPrice).toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            {!order.isPaid && (
           <>
            <ListGroup.Item className="bg-light py-3">
              {loadingPay ? 
            (<Progress/>

):errorPay ? (<Alert variant="danger">{errorPay}</Alert>):(
            <PayPalButton success={successHandler} amount={order.totalPrice}  />
            )}
            </ListGroup.Item>
           </>
            )}
            {userInfo && userInfo.isAdmin===true && !order.isDelivered && order.isPaid && (
              <ListGroup.Item>
                {errorDeliver && <div>{errorDeliver}</div>}
                {messageDeliver && <div>{messageDeliver}</div>}
                <Button onClick={deliverHandler} >{loadingDeliver?<ButtonLoader/>:'Mark As Deliverd'}</Button>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Card>
      </Col>
     </Row>             
    </>
  )}
  </>
  )
}
export default OrderScreen

