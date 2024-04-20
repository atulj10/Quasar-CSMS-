import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import axios from 'axios';
import './Matches.css';
import { useAuth } from '../Context/auth';

const Matches = () => {
    const [matches, setMatches] = useState([]);
    const [auth, setAuth] = useAuth()
    const [teamA, setTeamA] = useState("")
    const [teamB, setTeamB] = useState("")
    const [teamAscore, setTeamAscore] = useState("")
    const [teamBscore, setTeamBscore] = useState("")
    const [updateId,setUpdateId]=useState("")

    const fetchAllMatches = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_SERVER}/api/v1/matches/`);
            console.log(res.data);
            setMatches(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdate=async()=>{
        try {
            const res=await axios.patch(`${process.env.REACT_APP_SERVER}/api/v1/matches/${updateId}`)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAllMatches();
    }, []);

    return (
        <div className='flex flex-col'>
            <Navbar />
            {auth?.user?.isAdmin &&
                <>
                    <div className='points-table self-center justify-center mt-32 flex  gap-4'>
                        <div className='team-score flex flex-col gap-5 w-44'>
                            <input placeholder='TEAM A' className='input w-[50%]' type='text' value={teamA} onChange={(e) => setTeamA(e.target.value)} />
                            <input placeholder='SCORE' className='input w-[50%]' type='text' value={teamAscore} onChange={(e) => setTeamAscore(e.target.value)} />
                        </div>
                        <div className='team-score flex flex-col gap-5 w-44'>
                            <input placeholder='TEAM B' className='input w-[50%]' type='text' value={teamB} onChange={(e) => setTeamB(e.target.value)} />
                            <input placeholder='SCORE' className='input w-[50%]' type='text' value={teamBscore} onChange={(e) => setTeamBscore(e.target.value)} />
                        </div>
                    </div>
                    <button className='self-center text-teal-300 hover:bg-teal-300 hover:text-black transition-all border-2 border-teal-300 py-2 px-4 rounded-lg mt-6' onClick={handleUpdate}>UPDATE</button>
                </>
            }
            <div className='flex flex-wrap justify-evenly mt-24 gap-11'>
                {matches.map((match) =>
                    <div className="card2" key={match._id}> {/* Assuming each match has a unique identifier like _id */}
                        <div className="card-inner">
                            <div className="card-front">
                                <p className='text-5xl font-medium' style={{ fontFamily: "Rajdhani,sans-serif" }}>{match.teamA} V/S {match.teamB}</p>
                            </div>
                            <div className="card-back flex flex-col">
                                <div className=' flex gap-7'>
                                    <div className='flex flex-col gap-4'>
                                        <p className='text-4xl' style={{ fontFamily: "Teko,sans-serif" }}>{match.teamA}</p>
                                        <p className='self-center text-5xl' style={{ fontFamily: "Teko,sans-serif" }}>{match.pointsA}</p>
                                    </div>
                                    <div className='flex flex-col gap-4'>
                                        <p className='text-4xl' style={{ fontFamily: "Teko,sans-serif" }}>{match.teamB}</p>
                                        <p className='self-center text-5xl' style={{ fontFamily: "Teko,sans-serif" }}>{match.pointsB}</p>
                                    </div>
                                </div>
                                {auth?.user?.isAdmin &&
                                    <button className='self-center text-teal-300 hover:bg-teal-300 hover:text-black transition-all border-2 border-teal-300 py-2 px-4 rounded-lg ' style={{ fontSize: "1rem" }} onClick={() => {
                                        setTeamA(match.teamA)
                                        setTeamB(match.teamB)
                                        setTeamAscore(match.pointsA)
                                        setTeamBscore(match.pointsB)
                                        setUpdateId(match._id)
                                    }}>UPDATE</button>}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Matches;
