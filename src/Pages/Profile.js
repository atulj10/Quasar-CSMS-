import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import { useAuth } from '../Context/auth'
import axios from 'axios'
import TeamCard from '../Components/ViewCard/TeamCard'
import PlayerCard from '../Components/ViewCard/View'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp, faPlus, faSubtract } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Profile = () => {
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate()
    const [players, setPlayers] = useState([])
    const [teams, setTeams] = useState([])
    const [updateId, setUpdateId] = useState("")
    const [readPlayerList, setReadPlayerList] = useState(false)
    const [readTeamList, setReadTeamList] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        team: "661bc5de43034f0e5219ab93",
        year: 0,
        sportsName: ["661ff637c4470526fca3e43d"],
        description: "",
        phoneNumber: "",
        socialMedia: { instagram: "", twitter: "" },
        achievements: { sports: "", text: "" },
        basePrice: 500,
        teamLeader: false,
        email: ""
    });
    const [teamData, setTeamData] = useState({
        name: "",
        teamLeader: "",
        players: [""],
        purse: 10000000
    });


    useEffect(() => {
        fetchAllPlayers()
        fetchAllTeams()
    }, [])

    const fetchAllPlayers = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_SERVER}/api/v1/players/`)
            setPlayers(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchAllTeams = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_SERVER}/api/v1/teams/`)
            setTeams(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleTeamChange = (e) => {
        const { name, value } = e.target;
        setTeamData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const addPlayer = async (e) => {
        e.preventDefault();
        try {
            console.log("Form Data", formData);
            const res = await axios.post(`${process.env.REACT_APP_SERVER}/api/v1/players/`, formData);
            // Reset form data after successful submission
            setFormData({
                name: "",
                team: "",
                year: "",
                description: "",
                phoneNumber: "",
                socialMedia: { instagram: "", twitter: "" },
                achievements: { sports: "", text: "" },
                basePrice: 500,
                teamLeader: false,
                email: ""
            });
            alert("Player added successfully")
            fetchAllPlayers(); // Update players list after adding a new player
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async ({ id }) => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_SERVER}/api/v1/players/${id}`)
            alert("deleted successfully")
            fetchAllPlayers()
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteTeam = async ({ id }) => {
        try {
            // console.log(id)
            const res = await axios.delete(`${process.env.REACT_APP_SERVER}/api/v1/teams/${id}`)
            alert("team deleted successfully")
            fetchAllTeams()
        } catch (error) {
            console.log(error);
        }
    }

    const addTeam = async (e) => {
        e.preventDefault();
        try {
            console.log(teamData);
            const res = await axios.post(`${process.env.REACT_APP_SERVER}/api/v1/teams/`, teamData);
            console.log(res.data);
            alert("team added")
            setTeamData({
                ame: "",
                teamLeader: "",
                players: [""],
                purse: 10000000
            })
            fetchAllTeams(); // Update players list after adding a new player
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            // console.log("update id", updateId)

            const data = {
                name: formData.name,
                team: formData.team,
                year: formData.year,
                description: formData.description,
                phoneNumber: formData.phoneNumber,
                socialMedia: { instagram: formData.socialMedia.instagram, twitter: formData.socialMedia.twitter },
                achievements: { sports: formData.achievements.sports, text: formData.achievements.text },
                basePrice: formData.basePrice,
                teamLeader: formData.teamLeader,
                email: formData.email

            }
            // console.log(data)
            const res = await axios.put(`${process.env.REACT_APP_SERVER}/api/players/${updateId}`, { data })
            setFormData({
                name: "",
                team: "",
                year: "",
                description: "",
                phoneNumber: "",
                socialMedia: { instagram: "", twitter: "" },
                achievements: { sports: "", text: "" },
                basePrice: 500,
                teamLeader: false,
                email: ""
            });
            setUpdateId("")

        } catch (error) {
            console.log(error);
        }
    }

    const handleTeamUpdate = async () => {
        try {

        } catch (error) {

        }
    }

    const logOut = () => {
        localStorage.removeItem("auth")
        localStorage.removeItem("token")

        navigate("/")
        window.location.reload()

        toast.success("Logged Out successfully")
    }



    // Function to handle changes in team name input
    const handleNameChange = (e) => {
        setTeamData({ ...teamData, name: e.target.value });
    };

    // Function to handle changes in player input
    const handlePlayerChange = (index, value) => {
        const newPlayers = [...teamData.players];
        newPlayers[index] = value;
        setTeamData({ ...teamData, players: newPlayers });
    };

    // Function to add a new player input field
    const addPlayerInput = () => {
        setTeamData({ ...teamData, players: [...teamData.players, ""] });
    };

    // Function to remove a player input field
    const removePlayerInput = (index) => {
        const newPlayers = [...teamData.players];
        newPlayers.splice(index, 1);
        setTeamData({ ...teamData, players: newPlayers });
    };

    //get player
    const getPlayer = async ({ id }) => {

    }


    return (
        <>
            <Navbar />
            <div className='profile-container '>
                <div>
                    <div>
                        <div className='flex gap-10'>
                            <h1 className='text-5xl text-white font-normal ' style={{ fontFamily: "Teko,sans-serif" }}>NAME :</h1>
                            <h1 className='text-3xl text-teal-300 self-center' style={{ fontFamily: "Poppins,sans-serif" }}>{auth?.user?.fullname}</h1>
                        </div>
                        <div className='flex gap-10'>
                            <h1 className='text-5xl text-white font-normal' style={{ fontFamily: "Teko,sans-serif" }}>EMAIL :</h1>
                            <h1 className='text-3xl text-teal-300 self-center' style={{ fontFamily: "Poppins,sans-serif" }}>{auth?.user?.email}</h1>
                        </div>
                        <button className='text-red-700 text-1xl border border-[2px] border-solid border-red-700  hover:text-black hover:bg-red-700  p-2  mt-5' onClick={logOut}>SIGN OUT</button>
                    </div>
                    {auth?.user?.isAdmin &&
                        <>
                            <div className=''>
                                {/* <h1 className='text-white text-7xl font-normal' style={{ fontFamily: "Montserrat,sans-serif" }}><b>PLAYERS</b></h1> */}
                                <div className='playerForm flex flex-col items-start '>
                                    {/* <h1 className='text-white text-6xl m-10 ml-3 '  style={{fontFamily:"Rajdhani,sans-serif"}}>CREATE A PLAYER</h1>
                                    <input type='text' name='team' placeholder='TEAM' value={formData.team} onChange={handleChange} />
                                    <div className="create-player">
                                        <div>
                                            <input style={{fontFamily:"Source Code Pro,monospace"}} className='input m-3 text-gray-400' type='text' name='name' placeholder='NAME' value={formData.name} onChange={handleChange} />
                                            <input style={{fontFamily:"Source Code Pro,monospace"}} className='input m-3 text-gray-400' type='year' name='year' placeholder='YEAR' value={formData.year} onChange={handleChange} />
                                            <input style={{fontFamily:"Source Code Pro,monospace"}} className='input m-3 text-gray-400' type='text' name='description' placeholder='ABOUT YOU' value={formData.description} onChange={handleChange} />

                                        </div>
                                        <div>
                                            <input style={{fontFamily:"Source Code Pro,monospace"}} className='input m-3 text-gray-400' type='text' name='phoneNumber' placeholder='PHONE' value={formData.phoneNumber} onChange={handleChange} />
                                            <input style={{fontFamily:"Source Code Pro,monospace"}} className='input m-3 text-gray-400' type='text' name='instagram' placeholder='INSTAGRAM' value={formData.socialMedia.instagram} onChange={(e) => setFormData(prevState => ({ ...prevState, socialMedia: { ...prevState.socialMedia, instagram: e.target.value } }))} />
                                            <input style={{fontFamily:"Source Code Pro,monospace"}} className='input m-3 text-gray-400' type='text' name='twitter' placeholder='TWITTER' value={formData.socialMedia.twitter} onChange={(e) => setFormData(prevState => ({ ...prevState, socialMedia: { ...prevState.socialMedia, twitter: e.target.value } }))} />
                                        </div>
                                        <div>
                                            <input style={{fontFamily:"Source Code Pro,monospace"}} className='input m-3 text-gray-400' type='text' name='sports' placeholder='SPORTS' value={formData.achievements.sports} onChange={(e) => setFormData(prevState => ({ ...prevState, achievements: { ...prevState.achievements, sports: e.target.value } }))} />
                                            <input style={{fontFamily:"Source Code Pro,monospace"}} className='input m-3 text-gray-400' type='text' name='text' placeholder='TEXT' value={formData.achievements.text} onChange={(e) => setFormData(prevState => ({ ...prevState, achievements: { ...prevState.achievements, text: e.target.value } }))} />
                                            <input style={{fontFamily:"Source Code Pro,monospace"}} className='input m-3 text-gray-400' type='number' name='basePrice' placeholder='BASE VALUE' value={formData.basePrice} onChange={handleChange} />
                                        </div>
                                        <div className=''>
                                            <input style={{fontFamily:"Source Code Pro,monospace"}} className='input m-3 text-gray-400' type='bool' name='teamLeader' placeholder='LEADER' value={formData.teamLeader} onChange={handleChange} />
                                            <input style={{fontFamily:"Source Code Pro,monospace"}} className='input m-3 text-gray-400' type='email' name='email' placeholder='EMAIL' value={formData.email} onChange={handleChange} />
                                        </div>
                                        <div className='flex self-start ml-4 mt-3'>
                                            <button style={{fontFamily:"Rajdhani,sans-serif",fontSize:"1.5rem"}} onClick={addPlayer} className='read'><p className='px-3'>ADD</p></button>
                                            <button className='update ' style={{ marginLeft: "10px" ,fontFamily:"Rajdhani,sans-serif",fontSize:"1.5rem"}} onClick={handleUpdate}><p className=' px-3'>UPDATE</p></button>
                                        </div>
                                    </div> */}
                                </div>
                                <div>
                                    <h1 className='text-white text-4xl m-10 ml-3 cursor-pointer' onClick={() => setReadPlayerList(prev => !prev)} style={{ fontFamily: "ABee Zee ,sans-serif" }}>PLAYER LIST &nbsp;&nbsp;<FontAwesomeIcon icon={readPlayerList ? faAngleUp : faAngleDown} /></h1>
                                    {readPlayerList &&
                                        <div>
                                            {players.map((p) =>
                                                <PlayerCard id={p._id} name={p.name} description={p.description} phone={p.phoneNumber} social={p.socialMedia} year={p.year} team={p.team} achievements={p.achievements} basePrice={p.basePrice} teamLeader={p.teamLeader} setFormData={setFormData} setUpdateId={setUpdateId} handleDelete={handleDelete} />
                                            )}
                                        </div>}
                                </div>
                            </div>
                            <div className='mt-10 '>
                                {/* <h1 className='text-white text-7xl' style={{ fontFamily: "Montserrat,sans-serif" }}><b>TEAMS</b></h1> */}
                                <div className='teamForm flex flex-col'>
                                    {/* <h1 className='text-white text-6xl m-10 ml-3' style={{fontFamily:"Rajdhani,sans-serif"}}>CREATE A TEAM</h1> */}
                                    {/* <input style={{fontFamily:"Source Code Pro,monospace"}} placeholder='TEAM' className='input my-3 mt-9 self-start text-white' type="text" id="teamName" value={teamData.name} onChange={handleNameChange} /> */}
                                    {/* {teamData.players.map((player, index) => (
                                        <div key={index}>
                                            <input className='input'
                                                placeholder='PLAYER'
                                                type="text"
                                                value={player}
                                                onChange={(e) => handlePlayerChange(index, e.target.value)}
                                            />
                                            <button style={{fontFamily:"Rajdhani,sans-serif",fontSize:"1.5rem"}} className='text-teal-300 border-solid border-teal-400 border-2 p-2 mx-2' onClick={() => removePlayerInput(index)}>Remove</button>
                                        </div>
                                    ))} */}
                                    {/* <button style={{fontFamily:"Rajdhani,sans-serif",fontSize:"1.5rem"}} className='text-teal-300 border-solid border-teal-400 border-2 p-2 my-2 w-32' onClick={addPlayerInput}>Add Player</button> */}
                                    {/* <input style={{fontFamily:"Source Code Pro,monospace"}} placeholder='TEAM LEADER' className='text-white input my-2 self-start' type="text" id="teamLeader" value={teamData.teamLeader} onChange={(e) => {
                                        setTeamData(prevState => ({
                                            ...prevState,
                                            teamLeader: e.target.value
                                        }));
                                    }} />
                                    <input placeholder='TEAM' className='text-white input my-2 self-start' type="number" id="purse" value={teamData.purse} onChange={(e) => {
                                        setTeamData(prevState => ({
                                            ...prevState,
                                            purse: e.target.value
                                        }));
                                    }} />
                                </div>
                                <div className='flex gap-5'>
                                    <button style={{fontFamily:"Rajdhani,sans-serif",fontSize:"1.5rem"}} className='text-teal-300 hover:text-black border-solid  hover:bg-teal-300  transition-all border-teal-300 border-2  my-2 w-32 font-semibold' onClick={addTeam}>ADD TEAM</button>
                                    <button style={{fontFamily:"Rajdhani,sans-serif",fontSize:"1.5rem"}} className='text-green-300 hover:text-black border-solid hover:bg-green-300 transition-all   border-green-300 border-2 p-1 my-2 w-32 font-semibold' onClick={handleTeamUpdate}>UPDATE TEAM</button>
                                </div>
                                <div> */}
                                    <h1 className='text-white text-4xl mb-10  ml-3 cursor-pointer' onClick={() => setReadTeamList(prev => !prev)} style={{ fontFamily: "ABee Zee ,sans-serif" }}>TEAM LIST &nbsp;&nbsp;<FontAwesomeIcon icon={readTeamList ? faAngleUp : faAngleDown} /></h1>
                                    {readTeamList && <div>
                                        {teams.map((p) =>
                                            <TeamCard id={p._id} name={p.name} teamLeader={p.teamLeader} purse={p.purse} players={p.players} setTeamData={setTeamData} handleDelete={handleDeleteTeam} />
                                        )}
                                    </div>}
                                </div>
                                <div className='profile-backdrop'></div>
                            </div>
                        </>
                    }
                </div>

            </div>
            {/* <Footer /> */}
        </>
    )
}


export default Profile;
