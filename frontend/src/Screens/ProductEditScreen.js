import React,{useState,useEffect} from 'react'
import {Container,Row,Col, Form,Button, Alert} from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import { Link } from 'react-router-dom'
import {listProductDetails, updateProduct } from '../actions/productActions'
import axios from "axios"
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import Progress from '../components/Progress'
import ButtonLoader from '../components/ButtonLoader'
const ProductEditScreen = ({history,match}) => {
  const productID=match.params.id
  
    const [fields, setFields] = useState({
      name:'',price:'',image:'',brand:'',category:'',countInStock:'',description:''
    })
    const [uploading,setUploading]=useState(false)
    const [msg, setMsg] = useState('')
    const dispatch = useDispatch()
    const {userInfo} =useSelector(state=>state.userLogin)

    const productDetails =useSelector(state=>state.productDetails)
    const {loading,error,product}=productDetails
    
    const productUpdate =useSelector(state=>state.productUpdate)
    const {loading:updateLoading,error:updateError,message,success}=productUpdate
    if(success){
      history.push("/admin/productslist")
      dispatch({type:PRODUCT_UPDATE_RESET})
    }
    useEffect(()=>{
      if(!userInfo || !userInfo.isAdmin  ){
        history.push("/")
      }
      else if(!product.name || product._id!==productID){
        dispatch(listProductDetails(productID))
      }
      else{
        setFields({...fields,
        name:product.name,
        price:product.price,
        image:product.image,
        brand:product.brand,
        category:product.category,
        description:product.description,
        countInStock:product.countInStock,
      })
      }
      // eslint-disable-next-line
    },[dispatch,match,history,productID,product,message])
    const inputHandle=(e)=>{
      let {name,value}=e.target
      setFields((p)=>{
        return {
          ...p,
          [name]:value
        }
      })
    }
    const submitHandle=(e)=>{
      e.preventDefault()
      dispatch(updateProduct(fields,productID))
    }
      const uploadFileHandler=async (e)=>{
    const file=e.target.files[0]
    setMsg(file.name)
    const formData = new FormData()
    formData.append('image',file)
    setUploading(true)
    try{
      const  config ={
        headers:{
          'Content-Type':'multipart/form-data'
        }
      }
      const {data}=await axios.post('/api/uploads',formData,config)
        setFields({...fields,image:data})
      setUploading(false)
    }
    catch(err){
      console.log(err)
      setUploading(true)

    }

  }

  
  return (
    <Container>
      <Col className="col-md-7   mx-auto my-2" >
        <Link to="/admin/productslist" className="btn btn-sm btn-info" >Go back</Link>
      </Col>
      <Row  >
      <Col className="mx-auto border" md={6} xs={12}>
        {updateLoading ?(<Progress/>):updateError?(<Alert variant='danger'> {updateError}</Alert>):(message && <Alert variant='success'> {message}</Alert>)}
        {error && <Alert variant="danger">{error}</Alert>}
            <h1>Edit user</h1>
            <Form onSubmit={submitHandle}>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control size="sm" className="form-control-sm" type="text" value={fields.name} placeholder="Enter product name" required name="name" 
                onChange={inputHandle}></Form.Control>
               </Form.Group>
              <Form.Group controlId='price'>
                <Form.Label>Price($)</Form.Label>
                <Form.Control size="sm" type="text" value={fields.price} placeholder="Enter price" required name="price"
                onChange={inputHandle}></Form.Control>
               </Form.Group>
              <Form.Group controlId='brand'>
                <Form.Label>Brand:-</Form.Label>
                <Form.Control size="sm" type="text" value={fields.brand} placeholder="Enter brand" required name="brand"
                onChange={inputHandle}></Form.Control>
               </Form.Group>
              <Form.Group controlId='category'>
                <Form.Label>Category:-</Form.Label>
                <Form.Control size="sm" type="text" value={fields.category} placeholder="Enter category" required name="category"
                onChange={inputHandle}></Form.Control>
               </Form.Group>
              <Form.Group controlId='image'>
                <Form.Label>Image</Form.Label>
               {uploading && 
               <ButtonLoader/>}
               </Form.Group>
               <Form.Group>
               <Form.File  size="sm" id='image-file' label={msg ? msg: `Choose Image`}  custom
               onChange={uploadFileHandler}/>   

               </Form.Group>
               
              <Form.Group controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control size="sm" type="text" value={fields.description} placeholder="Enter description" required name="description"
                onChange={inputHandle}></Form.Control>
               </Form.Group>
              <Form.Group controlId='countInStock'>
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control size="sm" type="number" value={fields.countInStock} placeholder="Enter countInStock" required name="countInStock"
                onChange={inputHandle}></Form.Control>
               </Form.Group>
                <Button disabled={loading===true}   type="submit" className="  my-2" variant="primary">
                  {updateLoading? (<ButtonLoader/>):'Update'
                  }
                  </Button>
            </Form>
        </Col>

      </Row>
    </Container >
)
}

export default ProductEditScreen
