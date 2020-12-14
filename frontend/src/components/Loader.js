import React from 'react'

const Loader = ({w,h}) => {
  const style={width:w,height:h}

  return (
    <div className="text-center">
      <hr/>
     <div className="spinner-border"  style={style} ></div>
    </div>
  )
}

export default Loader
