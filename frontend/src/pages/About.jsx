import React from 'react';

const About = () => {
    const teamMembers = [
        {
            name: "@Aaru911",
            github: "https://github.com/Aaru911",
            avatar: "https://avatars.githubusercontent.com/u/70468123?v=4",
        },
        {
            name: "@CHETAN-INGALE",
            github: "https://github.com/CHETAN-INGALE",
            avatar: "https://avatars.githubusercontent.com/u/85936690?v=4",
        },
        {
            name: "@rsshinde2611",
            github: "https://github.com/rsshinde2611",
            avatar: "https://avatars.githubusercontent.com/u/204129495?v=4",
        },
    ];

    return (
        <div style={{ minHeight: "81vh", display: "flex", flexDirection: "column", padding: '20px',fontFamily: 'Georgia, serif', lineHeight: '1.8', backgroundColor: '#f9f9f9' }}>
            <h1 style={{fontFamily:'Helvetica', textAlign: 'center', color: '#333', marginBottom: '20px' }}>📖 About Us</h1>
            <p style={{ fontSize: '18px', color: '#555', marginBottom: '15px' }}>
                Welcome to <strong style={{ color: '#007bff' }}>BlockMyShow</strong>! 🎭 We are dedicated to providing you with the best
                platform to book tickets for your favorite <em>movies</em>, <em>events</em>, and <em>shows</em>.
            </p>
            <p style={{ fontSize: '18px', color: '#555', marginBottom: '15px' }}>
                Our mission is to make ticket booking <strong style={{ color: '#007bff' }}>simple</strong>, <strong style={{ color: '#007bff' }}>fast</strong>, and <strong style={{ color: '#007bff' }}>hassle-free</strong>. 
                Thank you for choosing us! 🚀
            </p>
            <p style={{ fontSize: '18px', color: '#555', marginBottom: '30px' }}>
                Check out our project repository on GitHub:{" "}
                <a 
                    href="https://github.com/chetan-ingale/BlockMyShow" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "#007bff", fontWeight: 'bold' }}
                >
                    BlockMyShow Repository
                </a>
            </p>
            <div style={{ flexGrow: 1 }}></div>
            <h2 style={{ textAlign: "center", color: '#333', marginBottom: '20px' }}>👨‍💻 Meet Our Team</h2>
            <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", marginTop: "20px" }}>
                {teamMembers.map((member, index) => (
                    <div 
                        key={index} 
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                            padding: "20px",
                            width: "220px",
                            textAlign: "center",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            backgroundColor: "#fff",
                            transition: "transform 0.2s",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    >
                        <img 
                            src={member.avatar} 
                            alt={member.name} 
                            style={{ width: "90px", height: "90px", borderRadius: "50%", marginBottom: "15px", border: "2px solid #007bff" }} 
                        />
                        <h3 style={{ fontSize: "18px", margin: "10px 0", color: '#333' }}>{member.name}</h3>
                        <a 
                            href={member.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ textDecoration: "none", color: "#007bff", fontSize: "16px", fontWeight: 'bold' }}
                        >
                            View GitHub Profile
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default About;