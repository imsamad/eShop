import React,{useState,useEffect} from 'react'
import {Container,Row,Col, Form,Button, Alert} from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import { Link } from 'react-router-dom'
import {getUserDetails, updateUser } from '../actions/userActions'
import { USER_DETAILS_RESET, USER_UPDATE_RESET } from '../constants/userConstants'
import Progress from "../components/Progress"
const UserEditScreen = ({history,match}) => {
  const userID=match.params.id
    let [fields,setFields]=useState({
      name:'',
      email:'',
    })
    const [isAdmin,setIsAdmin]=useState()  
    const dispatch = useDispatch()
    const {userInfo} =useSelector(state=>state.userLogin)

    const userDetails =useSelector(state=>state.userDetails)
    const {loading,error,user}=userDetails

    const userUpdate =useSelector(state=>state.userUpdate)
    const {success,loading:loadingUpdate}=userUpdate
    useEffect(()=>{
      if(success){
        dispatch({type:USER_DETAILS_RESET})
        dispatch({type:USER_UPDATE_RESET})
        history.push("/admin/userslist")
      }
      if(!userInfo || !userInfo.isAdmin  ){
        history.push("/")
      }
      else if(!user.name || user._id!==userID){
        dispatch(getUserDetails(match.params.id))
      }
      else if(user.name || Object.keys(user).length>0){
        setFields({
          ...fields,
          name:user.name,
          email:user.email,
        })
        setIsAdmin(user.isAdmin)
      }
      // eslint-disable-next-line
    },[dispatch,match,userInfo,history,user,success,userID])
    const inputHandle=(e)=>{
      let {name,value}=e.target
      // name==='isAdmin' ? value==='on' ? value=true : value=false : value=value
      setFields((p)=>{
        return {
          ...p,
          [name]:value
        }
      })
    }
    const submitHandle=(e)=>{
      e.preventDefault()
      dispatch(updateUser({...fields,isAdmin},match.params.id))
    }
  return (
    <Container>
      <Col className="text-center my-2" >
        <Link to="/admin/userslist" className="btn btn-sm btn-light" >Go back</Link>
      </Col>
      <Row  >
      <Col className="mx-auto border" md={6} xs={12}>
        {loading && <Progress/> }
        {error && <Alert variant="danger">{error}</Alert>}
            <h1>Edit user</h1>
            <Form onSubmit={submitHandle}>
              <Form.Group controlId='name'>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={fields.name} placeholder="Enter username" required name="name" 
                onChange={inputHandle}></Form.Control>
               </Form.Group>
              <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" value={fields.email} placeholder="Enter email" required name="email"
                onChange={inputHandle}></Form.Control>
               </Form.Group>
               <Form.Group controlId="isAdmin" >
                  <Form.Check
                  type="checkbox" label="Is Admin"
                  value={isAdmin}
                  name="isAdmin"
                  checked={isAdmin}
                  onChange={(e)=>setIsAdmin(e.target.checked)}
                  >
                  </Form.Check>
               </Form.Group>
                <Button disabled={loading===true || loadingUpdate===true}   type="submit" className="btn-sm btn-block my-2" variant="primary">
                  {loadingUpdate ? (
                    <>
                    <div className="spinner-grow text-light" style={{width:"0.8rem",height:"0.8rem"}} role="status"></div>
                    <div className="spinner-grow text-light mx-2" style={{width:"0.8rem",height:"0.8rem"}} role="status"></div>
                    <div className="spinner-grow text-light" style={{width:"0.8rem",height:"0.8rem"}} role="status"></div>
                    </>
                  ):'Update'
                  }
                  </Button>
            </Form>
        </Col>

      </Row>
    </Container >
)
}

export default UserEditScreen

