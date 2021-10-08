import React, { DragEvent, RefObject } from "react";
import { chartSettings, pointSettings } from "../config";
import { useAppContext } from "../context";
import { PointType } from "../models";
import "../styles/point.css";

export const Point: React.FC<PointType> = ({ label, x, y, id }) => {
  const [{ dx, dy }, setOffset] = React.useState({ dx: x, dy: y });
  const [startX, setStartX] = React.useState<number>(0);
  const [startY, setStartY] = React.useState<number>(0);
  const [showLabel, setShowLabel] = React.useState(false);
  const pointRef: RefObject<HTMLDivElement> = React.useRef(null);
  const elementX = Number(pointRef.current?.getBoundingClientRect().x) || 0;
  const elementY = Number(pointRef.current?.getBoundingClientRect().y) || 0;
  const { updatePoints } = useAppContext();

  const onMouseDown = () => {
    setStartX(elementX - dx);
    setStartY(elementY - dy);
  };

  const onDragEnd = (e: DragEvent) => {
    let newDx = e.pageX - startX;
    let newDy = e.pageY - startY;

    if (newDx < 0) {
      newDx = 0;
    }

    if (newDx > chartSettings.width - pointSettings.width - chartSettings.borderWidth - 1) {
      newDx = chartSettings.width - pointSettings.width - chartSettings.borderWidth - 1;
    }

    if (newDy < 0) {
      newDy = 0;
    }

    if (newDy > chartSettings.height - pointSettings.height - chartSettings.borderWidth - 1) {
      newDy = chartSettings.height - pointSettings.height - chartSettings.borderWidth - 1;
    }

    setOffset({ dx: newDx, dy: newDy });
    updatePoints({ id, x: newDx, y: newDy, label });
  };

  const onMouseOut = () => {
    setShowLabel(false);
  };

  const onMouseOver = () => {
    setShowLabel(true);
  };

  return (
    <div
      ref={pointRef}
      className="point-container"
      style={{
        transform: `translate3d(${dx}px, ${dy}px, 0)`,
      }}
      draggable
      onMouseOut={onMouseOut}
      onMouseOver={onMouseOver}
      onMouseDown={onMouseDown}
      onDragEnd={onDragEnd}>
      {<span className="label">{label}</span>}
    </div>
  );
};
