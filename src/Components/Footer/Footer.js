import React from 'react'
import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
    return (
        <div className='footer-container'>
            {/* <div className='flex flex-col'>
                <h1 className='text-3xl'>AUTHORs:</h1>
                <h1 className='text-2xl'>Irfan Ansari</h1>
                <h1 className='text-2xl'>Mohit Kumar</h1>
                <h1 className='text-2xl'>Abhishek Anand</h1>
                <h1 className='text-2xl'>Atul Anand</h1>
            </div> */}
            <div className='text-center cursor-pointer'>
                <FontAwesomeIcon icon={faEnvelope} className='fa-2xl' />
                <h1 className='text-2xl'>sportsiiitr@gmail.com</h1>
            </div>
            <div className='social-media flex gap-5'>
                <button><FontAwesomeIcon className='fa-2xl' icon={faInstagram} /></button>
                <button><FontAwesomeIcon className='fa-2xl' icon={faTwitter} /></button>
                <button><FontAwesomeIcon className='fa-2xl' icon={faDiscord} /></button>
            </div>
        </div>
    )
}

export default Footer
