import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../../Context/auth'

const Navbar = () => {
  const [auth, setAuth] = useAuth()

  return (
    <div className='w-100 flex justify-center'>
      <div className='nav-container flex-col'>
        <div className='non-hover'>
          <h1>HOVER</h1>
        </div>
        <div className='hover'>
          {!auth.user ? (
            <div className='flex gap-5'>
              <Link to={'/'} className='link'><h1 style={{ fontFamily: "" }}>HOME</h1></Link>
              <h1> | </h1>
              <Link to={'/login'} className='link'><h1 style={{ fontFamily: "Montserrat,sans-sarif" }}>LOGIN</h1></Link>
              <h1 style={{ fontFamily: "Montserrat,sans-sarif" }}> | </h1>
              <Link to={'/register'} className='link'><h1 style={{ fontFamily: "Montserrat,sans-sarif" }}>REGISTER</h1></Link>
            </div>) :
            (
              <div className=' gap-5 flex ' >
                <Link to={'/'} className='link'><h1 style={{ fontFamily: "Montserrat,sans-sarif" }}>HOME</h1></Link>
                <h1 style={{ fontFamily: "Montserrat,sans-sarif" }}> | </h1>
                <Link to={'/profile'} className='link'><h1 style={{ fontFamily: "Montserrat,sans-sarif" }}>{auth?.user?.isAdmin ? "Admin Panel" : "User Panel"}</h1></Link>
                <h1 style={{ fontFamily: "Montserrat,sans-sarif" }}> | </h1>
                <Link to={'/schedule'} className='link'><h1 style={{ fontFamily: "Montserrat,sans-sarif" }}>SCHEDULE</h1></Link>
                <h1 style={{ fontFamily: "Montserrat,sans-sarif" }}> | </h1>
                {/* <Link to={'/live'} className='link'></Link> */}
                <a href='https://6623564d75419a0007a9b4f4--csms-livestream.netlify.app/ '><h1 style={{ fontFamily: "Montserrat,sans-sarif" }}>LIVE</h1> </a>
                <h1 style={{ fontFamily: "Montserrat,sans-sarif" }}> | </h1>
                <Link to={'/auction'} className='link'><h1 style={{ fontFamily: "Montserrat,sans-sarif" }}>AUCTION</h1></Link>
                <h1 style={{ fontFamily: "Montserrat,sans-sarif" }}> | </h1>
                <Link to={'/announcement'} className='link'><h1 style={{ fontFamily: "Montserrat,sans-sarif" }}>ANNOUNCEMENT</h1></Link>
                <h1 style={{ fontFamily: "Montserrat,sans-sarif" }}> | </h1>
                <Link to={'/sports'}>SPORTS</Link>
                {/* <h1 style={{ fontFamily: "Montserrat,sans-sarif" }}> | </h1>
                <Link to={'/matches'}>MATCHES</Link> */}
              </div>)}
        </div>
      </div>
    </div>
  )
}

export default Navbar
