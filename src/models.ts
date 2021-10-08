export interface PointType {
  label: string;
  x: number;
  y: number;
  id: number;
}

export type PointsType = PointType[];

export interface UserInputControlType {
  inputId?: string;
  typedValue: any;
  maxValue: number;
  minValue: number;
}

export interface DatasetType {
  id: string;
}

export interface AppContextModel {
  points: PointsType;
  updatePoints: (point: PointType) => void;
  deletePoint: (point: PointType) => void;
  addPoint: (point: PointType) => void;
  checkValueFromUserInput: (userInput: UserInputControlType) => number;
}
