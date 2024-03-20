import React, { useState } from 'react'
import "./Apply.css"

const Apply = () => {
    const [formInfo, setFormInfo] = useState({
        Name: "",
        Email: "",
        Message: "",
        Over18: "",
    })

    return (
        <div>
            <form className="applyForm" action="https://getform.io/f/pbqgnvnb" method="POST" encType='multipart/form-data'>
                <div className='applySection1'>
                    <label htmlFor='name'>What is your name? </label>
                    <input type="text" name="name" placeholder='Name...' />
                </div>
                <div className='applySection1'>
                    <label htmlFor="email">What is your email? </label>
                    <input type="email" name="email" placeholder='Email...' />
                </div>
                <div className='applySection1'>
                    <label htmlFor='message'>Message: </label>
                    <input type="text" name="message" placeholder='Message...' />
                </div>
                <div className='applySection1'>
                    <label htmlFor=''>Are you 18 years old or older? </label>
                    <div className='checkbox'>
                        <input type="radio" name="age" />
                        <label htmlFor='age'>Yes</label>
                    </div>
                    <div className='checkbox'>
                        <input type="radio" name="age" onClick={() => {}}/>
                        <label htmlFor='age'>No</label>
                    </div>                    

                </div>

                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default Apply