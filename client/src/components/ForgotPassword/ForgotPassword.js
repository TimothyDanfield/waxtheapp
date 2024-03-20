import React from 'react'
import { useEffect, useState } from 'react'
import axios from '../../utils/axiosConfig'
import { useNavigate } from 'react-router-dom'
import "./ForgotPassword.css"
import toast, { Toaster } from 'react-hot-toast'

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

        const updateUser = await axios.patch(`http://localhost:3001/user/forgotpassword?email=${email}`, {
            email,
            securityAnswer,
            newPassword
        })
        if (updateUser.status === 200) {
            localStorage.clear()
            navigate('/signin')
        } else {
            toast.error("Incorrect security answer")
        }





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
                <input className='forgotPwdItem' placeholder='Your answer' value={securityAnswer} onChange={handleSecurityAnswer}></input>
                <input className="forgotPwdItem" placeholder='New password' value={newPassword} onChange={handlePasswordChange}></input>
                <button className='forgotPwdButton' onClick={handleSubmitForm}>Submit</button>
            </form>
            <Toaster />
        </div>
    )
}

export default ForgotPassword