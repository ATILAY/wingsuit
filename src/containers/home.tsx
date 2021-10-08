import React, { useState } from "react";
import { Chart, Form, Point, Table } from "../components";
import { useAppContext } from "../context";
import { PointType } from "../models";
import "../styles/home.css";

export const Home: React.FC = () => {
  const { points } = useAppContext();
  const [windowWidth, setWindowWidth] = React.useState<number>(window.innerWidth | 0);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  React.useEffect(() => {
    window.removeEventListener("resize", handleResize);
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="home-container"
      style={
        windowWidth < 930
          ? { flexDirection: "column", alignItems: "center" }
          : { flexDirection: "row", alignItems: "start" }
      }>
      <div className="chart-wrapper">
        <Chart>
          {points.map((point: PointType, index: number) => (
            <Point
              key={`${point.id}-${point.label}-${point.x}-${point.y}-${index}`}
              id={point.id}
              x={point.x}
              y={point.y}
              label={point.label}
            />
          ))}
        </Chart>
      </div>
      <div
        className="customer-typing-reaction-wrapper"
        style={{ marginTop: windowWidth < 930 ? "20px" : "" }}>
        <Table />
        <Form />
      </div>
    </div>
  );
};
