import React, { useEffect } from 'react';
import { Container, Row, Col, Button, Alert, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  productLists,
  deleteProduct,
  createProduct,
} from '../actions/productActions';
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from '../constants/productConstants';

import Paginate from '../components/Paginate';
import Progress from '../components/Progress';
import Loader from '../components/Loader';

const ProductsListScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const pageNumber = match.params.pageNumber || 1;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productList = useSelector((state) => state.productList);
  const { error, products, pages, page, loading } = productList;
  const productDelete = useSelector((state) => state.productDelete);
  const {
    error: deleteError,
    loading: deleteLoading,
    success,
    message: deleteMessage,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    success: successCreate,
    error: createError,
    loading: createLoading,
    product,
  } = productCreate;
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      history.push(`/admin/product/${product._id}/edit`);
    }
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/signin');
    } else {
      dispatch(productLists('', pageNumber));
    }
    if (success) {
      dispatch({ type: PRODUCT_DELETE_RESET });
      dispatch(productLists('', pageNumber));
    }
    // eslint-disable-next-line
  }, [history, dispatch, userInfo, success, successCreate, pageNumber]);
  const createProductHandler = () => {
    dispatch(createProduct());
  };
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id));
    }
  };
  return (
    <Container>
      <Row className="align-items-center">
        <Col>
          <h2 className="text-success">Products</h2>
        </Col>
        <Col className="text-right">
          <Button
            className="btn btn-sm btn-success"
            onClick={createProductHandler}
          >
            <i className="fa mx-1 fa-plus"></i>Create Product
          </Button>
        </Col>
      </Row>
      <Row>
        <Paginate page={page} pages={pages} isAdmin={true} />
      </Row>
      <Row>
        <Col className="mx-auto">
          {createLoading ? <Progress /> : createError && createError}
          {deleteLoading ? (
            <Progress />
          ) : deleteError ? (
            <Alert variant="danger"> {deleteError}</Alert>
          ) : (
            deleteMessage && <Alert variant="success"> {deleteMessage}</Alert>
          )}
          {loading ? (
            <Loader w="5rem" h="5rem" />
          ) : error ? (
            <div>
              <Alert variant="danger"> {error}</Alert>
            </div>
          ) : (
            <Table striped bordered hover responsive size="sm">
              <thead className="thead-dark">
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE($)</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th colSpan="2">MANAGE</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <Button className="btn btn-sm mx-2 btn-success">
                          <i className="fa fa-edit"></i>
                        </Button>
                      </Link>
                    </td>
                    <td>
                      <Button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <i className="fa fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductsListScreen;
