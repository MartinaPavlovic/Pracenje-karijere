import React, { Component } from "react";
import "./EmployeeLevel.css";
import axios from "axios";

// Mock podaci
const mockCurrentLevel = "Mid";
const mockMissingSkills = {
  Senior: ["Leadership", "Project Management", "Conflict Resolution"],
  Expert: ["Strategic Thinking", "Innovation Management", "Mentorship"],
};

class EmployeeLevel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLevel: null, // Odabrana razina
      showMissingSkills: false, // Praćenje prikaza liste
      isPrioritizing: false, // Praćenje stanja za prikaz checkboxova
      selectedSkills: [], // Lista odabranih vještina
      employee: null,
      levels: [],
    };
    this.id = localStorage.getItem("id"); // id korisnika
  }

  componentDidMount() {
    // Dohvaćanje podataka o zaposleniku
    axios
      .get(`/api/korisnik/odjel/${this.id}`)
      .then((res) => {
        const employee = res.data;
        console.log("Fetched employee:", employee);

        this.setState({ employee }, () => {
          // Kada je employee postavljen, dohvatiti razine za njegov odjel
          const odjelId = employee.idOdjel;
          console.log("Fetching levels for department ID:", odjelId);

          axios
            .get(`/api/razina/odjel/${odjelId}`)
            .then((res) => {
              console.log("Fetched levels:", res.data);
              this.setState({ levels: res.data });
            })
            .catch((err) => {
              console.error("Error fetching levels:", err);
            });
        });
      })
      .catch((err) => {
        console.error("Error fetching employee:", err);
      });
  }

  handleClick = (level) => {
    const { levels } = this.state;
    const currentIndex = levels.findIndex(
      (lvl) => lvl.naziv === mockCurrentLevel
    );
    const clickedIndex = levels.findIndex((lvl) => lvl.naziv === level.naziv);

    if (clickedIndex > currentIndex) {
      this.setState((prevState) => ({
        selectedLevel: prevState.selectedLevel === level ? null : level,
        showMissingSkills: prevState.selectedLevel === level ? false : true,
        isPrioritizing: false, // Reset prioritizacije prilikom promjene razine
        selectedSkills: [], // Reset odabranih vještina
      }));
    }
  };

  handleTogglePrioritize = () => {
    this.setState((prevState) => ({
      isPrioritizing: !prevState.isPrioritizing,
      selectedSkills: [], // Reset odabranih vještina prilikom otvaranja prioritizacije
    }));
  };

  handleSkillSelection = (skill) => {
    this.setState((prevState) => {
      const isSelected = prevState.selectedSkills.includes(skill);
      const updatedSkills = isSelected
        ? prevState.selectedSkills.filter((s) => s !== skill)
        : [...prevState.selectedSkills, skill];
      return { selectedSkills: updatedSkills };
    });
  };

  handleLevelSelection = () => {
    const { selectedLevel, employee } = this.state;

    if (selectedLevel && employee) {
      axios
        .post(`/api/korisnik-razina/korisnik/${this.id}/zeljenaRazina/${selectedLevel.id}`)
        .then((res) => {
          console.log("Razina uspješno spremljena:", res.data);
          alert(`Razina ${selectedLevel.naziv} uspješno postavljena!`);
        })
        .catch((err) => {
          console.error("Greška prilikom spremanja razine:", err);
          alert("Došlo je do greške prilikom spremanja razine.");
        });
    } else {
      alert("Nijedna razina nije odabrana.");
    }
  };

  render() {
    const { selectedLevel, showMissingSkills, isPrioritizing, selectedSkills, employee, levels } =
      this.state;

    if (!employee || levels.length === 0) {
      return <div>Učitavanje podataka...</div>;
    }

    return (
      <div className="employeeLevel">
        <div className="nameText">{employee.nazivOdjel}</div>
        <hr className="hr1" />

        <div className="levelContainer">
          {levels.map((level) => (
            <React.Fragment key={level.id}>
              {/* Box za razinu */}
              <div
                className={`levelBox ${
                  levels.findIndex((lvl) => lvl.naziv === mockCurrentLevel) >=
                  levels.findIndex((lvl) => lvl.naziv === level.naziv)
                    ? "completedLevel"
                    : "clickableLevel"
                }`}
                onClick={() => this.handleClick(level)}
              >
                <span className="levelText">{level.naziv}</span>
                {levels.findIndex((lvl) => lvl.naziv === mockCurrentLevel) >=
                  levels.findIndex((lvl) => lvl.naziv === level.naziv) && (
                  <span className="checkmark">✔</span>
                )}
              </div>

              {/* Lista vještina, prikazuje se samo ispod odabranog boxa */}
              {showMissingSkills && selectedLevel === level && (
                <div className="missingSkillsContainer">
                  <p className="title">
                    Vještine koje nedostaju za razinu {selectedLevel.naziv}:
                  </p>
                  <ul className="missing-skills-list">
                    {(mockMissingSkills[selectedLevel.naziv] || []).map(
                      (skill) => (
                        <li key={skill}>
                          {isPrioritizing ? (
                            <label>
                              <input
                                type="checkbox"
                                checked={selectedSkills.includes(skill)}
                                onChange={() => this.handleSkillSelection(skill)}
                              />
                              {skill}
                            </label>
                          ) : (
                            <span>{skill}</span>
                          )}
                        </li>
                      )
                    )}
                  </ul>
                  <p
                    className="listText"
                    onClick={
                      isPrioritizing
                        ? () => console.log("Odabrane vještine:", selectedSkills)
                        : this.handleTogglePrioritize
                    }
                  >
                    {isPrioritizing ? "Spremi" : "Označi prioritetne vještine"}
                  </p>
                  <p
                    className="listText"
                    onClick={() =>
                      this.setState({
                        showMissingSkills: false,
                        selectedLevel: null,
                        isPrioritizing: false,
                      })
                    }
                  >
                    Zatvori
                  </p>
                  <button
                    className="listText"
                    onClick={this.handleLevelSelection}
                  >
                    Odaberi razinu
                  </button>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
}

export default EmployeeLevel;
