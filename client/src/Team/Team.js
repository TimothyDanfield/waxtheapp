import React from "react";
import "./Team.css";

const Team = () => {
  // Sample team data with name, role, and image URL
  const teamData = [
    {
      name: "Timothy Danfield",
      role: "Software MERN Engineer",
      image: "client/src/Tim.jpeg",
    },
    {
      name: "Jane Smith",
      role: "Designer",
      image: "https://example.com/jane_smith.jpg",
    },
    // Add more team members as needed
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
