import React, { useEffect, useState } from 'react';
import AnnouncementCard from '../Components/AnnouncementCard/AnnouncementCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { useAuth } from '../Context/auth';
import './Announcement.css'

const Announcement = () => {
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(2);
    const [data, setData] = useState([]);
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [auth, setAuth] = useAuth()

    const headers = {
        // Your headers here, including Authorization header with JWT token
        Authorization: `Bearer ${auth.token}`,
        // Other headers if needed
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            console.log("token in getall :", auth.token);
            const res = await axios.get(`${process.env.REACT_APP_SERVER}/api/v1/announcements/getAll`);
            console.log('API Response:', res.data); // Log API response
            setData(res.data.announcements); // Update data state
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const handleDelete = async ({ id }) => {
        try {
            // console.log("deleting id", id);
            const res = await axios.delete(`${process.env.REACT_APP_SERVER}/api/v1/announcements/${id}`)
            alert("Announcement Deleted")
        } catch (error) {
            console.log(error);
        }
    }

    const addAnnouncement = async (e) => {

        e.preventDefault()
        try {
            //  console.log("title",title);
            //  console.log("content",content);
            const res = await axios.post(`${process.env.REACT_APP_SERVER}/api/v1/announcements/create`, {
                title,
                content
            }, { headers: { authorization: `Bearer ${auth.token}` } })
            alert("Content added")
            fetchData()
        } catch (error) {
            console.log(error);
        }

    }

    const getDate = ({ date }) => {
        try {
            const timestamp = "2024-04-12T21:44:38.313Z";

            const date = new Date(timestamp);

            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
            const day = date.getDate().toString().padStart(2, '0');
            
            const formattedDate = `${year}-${month}-${day}`;

            return formattedDate

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='main-announcement-container'>
            <Navbar />
            <div className='announce-container'>
                <h1 className='text-white text-center text-7xl mb-36 announcement-heading'>ANNOUNCEMENT</h1>
                {auth?.user?.isAdmin &&
                    <div className=' announcement-input flex flex-col justify-center items-center mb-10'>
                        <input className='input my-3' placeholder='TITLE' name='title' value={title} onChange={(e) => { setTitle(e.target.value) }} />
                        <input className='input my-3' placeholder='CONTENT' name='content' value={content} onChange={(e) => { setContent(e.target.value) }} />
                        <button className='w-32 self-center text-green-500 hover:text-white border-solid border-2 border-green-500 hover:bg-green-500 p-2 px-4 transition-all my-3 ' onClick={addAnnouncement}>ADD</button>
                    </div>
                }
                <div class="cards">
                    {data.map((i) => (<div class="card red">
                        <p class="tip text-4xl">{i.title}</p>
                        <p class="second-text">{i.content}</p>
                        <p className='date'>Date: {getDate(i.createdAt)}</p>
                        <div className='flex gap-2'>
                            <button className='update-announcement'>UPDATE</button>
                            <button className='delete-announcement' onClick={handleDelete}>DELETE</button>
                        </div>
                    </div>))}
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default Announcement;
