import React, { useState } from 'react'
import "./Profile.css"

const Profile = () => {
    const [selected, setSelected] = useState('Info')
    return (
        <div className='profilePage'>
            <div className='profileHeaders'>
                <h2 onClick={() => setSelected("Info")} style={{ borderBottom: selected === "Info" ? "5px solid #008080" : '' }}>Basic Information</h2>
                <h2 onClick={() => setSelected("History")} style={{ borderBottom: selected === "History" ? "5px solid #008080" : '' }}>Order History</h2>
            </div>
            <div className='infoSection'>
                <div className='profileInfo'>
                    <h4>
                        Name:
                    </h4>
                    <h4>
                        Nathan
                    </h4>
                </div>
                <div className='profileInfo'>
                    <h4>
                        Email:
                    </h4>
                    <h4>
                        nathan.grandinette@gmail.com
                    </h4>
                </div>
            </div>
            <div className='separatorLine'></div>
            <div className='applySection'>
                <h3>APPLY TO SELL ON WAX</h3>
            </div>

        </div>
    )
}

export default Profile