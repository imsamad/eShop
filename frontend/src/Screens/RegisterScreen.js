import React,{useState,useEffect} from 'react'
import {Container,Row,Col, Form,Button, Alert} from "react-bootstrap"
import {Link} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import {register } from '../actions/userActions'
const RegisterScreen = ({history,location}) => {
    const [fields,setFields]=useState({
      name:'',
      email:'',
      password:'',
      confirm:''
    })

    const [message, setMessage] = useState(null)
    
    const dispatch = useDispatch()
    const userRegister=useSelector(state=>state.userRegister)
    const {loading,error,userInfo}=userRegister
    const {userInfo:loginUserInfo} =useSelector(state=>state.userLogin)
    useEffect(()=>{
      if(userInfo || loginUserInfo){
        history.push("/cart")
      }
    },[userInfo,history,loginUserInfo])
    const inputHandle=(e)=>{
      const {name,value}=e.target
      setFields((p)=>{
        return {
          ...p,
          [name]:value
        }
      })
    }
    const submitHandle=(e)=>{
      e.preventDefault()
      if(fields.confirm!==fields.password){
        setMessage("Password does not match.")
      }else{
      dispatch(register(fields.name,fields.email,fields.password))
      }
    }
    const redirect=location.search ? location.search.split('=')[1]:false
  return (
    <Container >
      <Row>
        <Col className="mx-auto" md={6} xs={12}>
        {message && <Alert variant="danger">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
            <h1>Sign Up</h1>
            <Form onSubmit={submitHandle}>
              <Form.Group controlId='name'>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" required name="name" 
                onChange={inputHandle}></Form.Control>
               </Form.Group>
              <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" required name="email"
                onChange={inputHandle}></Form.Control>
               </Form.Group>
              <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" required name="password"   minLength="6"
                onChange={inputHandle}></Form.Control>
               </Form.Group>
              <Form.Group controlId='confirm'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm password" required name="confirm"
                onChange={inputHandle}></Form.Control>
               </Form.Group>
                <Button disabled={loading===true}   type="submit" className="btn-sm btn-block my-2" variant="primary">
                  {loading ? (
                    <>
                    <div className="spinner-grow text-light" style={{width:"0.8rem",height:"0.8rem"}} role="status"></div>
                    <div className="spinner-grow text-light mx-2" style={{width:"0.8rem",height:"0.8rem"}} role="status"></div>
                    <div className="spinner-grow text-light" style={{width:"0.8rem",height:"0.8rem"}} role="status"></div>
                    </>
                  ):'Sign In'
                  }
                  </Button>
            </Form>
            Have an Account ? 
            <Link to={redirect? `/signin?redirect=${redirect}` :'/signin'} className="mx-1">Sign In</Link> 
        </Col>
      </Row>
    </Container >
)
}

export default RegisterScreen

