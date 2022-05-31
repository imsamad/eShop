import React, { useEffect } from 'react';
import ButtonLoader from '../components/ButtonLoader';
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Alert,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  let incomplete;
  if (
    !cart.paymentMethod.length ||
    !cart.shippingAddress.city ||
    !cart.shippingAddress.postalCode ||
    !cart.shippingAddress.address ||
    !cart.shippingAddress.country ||
    !cart.cartItems.length
  )
    incomplete = true;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, order, success, error } = orderCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (!userInfo) {
      history.push('/signin?redirect=placeorder');
    } else {
      if (success) {
        dispatch({ type: ORDER_CREATE_RESET });
        history.push(`/order/${order._id}`);
      }
    }
    // eslint-disable-next-line
  }, [success, history, userInfo]);
  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPricee: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  cart.shippingPrice = cart.itemsPrice > 100 ? '5.00' : '10.00';

  cart.taxPrice = Number(0.15 * cart.itemsPrice).toFixed(2);

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.taxPrice) +
    Number(cart.shippingPrice)
  ).toFixed(2);

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              {Object.keys(cart.shippingAddress).length < 4 ? (
                <Alert variant="info">
                  Your shippping address is incomplete.Please fill
                  <Link className="mx-1 btn btn-link p-1" to="/shipping">
                    Shipping
                  </Link>
                  fields.
                </Alert>
              ) : (
                <p>
                  <strong>Address:-</strong>
                  {cart.shippingAddress.address},{cart.shippingAddress.city},
                  {cart.shippingAddress.postalCode},{' '}
                  {cart.shippingAddress.country}
                </p>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method:-</h2>
              {!cart.paymentMethod.length ? (
                <Alert variant="info">
                  Choose one
                  <Link className="mx-1 btn btn-link p-1" to="/payment">
                    Payment
                  </Link>
                  method
                </Alert>
              ) : (
                <>
                  <strong>Method :-</strong>
                  {cart.paymentMethod}
                </>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Alert variant="danger">
                  Your cart is empty.
                  <Link to="/" className="btn btn-link px-1 mx-1">
                    Add
                  </Link>{' '}
                  products to your cart.
                </Alert>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col xs={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} X ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          {!incomplete && (
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Order summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Item </Col>
                    <Col>${cart.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping </Col>
                    <Col>${cart.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${cart.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>${cart.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {error && <Alert variant="danger">{error}</Alert>}
                </ListGroup.Item>

                <ListGroup.Item>
                  <Button
                    disabled={
                      loading === true || cart.cartItems === 0 || incomplete
                    }
                    type="button"
                    className=" btn-success my-2"
                    variant="primary"
                    onClick={placeOrderHandler}
                  >
                    {loading ? <ButtonLoader /> : 'Place Order'}
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          )}
        </Col>
      </Row>
    </>
  );
};
export default PlaceOrderScreen;
