import React from "react";
import { Button } from "react-bootstrap";
import Carousel from "react-elastic-carousel";
import { Link } from "react-router-dom";
import Item from "./item";
import "./style.css";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];
const CarouselApp=({products})=> {
return (
    <>
      <h6 className="text-center text-success" ><i>Top Rated Products</i></h6>
      <div className="Carousel">
        <Carousel breakPoints={breakPoints}>
          {products.map((product,index)=>(
            
          <Item className="carousel-item" key={index} >
            <Link to={`/product/${product._id}`}>
            <img src={product.image} alt={product.name} style={{width:'90%',height:'230px'}} />
            <p className="carousel-item-name" >{product.name},(${product.price})
            </p>
            <Button className="btn btn-success carousel-btn" to={`/product/${product._id}`}>Buy</Button>
            </Link>
          </Item>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default CarouselApp