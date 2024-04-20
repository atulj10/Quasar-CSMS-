import React, { useEffect, useState } from 'react'
import './Pages.css'

const About = () => {
    const [animate, setAimate] = useState(false)

    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        if(scrollPosition>100)
        {
            setAimate(true)
        }
    });


    return (
        <div className='about-container'>
            <div className={`text-white text-9xl ${animate && "about-animation2"}`}>
                <h1 style={{fontFamily:"Rajdhani, sans-serif"}}>ABOUT <br /> US</h1>
            </div>
            <div className={`about-content text-white text-2xl ${animate && "about-animation"}`}>
                <h1 style={{fontFamily:"Montesserate, sans-serif"}}>
                    We are the sports community of <br /> <span>Indian Institute of Information Technology, Ranchi.</span><br />
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took
                </h1>
            </div>
        </div>
    )
}

export default About
