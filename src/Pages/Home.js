import React, { useEffect } from 'react'
import './Pages.css'
import image from '../Assets/logo (2).jpg'
import football from '../Assets/football.png'
import rugby from '../Assets/rugby-ball.png'
import cricket from '../Assets/cricket.png'
import vollyball from '../Assets/volleyball.png'
import shuttle from '../Assets/shuttlecock.png'
import About from './About'
import Announcement from './Announcement'
import Footer from '../Components/Footer/Footer'
import Navbar from '../Components/Navbar/Navbar'
import { useAuth } from '../Context/auth'
import Gallary from './Gallary'
import Gallery from './Gallary'

const Home = () => {
    const [auth, setAuth] = useAuth()

    useEffect(() => {
        console.log("user token", auth.token)
    }, [auth])
    return (
        <>
            <Navbar />
            <div className='home-container flex justify-between'>
                <div className='main-1 text flex flex-col  text-white z-10'>
                    <div className='mb-44'>
                        <p className='text-4xl text-teal-300 ' style={{ fontFamily: "ABeeZee, sans-serif" }}>IIIT Ranchi Sport</p>
                        <h1 className='text-7xl font-normal' style={{ fontFamily: "Rajdhani, sans-serif" }}>LET THE GAME <br /> BEGIN</h1>
                    </div>
                    <div className='main-2 flex flex-col text-white'>
                        <p className='text-2xl self-start' style={{ fontFamily: "Montserrat,sans-sarif" }}>This is a website that present the IIIT Ranchi <br />Sports community.</p>
                        {/* <div className='flex justify-center mt-3'>
                            <button>Link1</button>
                            <button>Link2</button>
                        </div> */}
                    </div>
                </div>
                <div className='flex z-10'>
                    <h1 className='motto text-white self-center text-7xl text-center' style={{ fontFamily: "Rajdhani,sans-serif", fontWeight: "700" }}>“Overpower. Overtake.<br /> Overcome.” </h1>
                    <img className='banner ' src={image} />
                </div>
                <div className='drop-fade'></div>
            </div>
            {/* <div className='line'>
                <img src={football}/>
                <img src={rugby}/>
                <img src={cricket}/>
                <img src={vollyball}/>
                <img src={shuttle}/>
            </div> */}
            <div className='about-us'>
                <About />
            </div>
            <div className='flex flex-col justify-center items-center bg-black'>
                {/* <h1 className='text-white text-9xl m-8' style={{fontFamily:"Teko,sans-serif"}}>INSTA FEED</h1> */}
                <Gallery />
            </div>


            {/* <Footer /> */}
        </>
    )
}

export default Home
