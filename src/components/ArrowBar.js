import React, { useState, useEffect } from "react";
import "./ArrowBar.css";
import { IoStarSharp } from "react-icons/io5";
import axios from "axios";

export default function ArrowBar({ onLevelClick }) {
  const [levels, setLevels] = useState([]); // Za pohranu razina
  const odjelId = localStorage.getItem("odjelId"); // Dohvat odjel ID iz localStorage-a

  // Dohvat razina na početku (componentDidMount equivalent)
  useEffect(() => {
    if (odjelId) {
      axios
        .get(`/api/razina/odjel/${odjelId}`)
        .then((res) => {
          console.log("API Response (levels):", res.data);
          setLevels(res.data); // Spremanje razina u state
        })
        .catch((err) => {
          console.error("Error fetching levels:", err);
        });
    }
  }, [odjelId]); // Ovaj useEffect će se pokrenuti kad se odjelId promijeni

  return (
    <div className="arrowbar-container">
      <div className="arrow-steps">
        {/* Render the first fixed step */}
        <div className="step-wrapper fixed" onClick={() => onLevelClick(0)}>
          <div className="stars">
            <IoStarSharp className="star" />
          </div>
          <div className="step current">
            <span>{levels[0] && levels[0].naziv}</span> {/* Provjera da li je 'levels[0]' definiran */}
          </div>
        </div>

        {/* Render dynamic steps in between */}
        {levels.slice(1, levels.length - 1).map((level, index) => (
          <div
            key={index}
            className="step-wrapper"
            onClick={() => onLevelClick(index + 1)}
          >
            <div className="stars">
              {[...Array(index + 2)].map((_, starIndex) => (
                <IoStarSharp key={starIndex} className="star" />
              ))}
            </div>
            <div className="step">
              <span>{level ? level.naziv : "Nema naziva"}</span> {/* Provjera da li je 'level' definiran */}
            </div>
          </div>
        ))}

        {/* Render the last fixed step */}
        <div
          className="step-wrapper fixed"
          onClick={() => onLevelClick(levels.length - 1)}
        >
          <div className="stars">
            {[...Array(levels.length)].map((_, starIndex) => (
              <IoStarSharp key={starIndex} className="star" />
            ))}
          </div>
          <div className="step last">
            <span>{levels[levels.length - 1] && levels[levels.length - 1].naziv}</span> {/* Provjera da li je 'levels[levels.length - 1]' definiran */}
          </div>
        </div>
      </div>
    </div>
  );
}
