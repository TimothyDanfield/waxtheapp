import React from 'react'
import { useEffect, useState } from 'react'
import axios from '../../utils/axiosConfig'
import { useNavigate } from 'react-router-dom'
import "./ForgotPassword.css"

const ForgotPassword = () => {
    const [user, setUser] = useState('')
    const [securityAnswer, setSecurityAnswer] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const navigate = useNavigate()

    const email = JSON.parse(localStorage.getItem('ForgotPassword'))

    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await axios.get(`http://localhost:3001/user/user?email=${email}`)
                setUser(user.data)
            } catch (error) {
                console.log(error)
            }

        }
        getUser()
    }, [])

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        console.log(email, securityAnswer, newPassword)
        await axios.patch(`http://localhost:3001/user/forgotpassword?email=${email}`, {
            email,
            securityAnswer,
            newPassword
        })
        localStorage.clear()
        navigate('/signin')
    };

    const handleSecurityAnswer = (e) => {
        setSecurityAnswer(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value)
    }

    return (
        <div style={{ paddingTop: '25%' }}>
            <form className='forgotPwdForm'>
                <h5>{user && user.securityQuestion}</h5>
                <input className='securityAnswer' placeholder='Your answer' value={securityAnswer} onChange={handleSecurityAnswer}></input>
                <input placeholder='New password' value={newPassword} onChange={handlePasswordChange}></input>
                <button className='forgotPwdButton' onClick={handleSubmitForm}>Submit</button>
            </form>
        </div>
    )
}

export default ForgotPassword