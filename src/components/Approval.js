import React, { Component } from "react";
import "./Approval.css";
import axios from "axios";

class Approval extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personalInfo: null,
      skills: [],
    };
    this.id = localStorage.getItem("id");
  }

  componentDidMount() {
    console.log("Fetching personalInfo...");
    axios
      .get(`/api/korisnik/${this.id}`)
      .then((res) => {
        console.log("API Response (personalInfo):", res.data);
        this.setState({ personalInfo: res.data });
      })
      .catch((err) => {
        console.error("Error fetching personalInfo:", err);
      });

    axios
      .get(`/api/korisnik-vjestina/${this.id}/neodobrene`)
      .then((res) => {
        console.log("API Response (skills):", res.data);
        this.setState({ skills: res.data });
      })
      .catch((err) => {
        console.error("Error fetching skills:", err);
      });
  }

  handleEdit = () => {
    this.setState((prevState) => ({
      skills: prevState.skills.map((skill) => ({
        ...skill,
        isEditable: true,
      })),
    }));
  };

  handleApprove = () => {
    const { skills } = this.state;

    // Priprema podataka za slanje
    const dataToSend = {
      korisnikId: this.id,
      ocjene: skills.map((skill) => ({
        vjestinaId: skill.vjestina.id,
        ocjena: skill.ocjena,
      })),
    };

    axios
      .post(`/api/korisnik-vjestina/ispravi-ocjene`, dataToSend)
      .then((res) => {
        console.log("Vještine uspješno odobrene:", res.data);
        alert("Vještine su uspješno odobrene!");
        this.setState((prevState) => ({
          skills: prevState.skills.map((skill) => ({
            ...skill,
            isEditable: false,
          })),
        }));
      })
      .catch((err) => {
        console.error("Greška prilikom odobravanja vještina:", err);
        alert("Došlo je do pogreške pri odobravanju vještina.");
      });
  };

  handleRatingChange = (index, newRating) => {
    const updatedSkills = this.state.skills.map((skill, i) => {
      if (i === index) {
        return { ...skill, ocjena: newRating };
      }
      return skill;
    });

    this.setState({ skills: updatedSkills });
  };

  render() {
    const { skills, personalInfo } = this.state;

    if (!personalInfo) {
      return <div>Loading...</div>;
    }

    return (
      <div className="approval">
        <div className="nameText">
          {personalInfo.ime} {personalInfo.prezime}
        </div>
        <hr className="hr1" />
        <ul className="skills-list2">
          {skills.map((skill, index) => (
            <li key={index}>
              {skill.vjestina.naziv}
              {skill.isEditable ? (
                <input
                  type="number"
                  min="1"
                  max="3"
                  value={skill.ocjena}
                  onChange={(e) =>
                    this.handleRatingChange(index, parseInt(e.target.value, 10))
                  }
                  style={{
                    marginLeft: "10px",
                    width: "50px",
                    textAlign: "center",
                  }}
                />
              ) : (
                <span style={{ marginLeft: "10px" }}>{skill.ocjena}</span>
              )}
            </li>
          ))}
        </ul>
        <div>
          <button
            className="edit-btn"
            style={{ marginTop: "20px", marginRight: "10px" }}
            onClick={this.handleEdit}
          >
            Ispravi
          </button>
          <button
            className="approve-btn"
            style={{ marginTop: "20px" }}
            onClick={this.handleApprove}
          >
            Odobri
          </button>
        </div>
      </div>
    );
  }
}

export default Approval;
