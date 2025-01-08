import React, { useState } from "react";
import "./SideBox.css";

export default function SideBox() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
    const [showLevelOptions, setShowLevelOptions] = useState(false);
    const [showGenderOptions, setShowGenderOptions] = useState(false);

    const levels = ["Junior", "Mid", "Senior", "Expert"];
    const genders = ["Muški", "Ženski", "Ostalo"];

    const handleFilter = () => {
        console.log("Filtriranje podataka:");
        console.log("Pretraga:", searchTerm);
        console.log("Razina:", selectedLevel);
        console.log("Spol:", selectedGender);
    };

    return (
        <div className="sideBox">
            {/* Pretraga */}
            <div className="search-section">
                <input
                    type="text"
                    placeholder="Pretraži..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            {/* Filtriranje */}
            <div className="filter-section">
                {/* Filtriranje po razini */}
                <div className="filter-level">
                    <button
                        onClick={() => setShowLevelOptions(!showLevelOptions)}
                        className="filter-button"
                    >
                        Razina: {selectedLevel || "Sve"}
                    </button>
                    {showLevelOptions && (
                        <ul className="filter-options">
                            {levels.map((level) => (
                                <li
                                    key={level}
                                    onClick={() => {
                                        setSelectedLevel(level);
                                        setShowLevelOptions(false);
                                    }}
                                    className="filter-option"
                                >
                                    {level}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Filtriranje po spolu */}
                <div className="filter-gender">
                    <button
                        onClick={() => setShowGenderOptions(!showGenderOptions)}
                        className="filter-button"
                    >
                        Spol: {selectedGender || "Svi"}
                    </button>
                    {showGenderOptions && (
                        <ul className="filter-options">
                            {genders.map((gender) => (
                                <li
                                    key={gender}
                                    onClick={() => {
                                        setSelectedGender(gender);
                                        setShowGenderOptions(false);
                                    }}
                                    className="filter-option"
                                >
                                    {gender}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Gumb za filtriranje */}
            <button onClick={handleFilter} className="filter-apply-button">
                Filtriraj
            </button>
        </div>
    );
}
