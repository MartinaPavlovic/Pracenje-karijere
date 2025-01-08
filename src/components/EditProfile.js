import React, { useState } from "react";
import './EditProfile.css';

// Mock podaci
const initialData = {
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

export default function EditProfile() {
    const [personalInfo, setPersonalInfo] = useState(initialData.personalInfo);

    // Funkcija za rukovanje promjenama inputa
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPersonalInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    return (
        <div className="details">
            <div className="nameText">{personalInfo.name}</div>
            <hr className="hr1" />
            <div className="details-box-container">
                <div className="details-box">
                    <h3>Osobni podaci</h3>
                    <label>
                        Ime i Prezime:
                        <input
                            type="text"
                            name="name"
                            value={personalInfo.name}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Datum rođenja:
                        <input
                            type="date"
                            name="birthDate"
                            value={personalInfo.birthDate}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={personalInfo.email}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Telefon:
                        <input
                            type="text"
                            name="phone"
                            value={personalInfo.phone}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div className="details-box">
                    <h3>Temeljne vještine</h3>
                    <ul>
                        {initialData.coreSkills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>
                </div>
                <div className="details-box">
                    <h3>Dodatne vještine</h3>
                    <ul>
                        {initialData.additionalSkills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>
                </div>
                <div className="details-box">
                    <h3>Vještine i certifikati</h3>
                    <ul>
                        {initialData.certifications.map((certification, index) => (
                            <li key={index}>{certification}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
