import React from "react";
import { chartSettings, pointSettings, stepArranger, maxvalueForYInput } from "../config";
import { Input } from "./input";
import "../styles/form.css";
import { useAppContext } from "../context";

export const Form: React.FC = () => {
  const [label, setLabel] = React.useState("");
  const [dx, setDx] = React.useState(-1);
  const [dy, setDy] = React.useState(-1);
  const { addPoint } = useAppContext();

  const submitForm = () => {
    if (!label || (!dx && dx !== 0) || (!dy && dy !== 0)) {
      alert("No blank space must be left");

      return;
    }

    if (dx < 0 || dx > 100) {
      //chartSettings.width - pointSettings.width - chartSettings.borderWidth - 1
      alert(`Vision must be between 0 and 100`);

      return;
    }

    if (dy < 0 || dy > 100) {
      //chartSettings.height - pointSettings.height - chartSettings.borderWidth - 1
      alert(`Ability must be between 0 and 100`);

      return;
    }

    if (label.length > 50) {
      alert("The length of the label must be less than 50");

      return;
    }

    addPoint({ id: -1, x: dx * stepArranger, y: maxvalueForYInput - dy * stepArranger, label });
  };

  return (
    <div className="form-container">
      <div className="inputs-container">
        <Input
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setLabel(event.target.value)}
          type="text"
          label="Label"
        />
        <Input
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setDx(Number(event.target.value))
          }
          type="number"
          label="Vision"
        />
        <Input
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setDy(Number(event.target.value))
          }
          type="number"
          label="Ability"
        />
        <div className="button-container">
          <button onClick={submitForm}>Add Point</button>
        </div>
      </div>
    </div>
  );
};
