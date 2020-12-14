import React from 'react'
// import PropTypes from 'prop-types'

function Rating({value,text,color}) {
  // console.log("Rating value",value)
  return (
    <div className="font-weight-light font-italic">
      <span className="mr-1" >
      <i style={{color}}  className={value>=1 ? "fa fa-star": value>=0.5 ? "fa fa-star-half-o":" " } ></i>
      </span>
      <span className="mr-1" >
      <i style={{color}}  className={value>=2 ? "fa fa-star": value>=1.5 ? "fa fa-star-half-o":" " } ></i>
      </span>
      <span className="mr-1" >
      <i style={{color}}  className={value>=3 ? "fa fa-star": value>=2.5 ? "fa fa-star-half-o":" " } ></i>
      </span>
      <span className="mr-1" >
      <i style={{color}}  className={value>=4 ? "fa fa-star": value>=3.5 ? "fa fa-star-half-o":" " } ></i>
      </span>
      <span className="mr-1" >
      <i style={{color}}  className={value>=5 ? "fa fa-star": value>=4.5 ? "fa fa-star-half-o":" " } ></i>
      </span>
      {text}
    </div>

  )
}
Rating.defaultProps={
  color:'#f8e825'
}

// Rating.propTypes={
//   value:PropTypes.number.isRequired,
//   text:PropTypes.string.isRequired,
//   color:PropTypes.string
// }
export default Rating
