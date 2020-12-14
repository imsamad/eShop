import React,{useState,useEffect} from 'react'
import {Container,Row,Col, Form,Button, Alert} from "react-bootstrap"
import {Link} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import { login } from '../actions/userActions'
import Meta from '../components/Meta'
const LoginScreen = ({history,location}) => {
    const [fields,setFields]=useState({
      email:'',
      password:''
    })
    const redirect=location.search ? location.search.split('=')[1]:"/"
    const dispatch = useDispatch()
    const userLogin=useSelector(state=>state.userLogin)
    const {loading,error,userInfo}=userLogin
    useEffect(()=>{
      if(userInfo){
        history.push(redirect)
      }
    },[userInfo,history,redirect])
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
      dispatch(login(fields))
    }
  return (
    <Container >
      <Row>
        <Col className="mx-auto" md={6} xs={12}>
        {error && <Alert variant="danger">{error}</Alert>}
            <h1>Sign In</h1>
            <Meta title="eShop sign in"/>
            <Form onSubmit={submitHandle}>
              <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" required name="email"
                onChange={inputHandle}></Form.Control>
               </Form.Group>
              <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" required name="password"  minLength="6"
                onChange={inputHandle}></Form.Control>
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
               </Form.Group>
            </Form>
            New Customer? 
            <Link to={redirect? `/register?redirect=${redirect}` :'/register'}>Register</Link> 
        </Col>
      </Row>
    </Container >
)
}

export default LoginScreen
