import React,{useState,useEffect} from 'react'
import {Container,Row,Col, Form,Button, Alert, Table} from "react-bootstrap"
import {Link} from "react-router-dom" 
import {useDispatch,useSelector} from "react-redux"
import {getUserDetails, updateUserDetails } from '../actions/userActions'
import {listMyOrders} from "../actions/orderActions"
import Meta from '../components/Meta'
import ButtonLoader from '../components/ButtonLoader'
import Progress from '../components/Progress'
import {USER_UPDATE_RESET} from "../constants/userConstants"
const ProfileScreen = ({history,location}) => {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirm,setConfirm]=useState('')
  
    const [message, setMessage] = useState(null)
    
    const dispatch = useDispatch()

    const userUpdateProfile=useSelector(state=>state.userUpdateProfile)
    const {loading:updateLoading,error:updateError,success}=userUpdateProfile

    const userDetails=useSelector(state=>state.userDetails)
    const {loading,error,user}=userDetails
    
    const userLogin=useSelector(state=>state.userLogin)
    const {userInfo}=userLogin

    const orderListMy=useSelector(state=>state.orderListMy)
    const {error:ordersError,orders,loading:ordersLoading}=orderListMy
    useEffect(()=>{
      if(!userInfo){
        history.push("/signin")
    }
    
    else{
      dispatch(listMyOrders())
      if(Object.keys(user).length===0 || !user.name || !user.email || success) {
        dispatch({type:USER_UPDATE_RESET})
        dispatch(getUserDetails('profile'))
      }
      else{
        setName(user.name)
        setEmail(user.email)
      }
    }
    // eslint-disable-next-line
    },[userInfo,history,dispatch,user,success])
    const inputHandle=(e)=>{
      const {name,value}=e.target
      name==='name' && setName(value)
      name==='email' && setEmail(value)
      name==='password' && setPassword(value)
      name==='confirm' && setConfirm(value)
    }
    const submitHandle=(e)=>{
      e.preventDefault()
      if(confirm!==password){
        setMessage("Password does not match.")
      }else{
      dispatch(updateUserDetails({id:user._id,name,email,password}))
        dispatch(getUserDetails('profile'))
      }
    }
  return (
    <Container >
      <Row>
        <Col md={3} xs={12}>
        {message && <Alert variant="danger">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
  {success && <Alert variant="success">{`Profile updated.`}</Alert>}
        {updateError && <Alert variant="danger">{updateError}</Alert>} 
            {/* <h2  className="mb-4 border-bottom" >Profile</h2> */}
            <Meta title={`${userInfo && userInfo.name} Profile`}/>
            <Form onSubmit={submitHandle} className="border p-2" >
          {loading && <Progress/>}
              <h5>Update Profile</h5>
              <Form.Group controlId='name'>
                <Form.Label  className="my-0" >Your Name :-</Form.Label>
                <Form.Control type="text" value={name}  name="name"
                onChange={inputHandle}></Form.Control>
               </Form.Group>
              <Form.Group controlId='email'>
                <Form.Label  className="my-0" >Email Address :-</Form.Label>
                <Form.Control type="email" value={email} placeholder="Enter email" name="email"
                onChange={inputHandle}></Form.Control>
               </Form.Group>
              <Form.Group controlId='password'>
                <Form.Label  className="my-0" >Password :-</Form.Label>
                <Form.Control type="password" value={password} placeholder="Enter password" name="password"
                onChange={inputHandle}></Form.Control>
               </Form.Group>
              <Form.Group controlId='confirm'>
                <Form.Label  className="my-0" >Confirm Password :-</Form.Label>
                <Form.Control type="password" value={confirm} placeholder="Confirm password" name="confirm"
                onChange={inputHandle}>
                </Form.Control>
               </Form.Group>
                <Button disabled={loading===true}   type="submit" className="btn-sm btn-block my-2" variant="primary">
                  {updateLoading ? ( <ButtonLoader/>):'Update'
                  }
                  </Button>
            </Form>
        </Col>
        <Col md={9}>
          <h2 className="border-bottom" >Orders</h2>
          {
            ordersLoading ?(<Progress/>):ordersError?(
              <div>{ordersError}</div>
            ):(
          <Table   striped bordered hover responsive size="sm">
            <thead className="thead-dark" >
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>MANAGE</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order)=>(
              <tr key={order._id} >
              <td>{order._id}</td>
              <td>{order.createdAt.substring(0,10)}</td>
              <td>${order.totalPrice}</td>
              <td>{order.isPaid ? (order.paidAt.substring(0,10)):(
                <i className="fa fa-times" style={{color:'red'}} ></i>
              )}</td>
              <td>{order.isDelivered ? (order.deliveredAt.substring(0,10)):(
                <i className="fa fa-times" style={{color:'red'}} ></i>
              )}</td>
                <td><Link to={`/order/${order._id}`} className="btn btn-light btn-sm" >Details</Link> </td>
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

export default ProfileScreen

