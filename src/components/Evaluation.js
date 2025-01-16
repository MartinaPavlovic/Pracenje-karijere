import React, { Component } from "react";
import "./Evaluation.css";

class Evaluation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [
        { name: "Komunikacija", rating: 1 },
        { name: "Timski rad", rating: 1 },
        { name: "Problem-solving", rating: 1 },
        { name: "Upravljanje projektima", rating: 1 },
        { name: "UX/UI dizajn", rating: 1 },
        { name: "Javno govorništvo", rating: 1 },
        
      ],
    };
  }

  handleRatingChange = (index, newRating) => {
    const updatedSkills = this.state.skills.map((skill, i) => {
      if (i === index) {
        return { ...skill, rating: newRating };
      }
      return skill;
    });

    this.setState({ skills: updatedSkills });
  };

  handleSubmit = () => {
    // Slanje podataka na backend
    console.log("Ocijenjene vještine:", this.state.skills);
    alert("Vještine su poslane na backend!");
  };

  render() {
    const { skills } = this.state;

    return (
      <div className="evaluation">
        <div className="nameText">Ime Prezime</div>
        <hr className="hr1" />
        <ul className="skills-list">
          {skills.map((skill, index) => (
            <li key={index}>
              {skill.name}
              <input
                type="range"
                min="1"
                max="3"
                value={skill.rating}
                onChange={(e) =>
                  this.handleRatingChange(index, parseInt(e.target.value, 10))
                }
                style={{ marginLeft: "10px", width: "50%" }}
              />
              <span style={{ marginLeft: "10px" }}>{skill.rating}</span>
            </li>
          ))}
        </ul>
        <button
          className="save-btn"
          style={{ marginTop: "20px", display: "block", marginLeft: "20vw" }}
          onClick={this.handleSubmit}
        >
          Ocijeni
        </button>
      </div>
    );
  }
}

export default Evaluation;
