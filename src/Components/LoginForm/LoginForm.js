import React from 'react'
import './LoginForm.css'
import video from '../../Assets/loginBackground.mp4'

const LoginForm = ({ email, password, setEmail, setPassword, handleSubmit }) => {
    return (
        <div className='login-container flex-col gap-2'>
            <h1 className='login-heading text-teal-300 text-5xl z-50 font-normal'>LOGIN</h1>
            <div className='main-login z-50'>
                <form className='flex flex-col gap-10' onSubmit={handleSubmit}>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="EMAIL" class="input text-white" name="email" type="text" />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="PASSWORD" class="input text-white" name="passwords" type="password" />
                    <button type={'submit'}>LOGIN</button>
                </form>
            </div>
            {/* <video autoPlay muted loop id="myVideo">
                <source src={video} type="video/mp4" />
            </video> */}
            <div className='backdrop-login'></div>
        </div>
    )
}

export default LoginForm
