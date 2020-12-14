import ButtonLoader from "../components/ButtonLoader"
import React, { useEffect,useState } from 'react'
import {Link }from "react-router-dom"
import {Row,Col,Image,ListGroup,Card,Button,  Alert, Form} from "react-bootstrap"
import Rating from '../components/Ratings'
import {useDispatch,useSelector} from "react-redux"
import {listProductDetails,createProductReview} from "../actions/productActions"
import {PRODUCT_CREATE_REVIEW_RESET} from "../constants/productConstants"
import Meta from '../components/Meta'
import Loader from "../components/Loader"
import Progress from '../components/Progress'
const ProductScreen = ({match,history}) => {
  const [qty, setQty] = useState(1)
  const [review, setReview] = useState({ rating:0 , comment:''})

  const productDetails= useSelector(state=>state.productDetails)
  const {loading,error,product}=productDetails
  
  const productReview= useSelector(state=>state.productReviewCreate)
  const {loading:reviewLoading,error:reviewError,success:reviewSuccesss,message}=productReview

  const {userInfo}= useSelector(state=>state.userLogin)
  const dispatch = useDispatch()
  useEffect(()=>{
    if(product._id!==match.params.id || reviewSuccesss){
    reviewSuccesss && dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
    dispatch(listProductDetails(match.params.id))
  }

  },[dispatch,match.params.id,product._id,product,reviewSuccesss,reviewLoading])

  const addToCartHandler=()=>{
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }
  const submitHandler=(e)=>{
    e.preventDefault()
    dispatch(createProductReview(match.params.id,review))
    setReview({rating:0,comment:''})

  }
  return (
    <>
      <Link to="/" className="btn btn-success btn-sm" >Go Back</Link>
      <Row className="my-2" >
       {loading ? (
              <Col className="text-center pt-5 " >
                <Loader w="8rem" h="4px"/>
             </Col>
        ):
        error?(
            <Col>
              <Alert variant="danger">{error}</Alert>
          </Col>
        ):(
        <>
        <Meta title={product.name}/>
        <Col md={5} >
          <Image src={product.image}  className="card-img-top" alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3 className="text-success">{product.name  }</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
            </ListGroup.Item>
            <ListGroup.Item>
             <b> Price </b>:- ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
              <b>Description:-</b>{product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
        <Card>
          <ListGroup variant="flush">
          <ListGroup.Item>
              <Row>
        <Col>Price:-</Col>
               <Col><strong>${product.price}</strong> </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
        <Col>Status:-</Col>
              <Col> {product.countInStock?'In stock':'Out Of stock'}</Col>
              </Row>
            </ListGroup.Item>
            {
              product.countInStock>0 && (
                <ListGroup.Item>
                  <Row>
                    <>
                    <p className="w-50 text-center">Qty:-</p>
                    <Form style={{width:'50%'}} >
                    <Form.Group >
                    <Form.Control custom as='select' size="sm"  
                    onChange={(e)=>setQty(e.target.value)} > 
                    {/* <option key='' value=''  >Qty:-</option> */}
                    {[...Array(product.countInStock).keys()].map(x=>(
                    <option key={x+1} value={x+1}>{x+1}</option> 
                    ))}
                </Form.Control>
                </Form.Group></Form>
                    </>
                  </Row>
                </ListGroup.Item>
              )
            }
            <ListGroup.Item>
              <Button
              onClick={addToCartHandler}
              className="btn-block btn-success " disabled={product.countInStock===0} type="button">Add To Cart</Button>
            </ListGroup.Item>
            
          </ListGroup>
        </Card>
        </Col>
        </> 
        )}
      </Row>
      <Row>
        <Col md={6}>
          <hr/>
        <h2>REVIEWS</h2>
        { product.reviews.length===0 ? <Alert variant="danger" >No reviews</Alert>:(
        <ListGroup variant="flush">
          {product.reviews.map((review)=>(
          <ListGroup.Item key={review._id} >
            <Row>
              <Col className="col-2">
              <img src="/images/avatar.png" style={{width:'100% '}} alt="name" className="" />
              </Col>
              <Col className="col-10">
                    <span><h6 className="my-0" >{review.name}</h6></span>
                <span><small className=" text-muted">{review.createdAt.substring(0,10)}</small>
                    
                    </span>
                <p className="my-0" > 
                <small><Rating value={review.rating} text=" "  /></small>
                </p>
                <p>{review.comment}</p>
                <p id="onHover" className="text-right my-0">
                  <div className="onHoverItems">
                  <Button className="btn-sm p-1 px-2 btn-light mx-1"  title="Edit" >
                  <i className="fa p-0 m-0 fa-edit"></i></Button>
                  <Button className="btn-sm  p-1  px-2 btn-light mx-1" title="Delete" >
                  <i className="fa fa-trash"></i>
                </Button>
                </div></p>
              </Col>
            </Row>
          </ListGroup.Item>
          ))}
        </ListGroup>
        )}
        {message && <Alert variant="success" >{message}</Alert>} 
        {reviewError && <Alert variant="danger" >{reviewError}</Alert>}
          <h2>Write a customer review.</h2>
              {reviewLoading && <Progress/>}
          {!userInfo ? <Alert variant="info">Please<Link to={`/signin?redirect=product/${match.params.id}`} className="text-dark mx-1 btn btn-sm btn-light">Sign In</Link>to write a review.</Alert>:(
            <Form onSubmit={submitHandler} className="border p-2">
              <Form.Group>
                <Form.Label><i className="fa fa-star"></i> Ratings:- </Form.Label>
                <Form.Control custom as='select' value={review.rating}
                onChange={(e)=>setReview({...review,rating:e.target.value})}>
                    <option value=''>Select...</option>
                    <option value='1'>1 - Poor </option>
                    <option value='2'>2 - Fair </option>
                    <option value='3'>3 - Good </option>
                    <option value='4'>4 - Very Good </option>
                    <option value='5'>5 - Excellent </option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Comments:-</Form.Label>
                <Form.Control as="textarea" row="3" value={review.comment}
                onChange={(e)=>setReview({...review,comment:e.target.value})}>
                </Form.Control>
              </Form.Group>
                <Button type="submit" className="btn btn-success mt-2">
                  {reviewLoading ?<ButtonLoader/>:'Submit'}
                </Button>
            </Form>
)}
        </Col>
      </Row>      
    </>
  )
}

export default ProductScreen
