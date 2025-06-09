import React from "react";
import '../components/medfind.css';
import taiwo from '../assets/Taiwo Akerele.png';
import { FaGithub, FaMedium, FaXTwitter, FaLinkedin } from "react-icons/fa6";

const MeetTheTeam: React.FC = () => {
    return(
    <div className='d-flex flex-md-row align-items-center justify-content-around' id="hero">
        <div className="team-1">
            <h1>Meet the <span style={{  color: '#344e41', fontWeight: '400'}}>founder</span></h1>
            <p><strong style={{color: '#344e41'}}>Taiwo Akerele</strong> is a Senior Software Engineer with a robust background in healthcare and a passion for leveraging technology to solve real-world medical challenges. With deep experience building scalable, user-centric applications, he bridges clinical knowledge with technical innovation. As the founder of MedFind, Taiwo is focused on improving access to health services through intuitive digital platforms that empower both patients and providers. His broader interests include medical imaging, wearable health technologies, implantable devices, and the application of artificial intelligence to enhance diagnostics and patient care. He continues to push the boundaries of what's possible at the intersection of healthcare and software.
            </p>
            <div className="d-flex flex-row align-items-center justify-content-start media">
                <a href='https://www.linkedin.com/in/taiwoakerele' target="_blank" rel="noopener noreferrer"><p>{FaLinkedin({})}</p></a>
                <a href='https://github.com/taiwoak' target="_blank" rel="noopener noreferrer"><p>{FaGithub({})}</p></a>
                <a href='https://x.com/td_akerele' target="_blank" rel="noopener noreferrer"><p>{FaXTwitter({})}</p></a>
                <a href='https://taiwoak.medium.com' target="_blank" rel="noopener noreferrer"><p>{FaMedium({})}</p></a>    
            </div>
        </div>
        <div className="team-2">
            <img src={taiwo} alt="Taiwo Akerele" className="taiwo-img" />
        </div>
    </div>
    );
};

export default MeetTheTeam;