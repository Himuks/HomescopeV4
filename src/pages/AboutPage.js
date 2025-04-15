// src/pages/AboutPage.js
import React from 'react';
import './AboutPage.css'; // We'll create this CSS file
// Optional: Import an image if you have one
// import aboutImage from '../assets/images/about-us-banner.jpg'; // Example path
// Import team member images
// You need to place your images in src/assets/images/team
// Images should be named firstname.jpg (e.g., pushpendra.jpg, yash.jpg)
import pushpendraImage from '../assets/images/team/pushpendra.jpg';
import yashImage from '../assets/images/team/yash.jpg';
import suryapratapImage from '../assets/images/team/suryapratap.jpg';
import anshImage from '../assets/images/team/ansh.jpg';
import dhawalImage from '../assets/images/team/dhawal.jpg';
import himanshuImage from '../assets/images/team/himanshu.jpg';
import atharvaImage from '../assets/images/team/atharva.jpg';
import simarImage from '../assets/images/team/simar.jpg';
import saatvikImage from '../assets/images/team/saatvik.jpg';

const AboutPage = () => {
  return (
    <div className="about-page-container">
      <div className="about-header">
        <h1>About HomeScope Clone</h1>
        <p className="about-subtitle">Your trusted partner in finding the perfect home.</p>
        {/* Optional Banner Image */}
        {/* <img src={aboutImage} alt="Our team or office" className="about-banner-image" /> */}
      </div>

      <section className="about-section mission-vision">
        <div className="section-content">
          <h2>Our Mission</h2>
          <p>
            To simplify the home searching process by providing an intuitive, comprehensive, and reliable platform connecting buyers, renters, and sellers. We strive to empower our users with the data and tools they need to make informed real estate decisions.
          </p>
        </div>
         {/* Optional: Add a Vision section similarly */}
         {/* <div className="section-content">
            <h2>Our Vision</h2>
            <p>To be the leading online destination for real estate discovery, fostering a community built on trust and transparency.</p>
         </div> */}
      </section>

      <section className="about-section values">
         <h2>Our Values</h2>
         <div className="values-grid">
             <div className="value-item">
                 {/* Add icons later if desired */}
                 <h3>Integrity</h3>
                 <p>We operate with honesty and transparency in all our dealings.</p>
             </div>
             <div className="value-item">
                 <h3>User-Centric</h3>
                 <p>Our users' needs are at the forefront of our design and features.</p>
             </div>
             <div className="value-item">
                 <h3>Innovation</h3>
                 <p>We continuously seek to improve our platform with cutting-edge technology.</p>
             </div>
              <div className="value-item">
                 <h3>Reliability</h3>
                 <p>Providing accurate and up-to-date information is our priority.</p>
             </div>
         </div>
      </section>

      <section className="about-section team">
        <h2>Meet the Team</h2>
        <p>
          We are a passionate group of developers, designers, and real estate enthusiasts dedicated to building the best property platform.
        </p>
        {/* Team Members Grid */}
        <div className="team-grid">
            {/* Team Member 1 */}
            <div className="team-member">
                <div className="team-member-image">
                    <img src={pushpendraImage} alt="Pushpendra Singh" />
                </div>
                <h3>Pushpendra Singh</h3>
                <p className="team-member-id">22BCE10723</p>
                <p className="team-member-branch">Computer Science & Engineering (Core)</p>
                <p className="team-member-batch">Batch - 2022</p>
                <p className="team-member-bio">
                    My primary research interest lies in the integration of machine learning with web
                    development, focusing on creating intuitive, data-driven applications. By combining
                    predictive algorithms with interactive web interfaces, I aim to develop user-centric
                    solutions that simplify complex decision-making processes, as exemplified by the
                    HomeScope project.
                </p>
            </div>

            {/* Team Member 2 */}
            <div className="team-member">
                <div className="team-member-image">
                    <img src={yashImage} alt="Yash Pandey" />
                </div>
                <h3>Yash Pandey</h3>
                <p className="team-member-id">22BCE10206</p>
                <p className="team-member-branch">Computer Science & Engineering (Core)</p>
                <p className="team-member-batch">Batch - 2022</p>
                <p className="team-member-bio">
                    I am a full-stack developer with a strong foundation in Node.js, and am passionate about DevOps
                    and Web3 technologies. I have worked on innovative projects like a Blockchain-Based
                    Community Solar Energy Trading platform and integrates AI/ML into full-stack solutions. I focus
                    on creating scalable systems using blockchain, automation, and cloud-native tools to solve
                    real-world challenges.
                </p>
            </div>

            {/* Team Member 3 */}
            <div className="team-member">
                <div className="team-member-image">
                    <img src={suryapratapImage} alt="Suryapratap Singh" />
                </div>
                <h3>Suryapratap Singh</h3>
                <p className="team-member-id">22BCE10529</p>
                <p className="team-member-branch">Computer Science & Engineering (Core)</p>
                <p className="team-member-batch">Batch - 2022</p>
                <p className="team-member-bio">
                    My primary research interest lies in the integration of web and app development with advanced
                    technologies, focusing on creating user-friendly and efficient digital solutions. By integrating
                    intuitive design with robust functionality, I aim to deliver applications that address real-world
                    problems effectively, as demonstrated through the HomeScope project.
                </p>
            </div>

            {/* Team Member 4 */}
            <div className="team-member">
                <div className="team-member-image">
                    <img src={anshImage} alt="Ansh Khanna" />
                </div>
                <h3>Ansh Khanna</h3>
                <p className="team-member-id">22BCE11144</p>
                <p className="team-member-branch">Computer Science & Engineering (Core)</p>
                <p className="team-member-batch">Batch - 2022</p>
                <p className="team-member-bio">
                    I am highly intrigued by the field of natural language processing, focusing on bridging the gap
                    between human communication and machine understanding. My work centers on creating
                    intelligent systems that can analyze, interpret, and generate human language, enabling innovative
                    solutions for real-world applications.
                </p>
            </div>

            {/* Team Member 5 */}
            <div className="team-member">
                <div className="team-member-image">
                    <img src={dhawalImage} alt="Dhawal Pandit" />
                </div>
                <h3>Dhawal Pandit</h3>
                <p className="team-member-id">22BCE10203</p>
                <p className="team-member-branch">Computer Science & Engineering (Core)</p>
                <p className="team-member-batch">Batch - 2022</p>
                <p className="team-member-bio">
                    My primary research interest lies in the integration of cybersecurity principles with advanced
                    technologies, focusing on creating secure and resilient digital solutions. By emphasizing robust
                    security measures and intuitive design, I aim to develop applications that protect user data and
                    address real-world challenges effectively.
                </p>
            </div>

            {/* Team Member 6 */}
            <div className="team-member">
                <div className="team-member-image">
                    <img src={himanshuImage} alt="Himanshu Kumarsambhav" />
                </div>
                <h3>Himanshu Kumarsambhav</h3>
                <p className="team-member-id">22BCG10046</p>
                <p className="team-member-branch">Computer Science & Engineering (Gaming technology)</p>
                <p className="team-member-batch">Batch - 2022</p>
                <p className="team-member-bio">
                    I am passionate about exploring the potential of artificial intelligence in automating complex
                    processes and improving decision-making. My focus is on developing intelligent systems that can
                    analyze data efficiently and adapt to dynamic environments, creating impactful solutions for
                    real-world challenges.
                </p>
            </div>

            {/* Team Member 7 */}
            <div className="team-member">
                <div className="team-member-image">
                    <img src={atharvaImage} alt="Atharva Kale" />
                </div>
                <h3>Atharva Kale</h3>
                <p className="team-member-id">22BCE10869</p>
                <p className="team-member-branch">Computer Science & Engineering (Core)</p>
                <p className="team-member-batch">Batch - 2022</p>
                <p className="team-member-bio">
                    I am passionate about securing IoT devices by integrating cybersecurity principles with embedded
                    systems. My focus is on developing intelligent and resilient solutions that safeguard connected
                    devices from cyber threats. By leveraging embedded systems, I aim to create secure and efficient
                    mechanisms that address real-world challenges in the ever-evolving IoT landscape.
                </p>
            </div>

            {/* Team Member 8 */}
            <div className="team-member">
                <div className="team-member-image">
                    <img src={simarImage} alt="Simar Kochar" />
                </div>
                <h3>Simar Kochar</h3>
                <p className="team-member-id">22BAI10012</p>
                <p className="team-member-branch">Computer Science & Engineering (Artificial Intelligence)</p>
                <p className="team-member-batch">Batch - 2022</p>
                <p className="team-member-bio">
                    I am fascinated by the field of machine learning, especially in building intelligent systems that can
                    learn from data and improve over time. My focus is on developing algorithms and applications
                    that solve complex problems and drive innovation across various industries.
                </p>
            </div>

            {/* Team Member 9 */}
            <div className="team-member">
                <div className="team-member-image">
                    <img src={saatvikImage} alt="Saatvik Tewari" />
                </div>
                <h3>Saatvik Tewari</h3>
                <p className="team-member-id">22MEI10048</p>
                <p className="team-member-branch">Computer Science & Engineering (Integrated M.Tech Cyber Security)</p>
                <p className="team-member-batch">Batch - 2022</p>
                <p className="team-member-bio">
                    I am keenly interested in data science, with a focus on extracting meaningful insights from
                    complex datasets. By leveraging advanced analytical techniques and visualization tools, I aim to
                    uncover patterns and trends that drive informed decision-making and innovative solutions.
                </p>
            </div>
        </div>
      </section>

       <section className="about-section join-us">
         <h2>Join Us</h2>
         <p>Interested in learning more or partnering with HomeScope Clone? We'd love to hear from you!</p>
         {/* Optionally link to contact page */}
         {/* <Link to="/contact" className="btn btn-primary">Contact Us</Link> */}
      </section>
    </div>
  );
};

export default AboutPage;