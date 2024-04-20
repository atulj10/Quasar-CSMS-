import React, { useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import RegisterForm from '../Components/LoginForm/RegisterForm'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/auth'
import axios from 'axios'
import toast from 'react-hot-toast'

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fullname, setFullname] = useState("")
    const navigate = useNavigate()
    const [auth, setAuth] = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_SERVER}/api/v1/announcements/register`, {
                fullname,
                email,
                password
            });
            if (res && res.data) {
                toast.success("Registered successfully");
                setAuth({
                    user:res.data.user
                })
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <>
            <Navbar />
            <RegisterForm email={email} fullname={fullname} password={password} setEmail={setEmail} setFullname={setFullname} setPassword={setPassword} handleSubmit={handleSubmit} />
            {/* <Footer /> */}
        </>
    )
}

export default Register
