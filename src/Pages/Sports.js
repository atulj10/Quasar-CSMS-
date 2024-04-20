import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/auth'

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
            <div className='flex flex-col text-white p-44 text-6xl'>
                {
                    sports.map((i) => (
                    <Link><button className='text-teal-300 hover:text-white border-solid  hover:bg-teal-300  transition-all border-teal-300 border-2 p-5 my-2 w-full'>{i.name}</button></Link>
                        
                ))}
            </div>
            <Footer />
        </>
    )
}

export default Sports
