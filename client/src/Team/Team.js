import React from "react";
import "./Team.css";
import timothyDanfieldImage from "client/src/Tim.jpeg";
import nathanGrandinetteImage from "client/src/Nathan.jpg";
const Team = () => {
  const teamData = [
    {
      name: "Timothy Danfield",
      role: "Software MERN Engineer",
      image: timothyDanfieldImage,
    },
    {
      name: "Nathan Grandinette",
      role: "Software MERN Engineer",
      image: nathanGrandinetteImage,
    },
  ];

  return (
    <div className="team-container">
      <h2>Our Team</h2>
      <div className="team-members">
        {teamData.map((member, index) => (
          <div key={index} className="team-member">
            <img src={member.image} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
