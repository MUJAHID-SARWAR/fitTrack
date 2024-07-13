import { Link } from "react-router-dom"


const Navbar = () => {
  return (
   <header>
    <div className="container">
        <Link to='/'>
        <h1>fitTrack</h1>

        </Link>
    {/* <div className="right-items">
      <h5>Login</h5>
      <h5>Signup</h5>
    </div> */}
    </div>
   </header>
  )
}

export default Navbar
