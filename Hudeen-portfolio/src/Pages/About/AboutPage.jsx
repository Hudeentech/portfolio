import React from 'react';
import './about-page.css'; // Import the CSS file for styling
import Nav from '../../components/Nav/Nav';


const aboutData = {
  name: 'John Doe',
  bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula turpis eget dolor lacinia ultricies. Nulla facilisi. Vivamus quis ligula eget libero volutpat ullamcorper. Proin sodales ligula vitae mauris convallis, nec varius eros scelerisque. Ut vel risus vel risus dignissim facilisis. Nam sit amet tellus in lectus vehicula mollis nec sit amet ex. Nulla porttitor turpis at metus feugiat, eget congue turpis cursus. Duis facilisis nisl et ultrices vehicula. Fusce non metus vitae orci euismod lobortis. Duis consectetur turpis id lorem fringilla, id dignissim ex rhoncus. Suspendisse potenti.`,
  imageUrl: '/Rectangle 28.png',
  otherInfo: {
    age: 30,
    location: 'New York, USA',
    occupation: 'Software Engineer',
    hobbies: ['Reading', 'Traveling', 'Photography'],
    skills: ['JavaScript', 'React', 'Node.js', 'CSS', 'HTML']
  }
};

const AboutPage = () => {
  return (
    <>

    <Nav/>

    <div className="about-container">
    <div className="grid-container">
       <div className="profile-c">
            <img src={aboutData.imageUrl} alt="John Doe" className="profile-image" />
        </div>

      <div className="detail-card-BIO">
        <h2>{aboutData.name}</h2>
        <p>{aboutData.bio}</p>
      </div>
    </div>

      <div className="other-info">

      <div className="detail-card">
          <h2>Personal Information</h2>
          <p>Age: {aboutData.otherInfo.age}</p>
          <p>Location: {aboutData.otherInfo.location}</p>
          <p>Occupation: {aboutData.otherInfo.occupation}</p>
        </div>

        <div className="detail-card">
          <h2>Hobbies</h2>
          <div>
            {aboutData.otherInfo.hobbies.map(hobby => (
              <p key={hobby}>{hobby}</p>
            ))}
          </div>
        </div>

        <div className="detail-card">
          <h2>Skills</h2>
          <div>
            {aboutData.otherInfo.skills.map(skill => (
              <p key={skill}>{skill}</p>
            ))}
          </div>
        </div>
        <div className="detail-card">
          <h2>Experience</h2>
          <div>
            {aboutData.otherInfo.skills.map(skill => (
              <p key={skill}>{skill}</p>
            ))}
          </div>
        </div>
        <div className="detail-card">
          <h2>certifications</h2>
          <div>
            {aboutData.otherInfo.skills.map(skill => (
              <p key={skill}>{skill}</p>
            ))}
          </div>
        </div>
        
      </div>
    </div>
    </>
    
  );
};

export default AboutPage;
