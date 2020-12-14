import React,{useState} from 'react'

const SearchBox = ({history}) => {
  const [keyword,setKeyword]=useState('')
  const submitHandle=(e)=>{
    e.preventDefault()
    keyword.trim() ? history.push(`/search/${keyword}`) : history.push('/')
  }
  return (
    <form className="form-inline my-2 my-lg-0 ml-auto" onSubmit={submitHandle} >
      <input className="form-control  mr-sm-2" type="text" placeholder="Search Products..."
      onChange={(e)=>setKeyword(e.target.value)}
      />
      <button className="btn btn-secondary  my-2 my-sm-1" type="submit">Search</button>
    </form>
  )
}

export default SearchBox
