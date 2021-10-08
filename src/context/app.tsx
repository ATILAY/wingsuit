import React from "react";
import { AppContextModel, PointsType, PointType, UserInputControlType } from "../models";
import { chartSettings, pointSettings, stepArranger, maxvalueForYInput } from "../config";
import { addPointToLocalStorage } from "../service";

export const AppContext = React.createContext<AppContextModel>({ points: [] } as any);
export const useAppContext = () => React.useContext(AppContext);

export const AppContextProvider: React.FC<{ data?: PointsType }> = ({ children, data }) => {
  const [points, setPoints] = React.useState<PointsType>(data || []);

  const updatePoints = (point: PointType) => {
    setPoints((prevState: PointsType) => {
      return prevState.map((_point: PointType) => {
        if (_point.id === point.id) {
          _point.x = point.x;
          _point.y = point.y;
          _point.label = point.label;
        }

        return _point;
      });
    });

    addPointToLocalStorage(points);
  };

  const deletePoint = (point: PointType) => {
    setPoints((prevState: PointsType) => {
      const updatedPoints = prevState.filter((_point: PointType) => _point.id !== point.id);
      addPointToLocalStorage(updatedPoints);

      return updatedPoints;
    });
  };

  const addPoint = (point: PointType) => {
    const maxId = points.reduce((acc, _point) => (acc = acc > _point.id ? acc : _point.id), 0);
    point.id = maxId + 1;

    setPoints([...points, point]);

    addPointToLocalStorage([...points, point]);
  };

  const checkValueFromUserInput = (userInput: UserInputControlType) => {
    let temp: number;
    const input_value_without_e_letter: string = userInput.typedValue.replaceAll("e", "");
    const temporaryInputValue: number = parseInt(input_value_without_e_letter);

    if ((userInput.inputId || "").includes("point-y")) {
      //y axis input control
      if (temporaryInputValue) {
        temp = maxvalueForYInput - temporaryInputValue * stepArranger;
      } else {
        temp = maxvalueForYInput;
      }
    } else {
      //x axis input control
      temp = temporaryInputValue * stepArranger || 0;
    }

    if (temp > userInput.maxValue) {
      return userInput.maxValue;
    } else if (temp <= userInput.minValue) {
      return userInput.minValue;
    }
    return temp;
  };

  const contextValue: AppContextModel = {
    points,
    updatePoints,
    deletePoint,
    addPoint,
    checkValueFromUserInput,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
