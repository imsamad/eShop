import React from 'react'
import {Link }from "react-router-dom"

const CheckoutSteps = ({step1, step2, step3, step4}) => {
  return (
    <div className="col-md-10 col-12 mx-auto shadow my-1 ">
    <nav className="nav justify-content-around">
    {step1? (
          <Link to="/signin" className="nav-link text-success"><p>Sign In <i className="fa fa-check  mx-1"></i> </p></Link>
    ):
    (
      <Link to="/signin" className="nav-link disabled text-danger"><p>Sign In<i className="fa fa-times mx-1"></i></p></Link>

    )}

    {step2? (
          <Link to="/shipping" className="nav-link text-success"><p>Shipping<i className="fa fa-check  mx-1"></i></p></Link>
    ):
    (
      <Link to="/shipping" className="nav-link disabled text-danger"><p>Shipping<i className="fa fa-times mx-1"></i></p></Link>

    )}
    {step3? (
          <Link to="/payment" className="nav-link text-success"><p>Payment<i className="fa fa-check  mx-1"></i></p></Link>
    ):
    (
      <Link to="/payment" className="nav-link disabled text-danger"><p>Payment<i className="fa fa-times mx-1"></i></p></Link>

    )}
    {step4? (
          <Link to="/placeorder" className="nav-link text-success"><p>Place Order<i className="fa fa-check  mx-1"></i></p></Link>
    ):
    (
      <Link to="/placeorder" className="nav-link disabled text-danger"><p>Place Order<i className="fa fa-times mx-1"></i></p></Link>

    )}
    </nav>  
    </div>
    )
}

export default CheckoutSteps
