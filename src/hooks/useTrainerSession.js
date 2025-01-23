import { useState } from "react";
import { accuracySteps, largestRingSize, totalTargets } from "../util";

const initialState = {
  startTime: null,
  speed: 0,          // Average time per successful hit in ms
  accuracy: 0,       // Percentage of successful hits
  totalTargets: totalTargets,
  totalClicks: 0,    // All clicks including misses
  currentTargetCount: 0, // Successful hits
  currentTargetPosition: { x: 0, y: 0 },
  endTime: null,
};

const useTrainerSession = (trainerBoardRef) => {
  const [trainerState, setTrainerState] = useState(initialState);

  const generateRandomPosition = () => {
    if (!trainerBoardRef.current) return { x: 0, y: 0 };
    
    const maxX = trainerBoardRef.current.clientWidth - largestRingSize;
    const maxY = trainerBoardRef.current.clientHeight - largestRingSize;
    
    return {
      x: Math.max(0, Math.floor(Math.random() * maxX)),
      y: Math.max(0, Math.floor(Math.random() * maxY))
    };
  };

  const handleScore = (distance) => {
    if (!trainerState.startTime || trainerState.endTime) return;

    const currentTime = new Date();
    const elapsedTime = currentTime - trainerState.startTime;
    const maxDistance = largestRingSize;
    
    // Calculate accuracy for this hit
    let currentAccuracy = 0;
    if (distance <= maxDistance) {
      const aStep = Math.floor(distance / accuracySteps);
      const maxAStep = Math.ceil(maxDistance / accuracySteps);
      currentAccuracy = 50 + ((maxAStep - aStep) * 50) / maxAStep;
    }

    // Calculate new stats
    const newTotalClicks = trainerState.totalClicks + 1;
    const newTargetCount = distance <= maxDistance ? 
      trainerState.currentTargetCount + 1 : 
      trainerState.currentTargetCount;
    
    // Update overall accuracy based on all clicks
    const newAccuracy = (trainerState.accuracy * trainerState.totalClicks + currentAccuracy) / newTotalClicks;
    
    // Calculate average speed (time per successful hit)
    const newSpeed = newTargetCount > 0 ? elapsedTime / newTargetCount : 0;

    // Check if session should end
    const endTime = newTargetCount === totalTargets ? currentTime : null;

    // Generate new target position if hit was successful
    const newTargetPosition = distance <= maxDistance ? 
      generateRandomPosition() : 
      trainerState.currentTargetPosition;

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
        x: Math.floor(trainerBoardRef.current.clientWidth / 2),
        y: Math.floor(trainerBoardRef.current.clientHeight / 2),
      },
    });
  };

  const endSession = () => {
    setTrainerState(prevState => ({
      ...prevState,
      endTime: new Date(),
    }));
  };

  return {
    trainerState,
    handleScore,
    restartSession,
    endSession,
  };
};

export default useTrainerSession;