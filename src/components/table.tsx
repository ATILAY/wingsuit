import React, { useEffect, useState } from "react";
import { useAppContext } from "../context";
import { PointsType, PointType, UserInputControlType, DatasetType } from "../models";
import { chartSettings, pointSettings, stepArranger, maxvalueForYInput } from "../config";

import "../styles/table.css";

export const Table: React.FC = () => {
  const { points, deletePoint, updatePoints, checkValueFromUserInput } = useAppContext();
  const [whichInputId, setWhichInputId] = React.useState<null | undefined | string>("");

  return (
    <div className="table-container">
      <div className="table-item table-header">
        <div>
          <p className="table-col-title">Label</p>
        </div>
        <div>
          <p className="table-col-title">Vision</p>
        </div>
        <div>
          <p className="table-col-title">Ability</p>
        </div>
        <div>
          <p className="table-col-title">Delete</p>
        </div>
      </div>
      {points?.map((point: PointType, index: number) => (
        <div className="table-item" key={`${point.label}-${point.x}-${point.y}-${index}`}>
          <div>
            <input
              data-id={"point-label-input-" + index}
              type="text"
              className="table-point-input-label-shower"
              value={point.label}
              autoFocus={whichInputId === "point-label-input-" + index}
              onChange={(e: { target: { value: string; dataset: { id?: string } } }) => {
                let newLabel: string;
                //max label length 50 char
                newLabel = e.target.value.slice(0, 30);

                setWhichInputId(e.target.dataset.id);

                updatePoints({ ...point, label: newLabel });
              }}
            />
          </div>
          <div>
            <input
              data-id={"point-x-input-" + index}
              type="number"
              className="table-point-input-x-shower"
              value={Math.round(point.x / stepArranger)}
              autoFocus={whichInputId === "point-x-input-" + index}
              onChange={(e: { target: { value: string; dataset: { id?: string } } }) => {
                const newInputCheck: UserInputControlType = {
                  inputId: e.target.dataset.id,
                  typedValue: e.target.value,
                  maxValue: 381,
                  minValue: 0,
                };

                setWhichInputId(e.target.dataset.id);

                updatePoints({ ...point, x: checkValueFromUserInput(newInputCheck) });
              }}
            />
          </div>
          <div>
            <input
              data-id={"point-y-input-" + index}
              type="number"
              className="table-point-input-y-shower"
              value={
                point.y >= 0 ? Math.round((maxvalueForYInput - Number(point.y)) / stepArranger) : 0
              }
              autoFocus={whichInputId === "point-y-input-" + index}
              onChange={(e: { target: { value: string; dataset: { id?: string } } }) => {
                const newInputCheck: UserInputControlType = {
                  inputId: e.target.dataset.id,
                  typedValue: e.target.value || "0",
                  maxValue: maxvalueForYInput,
                  minValue: 0,
                };

                setWhichInputId(e.target.dataset.id);

                updatePoints({ ...point, y: checkValueFromUserInput(newInputCheck) });
              }}
            />
          </div>
          <div className="delete-button">
            <button className="delete-button-element" onClick={() => deletePoint(point)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
