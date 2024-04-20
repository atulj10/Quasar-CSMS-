import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../../Context/auth'

const Navbar = () => {
  const [auth, setAuth] = useAuth()

  return (
    <div className='nav-container'>
      <div className='flex'>
        <div className='non-hover'>
          <h1>{auth.user ? auth.user.email : "HOVER"}</h1>
        </div>
        <div className='hover'>
          {!auth.user ? (
            <>
              <Link to={'/'} className='link'><h1>HOME</h1></Link>
              <h1> | </h1>
              <Link to={'/login'} className='link'><h1>LOGIN</h1></Link>
              <h1> | </h1>
              <Link to={'/register'} className='link'><h1>REGISTER</h1></Link>
            </>) :
            (
              <>
                <Link to={'/'} className='link'><h1>HOME</h1></Link>
                <h1> | </h1>
                <Link to={'/profile'} className='link'><h1>{auth.user.fullname}</h1></Link>
                <h1> | </h1>
                <Link to={'/schedule'} className='link'><h1>SCHEDULE</h1></Link>
                <h1> | </h1>
                <Link to={'/live'} className='link'><h1>LIVE</h1></Link>
                <h1> | </h1>
                <Link to={'/auction'} className='link'><h1>AUCTION</h1></Link>
                <h1> | </h1>
                <Link to={'/announcement'} className='link'><h1>ANNOUNCEMENT</h1></Link>
                <h1> | </h1>
                <Link to={'/sports'}>SPORTS</Link>
              </>)}
        </div>
      </div>
      <div className='logo'>
        <h1>LOGO</h1>
      </div>
    </div>
  )
}

export default Navbar
