import React,{useEffect} from 'react'
import {Alert,Container,Row,Col, Button, Table} from "react-bootstrap"
import Loader from '../components/Loader'
import {Link} from "react-router-dom" 
import {useDispatch,useSelector} from "react-redux"
import { deleteUsers, listUsers} from '../actions/userActions'
import { USER_DELETE_RESET } from '../constants/userConstants'
const OrderListScreen = ({history}) => {    
    const dispatch = useDispatch()
    const userLogin=useSelector(state=>state.userLogin)
    const {userInfo}=userLogin

    const userDelete=useSelector(state=>state.userDelete)
    const {error:deleteError,message,loading:deleteLoading}=userDelete
    const userList=useSelector(state=>state.userList)
    const {error:usersError,users,loading:usersLoading}=userList
    useEffect(()=>{
      if(!userInfo || !userInfo.isAdmin){
        history.push("/")
    }
    
    else{
      dispatch(listUsers())
    }
    },[userInfo,history,dispatch,message])
    const deleteHandler=(id)=>{
      if(window.confirm("Are you sure?")){
      dispatch(deleteUsers(id))
      }
      setTimeout(()=>{
        dispatch({type:USER_DELETE_RESET})
      },2000)
    }
    return (
    <Container >
      <Row>
        <Col md={9} className="mx-auto">
          <h2 className="border-bottom" ><i> Users</i></h2>
          {deleteLoading ? ('Deleting...'):deleteError ? (
            <div>{deleteError}</div>
          ):(
            message
          )}

           { usersLoading ?(<Loader w='5rem' h='5rem'/>):usersError?(
              <Alert variant='danger' >{usersError}</Alert>
            ):(
          <Table   striped bordered hover responsive size="sm">
            <thead className="thead-dark" >
              <tr>
                <th>ID</th>
                <th>SINCE</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th colSpan="2" >MANAGE</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user)=>(
              <tr key={user._id} >
              <td>{user._id}</td>
              <td>{user.createdAt.substring(0,10)}</td>
              <td>{user.name}</td>
              <td><a href={`mailto:${user.email}`} >{user.email}</a></td>
              <td>{user.isAdmin ? (
                <i className="fa fa-check" style={{color:'green'}} ></i>
                ):(
                <i className="fa fa-times" style={{color:'red'}} ></i>
              )}</td>
                <td>
                  <Link to={`/admin/user/${user._id}/edit`}  >
                  <Button className="btn btn-sm mx-2 btn-success" ><i className="fa fa-edit" ></i></Button>
                </Link>
                </td>
                  <td> 
                  <Button className="btn btn-sm btn-danger" onClick={()=>deleteHandler(user._id)} ><i className="fa fa-trash" ></i></Button>
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

export default OrderListScreen

