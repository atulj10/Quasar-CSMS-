import React from 'react'
import './AnnouncementCard.css'
import { useAuth } from '../../Context/auth'

const AnnouncementCard = ({ id, title, description, setTitle, setContent, handleDelete }) => {
    const [auth, setAuth] = useAuth()

    const handleUpdate = () => {
           setTitle(title)
           setContent(description)
    }
    return (
        <div className='card-container text-white'>
            <h1 className='text-3xl'><b>{title}</b></h1>
            <h3 className='text-2xl'>{description}</h3>
            {auth.user.isAdmin &&
                <div className='flex gap-4 justify-center'>
                    <button className='text-red-500 hover:text-white border-solid border-2 border-red-500 hover:bg-red-500 p-2 px-4 transition-all my-3 ' onClick={() => { handleDelete({ id }) }}>DELETE</button>
                    <button className='text-teal-300 hover:text-white border-solid border-2 hover:bg-teal-300 border-teal-300 p-2 px-4 transition-all my-3 ' onClick={handleUpdate}>UPDATE</button>
                </div>
            }
        </div>
    )
}

export default AnnouncementCard
