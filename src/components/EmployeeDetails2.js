import React, { Component } from "react";
import "./EmployeeDetails2.css";
import { LuClipboardList } from "react-icons/lu";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";

// Registracija potrebnih komponenti za Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

class ProgressBar extends Component {
    render() {
        const { levels, currentLevel, skillsCompleted, nextLevelSkills, showLabels } = this.props;
        const currentIndex = levels.indexOf(currentLevel);
        const progressPercentage = (skillsCompleted / nextLevelSkills) * 100;
        const progressWidth =
            currentIndex * (100 / (levels.length - 1)) +
            (progressPercentage / 100) * (100 / (levels.length - 1));

        return (
            <div className="progress-bar-container">
                <div className="progress-bar-levels">
                    {levels.map((level, index) => (
                        <div
                            key={level}
                            className={`progress-level ${index <= currentIndex ? "completed" : ""}`}
                        >
                            <div className={`circle ${index <= currentIndex ? "filled" : ""}`}>
                                {index <= currentIndex && <span className="checkmark">✔</span>}
                            </div>
                            {showLabels && <span className="level-label">{level}</span>}
                        </div>
                    ))}
                </div>
                <div className="progress-line">
                    <div
                        className="progress-filled"
                        style={{
                            width: `${progressWidth}%`,
                        }}
                    ></div>
                </div>
                <div
                    className="progress-percentage"
                    style={{
                        left: `${progressWidth}%`,
                    }}
                >
                    {Math.round(progressPercentage)}%
                </div>
            </div>
        );
    }
}

export default class EmployeeDetails2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMissingSkills: false,
            personalInfo: null,
            requiredLevel: "",
            missingSkills: [],
            employee: "",
        };
        this.id = localStorage.getItem("id");
    }

    componentDidMount() {
        console.log("Fetching personalInfo...");
        axios
            .get(`/api/korisnik-razina/korisnik/${this.id}/zeljenaRazina`)
            .then((res) => {
                console.log("API Response (requiredLevel):", res.data);
                this.setState({ requiredLevel: res.data });
            })
            .catch((err) => {
                console.error("Error fetching requiredLevel:", err);
            });

        axios
            .get(`/api/korisnik-vjestina/${this.id}/temeljne`)
            .then((res) => {
                console.log("API Response (allSkills):", res.data);
                // Filtriramo samo vještine s ocjenom -1
                const missingSkills = res.data.filter((skill) => skill.ocjena === -1);
                this.setState({ missingSkills });
            })
            .catch((err) => {
                console.error("Error fetching skills:", err);
        });   
        
        axios
            .get(`/api/korisnik/odjel/${this.id}`)
            .then((res) => {
            this.setState({ employee: res.data });
        })
        .catch((err) => {
            console.error("Error fetching employee:", err);
        });   
    }

    toggleMissingSkills = () => {
        this.setState((prevState) => ({
            showMissingSkills: !prevState.showMissingSkills,
        }));
    };

    render() {
        const levels1 = ["Junior", "Mid", "Senior", "Expert"];
        const currentLevel1 = "Senior";
        const skillsCompleted1 = 8;
        const nextLevelSkills1 = 10;

        const levels2 = ["Senior", "Expert"];
        const currentLevel2 = "Senior";
        const skillsCompleted2 = 8;
        const nextLevelSkills2 = 10;

        const skillsRequired = 100;
        const skillsCurrent = 62;

        const data = {
            labels: ["Tražene vještine", "Trenutne vještine"],
            datasets: [
                {
                    label: "Broj vještina",
                    data: [skillsRequired, skillsCurrent],
                    backgroundColor: ["#4caf50", "#8bc34a"],
                    borderWidth: 1,
                },
            ],
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 20,
                    },
                },
            },
        };

        const { showMissingSkills, requiredLevel, missingSkills, employee } = this.state;

        return (
            <div className="details">
                <div className="departmentText">{ employee.nazivOdjel }</div>
                <hr className="hr2" />
                <div className="progress-section">
                    <h3>Napredak Levela</h3>
                    <ProgressBar
                        levels={levels1}
                        currentLevel={currentLevel1}
                        skillsCompleted={skillsCompleted1}
                        nextLevelSkills={nextLevelSkills1}
                        showLabels={true}
                    />
                    <h3>Napredak Vještina</h3>
                    <ProgressBar
                        levels={levels2}
                        currentLevel={currentLevel2}
                        skillsCompleted={skillsCompleted2}
                        nextLevelSkills={nextLevelSkills2}
                        showLabels={true}
                    />
                    <div className="progress-circle">
                        <div className="circle-icon">
                            <LuClipboardList size={40} color="#008000" />
                        </div>
                        <div className="circle-text">
                            {skillsCompleted2}/{nextLevelSkills2}
                        </div>
                    </div>
                </div>
                <div className="departmentText">Željeni karijerni putevi</div>
                <hr className="hr2" />
                <div className="text">{requiredLevel.naziv}</div>
                <hr className="hr3" />
                <div className="bar-chart-container">
                    <h3>Pregled vještina</h3>
                    <div style={{ height: "40vh", width: "20%", margin: "0 auto" }}>
                        <Bar data={data} options={options} />
                    </div>
                </div>
                <h3>Postotak ostvarenih vještina</h3>
                <ProgressBar
                    levels={["0%", "100%"]}
                    currentLevel="0%"
                    skillsCompleted={skillsCurrent}
                    nextLevelSkills={skillsRequired}
                    showLabels={false}
                />
                {showMissingSkills ? (
                    <>
                        <ul className="missing-skills-list">
                            {missingSkills.map((skill, index) => (
                                <li key={index}>{skill.nazivVjestine}</li>
                            ))}
                        </ul>
                        <p className="listText" onClick={this.toggleMissingSkills}>
                            Zatvori
                        </p>
                    </>
                ) : (
                    <p className="listText" onClick={this.toggleMissingSkills}>
                        Prikaži vještine koje nedostaju
                    </p>
                )}
            </div>
        );
    }
}
