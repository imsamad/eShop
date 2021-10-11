import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Ratings';
const Product = ({ product }) => {
  console.log('product.image', product.image);
  return (
    <Card className="my-3 p-1 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          className="border"
          variant="top"
          style={{ height: '250px', width: '100%' }}
        />
      </Link>
      <Card.Body>
        <Card.Title as="div">
          <Link to={`/product/${product._id}`}>
            <strong className="text-success">{product.name}</strong>
          </Link>
        </Card.Title>

        <Card.Text as="div">
          <div className="my-3">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </div>
        </Card.Text>

        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
