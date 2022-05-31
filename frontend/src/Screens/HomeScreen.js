import React, { useEffect } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import Product from '../components/Product';
import { useSelector, useDispatch } from 'react-redux';
import { productLists } from '../actions/productActions';
import { Link } from 'react-router-dom';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import Carousel from '../components/Carousel/Carousel';
import Loader from '../components/Loader';
const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const productList = useSelector((state) => state.productList);
  const { loading, products, error, pages, page } = productList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productLists(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
  return (
    <>
      <Meta title="Welcome to eShop | Home" />
      {!keyword && <Carousel products={products && products} />}
      {keyword && (
        <Link to="/" className="btn btn-success btn-sm">
          Go Back
        </Link>
      )}
      <h1 className="text-success">Latest Products</h1>
      <Paginate page={page} pages={pages} keyword={keyword} />
      <Row>
        {loading ? (
          <Col>
            <Loader w="8rem" h="4px" />
          </Col>
        ) : error ? (
          <Col>
            <Alert variant="danger">{error}</Alert>
          </Col>
        ) : (
          products.map((product) => (
            <Col
              key={product._id}
              className="p-2 p-sm-0  "
              sm={6}
              md={4}
              lg={4}
              xl={3}
            >
              <Product product={product} />
            </Col>
          ))
        )}
      </Row>
    </>
  );
};

export default HomeScreen;
