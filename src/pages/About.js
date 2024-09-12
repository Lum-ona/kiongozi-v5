import React from "react";
import Header from "../components/header/Header";
import "../styles/About.css";

function About() {
  return (
    <div className="about_page">
      <Header />
      <div className="about">
        <p>
          Kiongozi is an Emerging Leaders Platform, a springboard for Grassroots
          Youth and Women Social Change Drivers. Membership of the Platform is
          voluntary and targets young leaders in elective politics, innovators,
          entrepreneurs, and passionate impact drivers. Our shared values and
          collective agenda of establishing a thriving ecosystem of new and
          resilient leaders for the posteriority of Africa. We are designing a
          new Pan Africanism agenda for the young people, by the young people
          and with the young people committed to co-creating and implementing
          sustainable solutions that will drive forward the transformation of
          the continent.
        </p>
        <br />
        <p>
          This program proposes to support budding youth and women leaders
          through a Leadership Acceleration Program that will curate and nurture
          existing talents among nascent grassroots change agents especially
          social innovators, climate change champions, founders of youth and
          women initiatives and other impact leaders from across the country.
        </p>
        <br />
        <p>
          The program envisages fulfilment of the following specific objectives:
        </p>
        <ul>
          <li>
            Identify Emerging Grassroots Leaders and social change drivers
            enthusiastic about devolution-addressing the most critical
            challenges affecting the youth, women, and their communities;
          </li>
          <li>
            Build capacities of selected leaders positioning to run for elective
            seats by leveraging on a well-designed curriculum and infusion of
            young and women elected leaders through mentoring &amp; peer to peer
            learning models;
          </li>
          <li>
            <p>
              Enhance the likelihood of success of young leaders through
              entrepreneurship, social innovations, co-creation and building
              capacity of viable social projects to raise funds and create local
              jobs;
            </p>
          </li>
          <li>
            <p>
              Cultivate an ecosystem of creative youth and women leaders,
              think-tanks and Youth-focused stakeholders, initiating strategic
              collaboration and relationships with the government, development
              partners, and other development agencies to deepen grassroots
              governance and development;
            </p>
          </li>
        </ul>
        <h3>Vision</h3>
        <p>
          A thriving African youth ecosystem for the young people, by the young
          people and with the young people.
        </p>
        <h3>Mission</h3>
        <p>
          To equip and strengthen capacities of Emerging Grassroots Youth and
          Women Leaders and enhance their participation in policy and decision
          making in Africa
        </p>
        <h3>Values</h3>
        <ul>
          <li>Volunteerism</li>
          <li>Integrity</li>
          <li>Passion for Community</li>
          <li>Young People First</li>
          <li>Change and Tranformation</li>
        </ul>
        <div className="contacts">
          <h3>Get in-touch</h3>
          <div className="details">
            <p>Email: info@kiongozi.ke</p>
            <p>Phone: +254 729 980718</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
