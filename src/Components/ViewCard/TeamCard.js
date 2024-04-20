import React, { useEffect, useState } from 'react';
import './View.css';
import axios from 'axios';

const TeamCard = ({ id, name, players, teamLeader, purse, setTeamData, handleDelete }) => {
    const [read, setRead] = useState(false);
    const [playerData, setPlayerData] = useState([]);
    const [leader, setLeader] = useState("NONE")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const promises = players.map(id =>
                    axios.get(`${process.env.REACT_APP_SERVER}/api/v1/players/${id}`)
                );
                const responses = await Promise.all(promises);
                const playerDetails = responses.map(res => res.data);
                setPlayerData(playerDetails);
            } catch (error) {
                console.log("Error fetching player data:", error);
            }
        };

        fetchData();
        getLeader()
    }, [players]);

    const getLeader = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_SERVER}/api/v1/players/${teamLeader}`)
            setLeader(res.data.name)
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdate = () => {
        setTeamData({
            name: name,
            teamLeader: teamLeader,
            players: players,
            purse: purse
        })
    }

    return (
        <div className='player-container'>
            <div className='flex gap-5'>
                <h1 className='text-2xl text-white font-normal'>Name : </h1>
                <h1 className='text-2xl text-teal-300 self-center'>{name}</h1>
            </div>
            {read && (<>
                <h1 className='text-2xl text-white font-normal'>Leader : <span className='text-teal-300 text-2xl'>{leader}</span></h1>
                <div className='players'>
                    <h1 className='text-white text-2xl font-normal'>Player : </h1>
                    {playerData.map(player => (
                        <span className='text-teal-300 text-2xl' key={player.id}>{player.name} , </span>
                    ))}
                    <h1 className='text-2xl text-white font-normal'>Purse : <span className='text-teal-300 text-2xl'>{purse}</span></h1>
                </div>
            </>
            )}
            <button className='read' onClick={() => setRead(prev => !prev)}>
                {!read ? "READ MORE" : "READ LESS"}
            </button>
            <button className='update' onClick={handleUpdate}>UPDATE</button>
            <button className='delete' onClick={() => { handleDelete({ id }) }}>DELETE</button>

        </div>
    );
};

export default TeamCard;
