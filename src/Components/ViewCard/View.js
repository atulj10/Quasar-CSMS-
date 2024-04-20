import React, { useEffect, useState } from 'react';
import './View.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';

const PlayerCard = ({ id, name, phone, description, social, team, year, achievements, basePrice, teamLeader, setFormData, setUpdateId, handleDelete }) => {
    const [read, setRead] = useState(false);
    const [Team, setTeam] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("teams",team);
                const res = await axios.get(`${process.env.REACT_APP_SERVER}/api/v1/teams/${team}`)
                // console.log("Player id in card", id);
                setTeam(res.data.name)
            } catch (error) {
                console.log("Error fetching player data:", error);
            }
        };

        fetchData();
    }, [team]);

    const handleUpdate = (e) => {
        e.preventDefault()
        // console.log("id in card", id)
        setFormData({
            name: name,
            team: team,
            year: year,
            description: description,
            phoneNumber: phone,
            socialMedia: { instagram: social.instagram, twitter: social.twitter },
            achievements: { sports: "sports", text: "something" },
            basePrice: basePrice,
            teamLeader: teamLeader ? true : false
        });
        setUpdateId(id)
    }


    return (
        <div className='player-container'>
            <div className='flex gap-5'>
                <h1 className='text-2xl text-white font-normal bold'>Name : </h1>
                <h1 className='text-2xl text-teal-300 self-center  content'>{name}</h1>
            </div>

            {read && (
                <>
                    <div className='flex gap-2'>
                    <h1 className='text-2xl text-white font-normal bold'>About : </h1>
                        <h1 className='text-2xl text-teal-300 self-center content'>{description}</h1>
                    </div>
                    <div className='flex gap-2'>
                    <h1 className='text-2xl text-white font-normal bold'>Phone Number : </h1>
                        <h1 className='text-2xl text-teal-300 self-center content'>{phone}</h1>
                    </div>
                    <div className='flex gap-2'>
                        <h1 className='text-2xl text-white font-normal bold'>Social Media : </h1>
                        <div className='flex flex-col gap-2 '>
                            <button className='social text-teal-300 text-2xl '><FontAwesomeIcon icon={faInstagram} />&nbsp;&nbsp;{social.instagram}</button>
                            <button className='social text-teal-300 text-2xl '><FontAwesomeIcon icon={faTwitter} />&nbsp;&nbsp;{social.twitter}</button>
                        </div>
                    </div>
                    <div className='flex gap-2'>
                    <h1 className='text-2xl text-white font-normal bold'>Team : </h1>
                        <h1 className='text-2xl text-teal-300 self-end content'>{team? team :"None"}</h1>
                    </div>
                    <div className='flex gap-2'>
                    <h1 className='text-2xl text-white font-normal bold'>Year : </h1>
                        <h1 className='text-2xl text-teal-300 self-end content'>{year}</h1>
                    </div>
                    <div className='flex gap-2'>
                    <h1 className='text-2xl text-white font-normal bold'>Base : </h1>
                        <h1 className='text-2xl text-teal-300 self-end content'>{basePrice}</h1>
                    </div>
                    <div className='flex gap-2'>
                    <h1 className='text-2xl text-white font-normal bold'>Leader : </h1>
                        <h1 className='text-2xl text-teal-300 self-end content'>{teamLeader ? "YES" : "NO"}</h1>
                    </div>
                </>
            )}
            <div>
                <button className='read' onClick={() => setRead(prev => !prev)}>
                    {!read ? "READ MORE" : "READ LESS"}
                </button>
                {/* <button className='update' onClick={handleUpdate}>UPDATE</button> */}
                <button className='delete' onClick={() => { handleDelete({ id }) }}>DELETE</button>
            </div>
        </div>
    );
};

export default PlayerCard;
