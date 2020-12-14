import React from 'react'
import {Link} from "react-router-dom"
const Paginate = ({pages,page,isAdmin=false,keyword=''}) => {
  const active = "page-item active"
  return  pages>1 && (
    <nav >
      <ul className="pagination my-2 pagination-sm m-0 mx-auto">
      {page>=2 && <li className="page-item"> 
        <Link to={!isAdmin? keyword ?( `/search/${keyword}/page/${page-1}`):(`/page/${page-1}`):(`/admin/productslist/${page-1}`)} className="page-link" >
          &laquo;
          </Link> 
        </li>}
        {[...Array(pages).keys()].map(x=>(
        <li className={x+1===page?active:'page-item'} key={x+1} >
        <Link to={!isAdmin?keyword ?( `/search/${keyword}/page/${x+1}`):(`/page/${x+1}`):(`/admin/productslist/${x+1}`)} className="page-link">{x+1}</Link>
      </li>
        ))}
        {page<pages && <li className="page-item"> 
        <Link to={!isAdmin?keyword ?( `/search/${keyword}/page/${page+1}`):(`/page/${page+1}`):(`/admin/productslist/${page+1}`)} className="page-link" >
          &raquo;
          </Link> 
        </li>}
      </ul>
    </nav>
    )
}

export default Paginate
