import React from "react";
import "./ArrowBar.css";
import { IoStarSharp } from "react-icons/io5";

export default function ArrowBar({ onLevelClick }) {
  const levels = ["Junior", "Mid", "Senior", "Senior 2", "Expert"];

  return (
    <div className="arrowbar-container">
      <div className="arrow-steps">
        {/* Render the first fixed step */}
        <div
          className="step-wrapper fixed"
          onClick={() => onLevelClick(0)}
        >
          <div className="stars">
            <IoStarSharp className="star" />
          </div>
          <div className="step current">
            <span>{levels[0]}</span>
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
              <span>{level}</span>
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
            <span>{levels[levels.length - 1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
