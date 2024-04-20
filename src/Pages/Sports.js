import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/auth'
import './Pages.css'

const Sports = () => {
    const [sports, setSports] = useState([])
    const [auth, setAuth] = useAuth()

    useEffect(() => {
        fetchAllSports()
    }, [])

    const fetchAllSports = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_SERVER}/api/v1/sports/`)
            setSports(res.data)
            console.log("Sports", sports);
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <>
            <Navbar />
            <div className='flex flex-wrap justify-evenly items-center mt-[20%]'>
                {
                    sports.map((i) => 
                        <div className="card">
                            <div className="card-details">
                                <p className="text-title text-white text-3xl">{i.name.toUpperCase()}</p>
                                {/* <p className="text-body">Here are the details of the card</p> */}
                            </div>
                            <Link><button className='card-button'>{i.name}</button></Link>
                        </div>
                    )}
            </div>
            {/* <Footer /> */}
        </>
    )
}

export default Sports
