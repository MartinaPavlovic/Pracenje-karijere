import React, { Component, createRef } from "react";
import "./LevelDescription.css";
import Senior from "../images/senior-1.png";
import Middle from "../images/middle-1.png";
import { IoStarSharp } from "react-icons/io5";
import { GrCertificate } from "react-icons/gr";
import { FaRegLightbulb } from "react-icons/fa";
import ArrowBar from "./ArrowBar";
import axios from "axios";

class LevelDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      levels: [],
    };

    this.descriptionsRef = [];
    this.scrollToLevel = this.scrollToLevel.bind(this);
    this.odjelId = localStorage.getItem("odjelId");
  }

  componentDidMount() {
    axios
      .get(`/api/razina-vjestina/odjel/${this.odjelId}`)
      .then((res) => {
        console.log("API Response (levels):", res.data);
        this.setState({ levels: res.data });
      })
      .catch((err) => {
        console.error("Error fetching levels:", err);
      });
  }

  scrollToLevel(index) {
    if (this.descriptionsRef[index]) {
      this.descriptionsRef[index].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }

  render() {
    const { levels } = this.state;
    const certificates = ["Certificate A", "Certificate B", "Certificate C"];

    return (
      <div>
        {/* Include the ArrowBar with scrollToLevel prop */}
        <ArrowBar onLevelClick={this.scrollToLevel} />

        <div className="level-container">
          {levels.map((level, index) => (
            <div
              key={index}
              ref={(el) => (this.descriptionsRef[index] = el)}
              className={`description ${
                index === 0 ? "always-show" : "hidden"
              } ${index % 2 === 0 ? "pink-background" : "white-background"}`}
            >
              <div
                className={`levelContent ${
                  index % 2 === 0 ? "leftSide" : "rightSide"
                }`}
              >
                <h1 className="levelName">{level.razinaNaziv}</h1>
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
                  index % 2 === 0
                    ? "white-background rightSkills"
                    : "pink-background leftSkills"
                }`}
              >
                <FaRegLightbulb className="skillIcon" />
                <h3 className="skills-title">Vještine</h3>
                <ul className="skills-list3">
                  {level.vjestine.map((skill, skillIndex) => (
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
}

export default LevelDescription;
