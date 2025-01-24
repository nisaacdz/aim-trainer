import { useState } from "react";
import { accuracySteps, largestRingSize, totalTargets } from "../util";

const initialState = {
  startTime: null,
  speed: 0,
  accuracy: 0,
  totalTargets: totalTargets,
  totalClicks: 0,
  currentTargetCount: 0,
  currentTargetPosition: { x: 0, y: 0 },
  endTime: null,
  autoStopper: null,
};

const useTrainerSession = (trainerBoardRef) => {
  const [trainerState, setTrainerState] = useState(initialState);

  const generateRandomPosition = () => {
    if (!trainerBoardRef.current) return { x: 0, y: 0 };

    const maxX = trainerBoardRef.current.clientWidth - largestRingSize;
    const maxY = trainerBoardRef.current.clientHeight - largestRingSize;

    return {
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    };
  };

  const handleScore = (distance) => {
    if (!trainerState.startTime || trainerState.endTime) return;

    const currentTime = new Date();
    const elapsedTime = currentTime - trainerState.startTime;
    const maxDistance = Math.ceil(largestRingSize / 2);

    let currentAccuracy = 0;
    if (distance <= maxDistance) {
      const aStep = Math.floor(distance / accuracySteps);
      const maxAStep = Math.ceil(maxDistance / accuracySteps);
      currentAccuracy = 75 + ((maxAStep - aStep) * 25) / maxAStep;
    } else {
      const maxDisplacement =
        Math.max(
          trainerBoardRef.current.clientWidth,
          trainerBoardRef.current.clientHeight,
        ) - largestRingSize;
      currentAccuracy = 50 - (distance * 50) / maxDisplacement;
    }

    const newTotalClicks = trainerState.totalClicks + 1;
    const newTargetCount =
      distance <= maxDistance
        ? trainerState.currentTargetCount + 1
        : trainerState.currentTargetCount;

    const newAccuracy =
      (trainerState.accuracy * trainerState.totalClicks + currentAccuracy) /
      newTotalClicks;

    const newSpeed = newTargetCount > 0 ? elapsedTime / newTargetCount : 0;

    let endTime = null;

    if (newTargetCount === totalTargets) {
      endTime = currentTime;
      clearTimeout(trainerState.autoStopper);
    }

    const newTargetPosition =
      distance <= maxDistance
        ? generateRandomPosition()
        : trainerState.currentTargetPosition;

    setTrainerState({
      ...trainerState,
      speed: newSpeed,
      accuracy: newAccuracy,
      totalClicks: newTotalClicks,
      currentTargetCount: newTargetCount,
      currentTargetPosition: newTargetPosition,
      endTime,
    });
  };

  const restartSession = () => {
    if (!trainerBoardRef.current) return;

    setTrainerState({
      ...initialState,
      startTime: new Date(),
      currentTargetPosition: {
        x: trainerBoardRef.current.clientWidth / 2 - largestRingSize / 2,
        y: trainerBoardRef.current.clientHeight / 2 - largestRingSize / 2,
      },
      autoStopper: setTimeout(endSession, 90000),
    });
  };

  const endSession = () => {
    clearTimeout(trainerState.autoStopper);
    setTrainerState((prevState) => {
      return {
        ...prevState,
        endTime: new Date(),
      };
    });
  };

  return {
    trainerState,
    handleScore,
    restartSession,
    endSession,
  };
};

export default useTrainerSession;
