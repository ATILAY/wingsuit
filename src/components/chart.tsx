import React from "react";
import "../styles/chart.css";

export const Chart: React.FC = ({ children }) => {
  return (
    <div className="chart-container">
      <span className="chart-text chart-left-text">Ability To Execute --&gt;</span>
      <div className="chart-area-label-container">
        <div>
          <p className="chart-label-wrapper-paragraph">
            <span>Challengers</span>
          </p>
        </div>
        <div>
          <p className="chart-label-wrapper-paragraph">
            <span>Leaders</span>
          </p>
        </div>
        <div>
          <p className="chart-label-wrapper-paragraph">
            <span>Niche Players</span>
          </p>
        </div>
        <div>
          <p className="chart-label-wrapper-paragraph">
            <span>Visionaries</span>
          </p>
        </div>
      </div>
      {children}
      <span className="chart-text chart-bottom-text">Completeness Of Vision --&gt;</span>
    </div>
  );
};
