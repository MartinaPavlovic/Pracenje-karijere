import React, { useRef } from "react";
import "./LevelDescription.css";
import Senior from "../images/senior-1.png";
import Middle from "../images/middle-1.png";
import { IoStarSharp } from "react-icons/io5";
import { GrCertificate } from "react-icons/gr";
import { FaRegLightbulb } from "react-icons/fa";
import ArrowBar from "./ArrowBar";

export default function LevelDescription() {
  const levels = ["Junior", "Mid", "Senior", "Senior 2", "Expert"];
  const skills = ["Skill 1", "Skill 2", "Skill 3"];
  const certificates = ["Certificate A", "Certificate B", "Certificate C"];
  const descriptionsRef = useRef([]);

  const scrollToLevel = (index) => {
    if (descriptionsRef.current[index]) {
      descriptionsRef.current[index].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <div>
      {/* Include the ArrowBar with scrollToLevel prop */}
      <ArrowBar onLevelClick={scrollToLevel} />

      <div className="level-container">
        {levels.map((level, index) => (
          <div
            key={index}
            ref={(el) => (descriptionsRef.current[index] = el)}
            className={`description ${
              index === 0 ? "always-show" : "hidden"
            } ${index % 2 === 0 ? "pink-background" : "white-background"}`}
          >
            <div className={`levelContent ${index % 2 === 0 ? "leftSide" : "rightSide"}`}>
              <h1 className="levelName">{level}</h1>
              <h2 className="levelYears">{`${index} god - ${index + 2} god`}</h2>
              <img
                className="levelIcon"
                src={index % 2 === 0 ? Middle : Senior}
                alt={`${level} icon`}
              />
              <div className="levelStars">
                {Array.from({ length: index + 1 }).map((_, starIndex) => (
                  <IoStarSharp key={starIndex} className="levelStar" />
                ))}
              </div>
            </div>

            {/* Skills container */}
            <div
              className={`skills-container ${
                index % 2 === 0 ? "white-background rightSkills" : "pink-background leftSkills"
              }`}
            >
              <FaRegLightbulb className="skillIcon" />
              <h3 className="skills-title">Vještine</h3>
              <ul className="skills-list">
                {skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="skills-item">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            {/* Certificates container */}
            <div
              className={`certificates-container ${
                index % 2 === 0
                  ? "white-background rightCertificates"
                  : "pink-background leftCertificates"
              }`}
            >
              <GrCertificate className="certificateIcon" />
              <h3 className="certificates-title">Certifikati</h3>
              <ul className="certificates-list">
                {certificates.map((certificate, certIndex) => (
                  <li key={certIndex} className="certificates-item">
                    {certificate}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
