import React, { ChangeEvent } from "react";
import "../styles/input.css";

export const Input: React.FC<Props> = ({ label, type, onChange }) => {
  return (
    <div className="input-container">
      <input onChange={onChange} placeholder={label} type={type} />
    </div>
  );
};

interface Props {
  label: string;
  type: "text" | "number";
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
