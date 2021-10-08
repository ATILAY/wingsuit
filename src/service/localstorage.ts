import { PointsType } from "../models";

export const getPointsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("points") as any) as PointsType;
};

export const addPointToLocalStorage = (points: PointsType) => {
  localStorage.setItem("points", JSON.stringify(points));
};
