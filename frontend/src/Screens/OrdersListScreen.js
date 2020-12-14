import React,{useEffect} from 'react'
import {Alert,Container,Row,Col, Button, Table} from "react-bootstrap"
import {Link} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import { listOrders} from '../actions/orderActions'
import Loader from "../components/Loader"

const OrdersListScreen = ({history}) => {
    const dispatch = useDispatch()
    const userLogin=useSelector(state=>state.userLogin)
    const {userInfo}=userLogin

    const orderList=useSelector(state=>state.orderList)
    const {error,orders,loading}=orderList

    useEffect(()=>{
      if(!userInfo || !userInfo.isAdmin){
        history.push("/signin")
    }
    else{
      dispatch(listOrders())
    }
    // eslint-disable-next-line
    },[history,dispatch,userInfo])
    return (
    <Container >
      <Row className="align-items-center" >
        <Col><h2 className="text-success">Orders</h2></Col>
      </Row>
      <Row>
        <Col className="mx-auto">
          {
            loading ?(<Loader w='5rem' h='5rem'/>):error?(
              <Alert variant='danger' >{error}</Alert>
            ):(
          <Table   striped bordered hover responsive size="sm">
            <thead className="thead-dark" >
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th colSpan="2" >MANAGE</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order)=>(
              <tr key={order._id} >
              <td>{order._id}</td>
              <td>{order.user && order.user.name}</td>
              <td>{order.createdAt.substring(0,10)}</td>
              <td>{order.totalPrice}</td>
              <td>{!order.isPaid?(<i className="fa fa-times" style={{color:'red'}} ></i>):(
                order.paidAt && order.paidAt.substring(0,10)
              )}</td>
              <td>{!order.isDelivered?(<i className="fa fa-times" style={{color:'red'}} ></i>):(
                order.deliveredAt && order.deliveredAt.substring(0,10)
              )}</td>
                <td>
                  <Link to={`/order/${order._id}/`}  >
                  <Button className="btn btn-sm mx-2 btn-light" >Manage</Button>
                </Link>
                </td>
              </tr>

))}
            </tbody>
          </Table>
            )
          }
        </Col>
      </Row>
    </Container >
)
}

export default OrdersListScreen


