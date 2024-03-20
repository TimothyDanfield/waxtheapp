import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axiosConfig'
import toast, { Toaster } from 'react-hot-toast'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import './Signin.css'

const Signin = () => {
    const [user, setUser] = useState()
    const [recoveryEmail, setRecoveryEmail] = useState()
    const [login, setLogin] = useState({ 
        email: '',
        password: ''
    })

    const [signup, setSignup] = useState({
        name: '',
        securityQuestion: '',
        securityAnswer: '',
        email: '', 
        password: ''
    })

    const navigate = useNavigate()

    const handleRecoveryEmail = (e) => {
        setRecoveryEmail(e.target.value)
    }

    const handleLogin = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }

    const handleSignup = (e) => {
        setSignup({
            ...signup,
            [e.target.name]: e.target.value
        })
    }

    // Normal login functionality
    const loginUser = async (e) => {
        e.preventDefault()
        if (!login.email || !login.password) {
            toast.error("Please fill out required information")
            return
        };

        try {
            const newUser = await axios.post('http://localhost:3001/user/login', {
                email: login.email,
                password: login.password
            })
            setUser(newUser)
            localStorage.setItem('User', JSON.stringify(newUser.data.user))
            localStorage.setItem('Token', JSON.stringify(newUser.data.token))
            navigate('/profile')
        } catch (error) {
            toast.error("Incorrect username or password")
        }
    };


    const handleForgotPassword = async () => {
        const findUser = await axios.get(`http://localhost:3001/user/user?email=${recoveryEmail}`)
        if(findUser) {
            localStorage.setItem('ForgotPassword', JSON.stringify(recoveryEmail))
            navigate('/forgotpassword')
        } else {
            toast.error("No account associated with that email")
        }
    }


    // Signup Functionality:

    const signUp = async (e) => {
        e.preventDefault()
        try {
            if (!signup.password || !signup.name || !signup.email || !signup.securityQuestion || !signup.securityAnswer) {
                toast.error("Please fill out required information");
            } else {
                const newUser = await axios.post(`http://localhost:3001/user/register`, {
                    name: signup.name,
                    email: signup.email,
                    password: signup.password,
                    securityQuestion: signup.securityQuestion,
                    securityAnswer: signup.securityAnswer
                })
                localStorage.setItem('User', JSON.stringify(newUser.data.user))
                localStorage.setItem('Token', JSON.stringify(newUser.data.token))
                navigate('/profile')
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{ textAlign: "center" }} className="section">
    <div className="container">
        <div className="row full-height justify-content-center">
            <div style={{ width: "100%", textAlign: "center", alignSelf: "center", paddingTop: "2.5rem", paddingBottom: "2.5rem" }} className="col-12 text-center align-self-center">
                <div style={{ paddingBottom: "2.5rem", paddingTop: "2.5rem", textAlign: "center" }} className="section pb-5 pt-5 pt-sm-2 text-center">
                    <h6 style={{ marginBottom: "0", paddingBottom: "0.75rem" }}><span>Log In </span><span>Sign Up</span></h6>
                    <input style={{ marginLeft: "auto", marginRight: "auto" }} className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                    <label htmlFor="reg-log"></label>
                    <div style={{ marginLeft: "auto", marginRight: "auto" }} className="card-3d-wrap mx-auto">
                        <div className="card-3d-wrapper">
                            <div className="card-front">
                                <div className="center-wrap">
                                    <div style={{ textAlign: "center" }} className="section text-center">
                                        <h4 style={{ marginBottom: "1rem", paddingBottom: "0.75rem", color: "#008080" }}>Log In</h4>
                                        <div className="form-group">
                                            <input style={{ marginBottom: "0.75rem" }} type="email" className="form-style" placeholder="Email" name="email" onChange={handleLogin} />
                                        </div>
                                        <div className="form-group mt-2">
                                            <input type="password" style={{ marginBottom: "0.75rem" }} className="form-style" placeholder="Password" name="password" onChange={handleLogin} />
                                        </div>
                                        <div style={{ margin: "1rem 0" }} onClick={loginUser} className="btn m-4 log-in-page-button">Login</div>
                                        <div style={{ margin: "1rem 0" }} className='separator'>
                                            <div className='line'></div>
                                            <div className="text-center or" style={{ color: '#008080' }}>Or</div>
                                            <div className='line'></div>
                                        </div>
                                        <p style={{ marginTop: "1rem", marginBottom: "0" }} className="mb-0 mt-4 text-center">
                                            <Popup
                                                trigger={<div style={{ color: "#008080" }} className='forgotPwd'>Forgot Password?</div>}
                                                position="bottom center"
                                                className='forgotPassword'>
                                                <div className="form-group mt-2">
                                                    <input style={{ marginBottom: "0.75rem", width: '60%'}} onChange={handleRecoveryEmail} type="email" className="form-style" placeholder="Email" />
                                                    <i className="input-icon uil uil-at"></i>
                                                    <button onClick={handleForgotPassword} className="forgotPwdButton">Submit</button>
                                                </div>
                                            </Popup>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="card-back">
                                <div className="center-wrap">
                                    <div style={{ textAlign: "center" }} className="section">
                                        <h4 style={{ marginBottom: "0.75rem", paddingBottom: "0.75rem", color: '#008080' }}>Sign Up</h4>
                                        <div className="form-group">
                                            <input style={{ marginBottom: "0.75rem" }} onChange={handleSignup} type="text" className="form-style" placeholder="Name" name="name"/>
                                            <i className="input-icon uil uil-user"></i>
                                        </div>
                                        <div className="form-group">
                                            <input style={{ marginBottom: "0.75rem" }} onChange={handleSignup} type="email" className="form-style" placeholder="Email" name="email"/>
                                            <i className="input-icon uil uil-at"></i>
                                        </div>
                                        <div className="form-group">
                                            <select style={{ marginBottom: "0.75rem", width: '90%'}} onChange={handleSignup} type="select" className="form-style" placeholder="Security Question" name="securityQuestion">
                                                <option value="N/A">Security Question</option>
                                                <option value="What is your oldest sibling's middle name?">What is your oldest sibling's middle name?</option>
                                                <option value="Where did you meet your spouse?">Where did you meet your spouse?</option>
                                                <option value="What was your first car?">What was your first car?</option>
                                                <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
                                            </select>
                                            <i className="input-icon uil uil-lock-access"></i>
                                        </div>
                                        <div className="form-group">
                                            <input style={{ marginBottom: "0.75rem" }} onChange={handleSignup} type='text' className="form-style" placeholder="Security Question Answer" name="securityAnswer"/>
                                            <i className="input-icon uil uil-comment-alt-question"></i>
                                        </div>
                                        <div className="form-group">
                                            <input style={{ marginBottom: "0.75rem" }} onChange={handleSignup} type="password" className="form-style" placeholder="Password" name="password"/>
                                            <i className="input-icon uil uil-lock-alt"></i>
                                        </div>
                                        <div style={{ marginTop: "1rem" }} onClick={signUp} className="btn mt-4 log-in-page-button">Register</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Toaster />
</div>
    )
}

export default Signin