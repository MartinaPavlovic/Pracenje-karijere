import React from "react";
import './EmployeeDetails.css';

// Mock podaci
const mockData = {
    personalInfo: {
        name: "Ime Prezime",
        birthDate: "01.01.1990",
        email: "ime.prezime@example.com",
        phone: "+385 91 123 4567",
    },
    coreSkills: ["Komunikacija", "Timski rad", "Problem-solving"],
    additionalSkills: ["Upravljanje projektima", "UX/UI dizajn", "Javno govorništvo"],
    certifications: [
        "JavaScript Developer Certificate",
        "React Advanced Certification",
        "Scrum Master",
    ],
};

export default function EmployeeDetails() {
    return (
        <div className="details">
            <div className="nameText">{mockData.personalInfo.name}</div>
            <hr className="hr1" />
            <div className="details-box-container">
                <div className="details-box">
                    <h3>Osobni podaci</h3>
                    <p>Datum rođenja: {mockData.personalInfo.birthDate}</p>
                    <p>Email: {mockData.personalInfo.email}</p>
                    <p>Telefon: {mockData.personalInfo.phone}</p>
                </div>
                <div className="details-box">
                    <h3>Temeljne vještine</h3>
                    <ul>
                        {mockData.coreSkills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>
                </div>
                <div className="details-box">
                    <h3>Dodatne vještine</h3>
                    <ul>
                        {mockData.additionalSkills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>
                </div>
                <div className="details-box">
                    <h3>Vještine i certifikati</h3>
                    <ul>
                        {mockData.certifications.map((certification, index) => (
                            <li key={index}>{certification}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
