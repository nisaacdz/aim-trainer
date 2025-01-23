import React, { useRef } from "react";
import TrainerStats from "./components/TrainerStats";
import TrainerBoard from "./components/TrainerBoard";
import useTrainerSession from "./hooks/useTrainerSession";
import "./App.css";

function App() {
  const trainerBoardRef = useRef();
  const { trainerState, handleScore, restartSession, endSession } =
    useTrainerSession(trainerBoardRef);

  return (
    <div className="w-screen h-screen grid grid-cols-5">
      <div className="col-span-1">
        <TrainerStats
          trainerState={trainerState}
          restartSession={restartSession}
          endSession={endSession}
        />
      </div>
      <div className="col-span-4" ref={trainerBoardRef}>
        <TrainerBoard
          handleScore={handleScore}
          startTime={trainerState.startTime}
          endTime={trainerState.endTime}
          currentTargetPosition={trainerState.currentTargetPosition}
        />
      </div>
    </div>
  );
}

export default App;
