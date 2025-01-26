import React, { useState, useEffect } from "react";

const TrainerStats = ({ trainerState, restartSession, endSession }) => {
  const isSessionInactive = trainerState.endTime || !trainerState.startTime;

  return (
    <div className="w-full h-full mx-auto p-4 sm:p-6 shadow-lg bg-secondary-background">
      {/* Stats Container */}
      <div className="space-y-6">
        <h2 className="text-xl font-black text-center text-secondary-foreground">
          Session Stats
        </h2>

        {/* Stats Grid */}
        <div className="grid gap-6 md:gap-4">
          {/* Accuracy */}
          <div className="flex flex-col md:grid md:grid-cols-2 items-center gap-2 md:gap-4">
            <label className="font-medium text-primary-foreground">
              AVRG Accuracy:
            </label>
            <span className="text-right text-secondary-foreground">
              {trainerState.accuracy.toFixed(2)}%
            </span>
          </div>

          {/* Speed */}
          <div
            className="flex flex-col md:grid md:grid-cols-2 items-center gap-2 md:gap-4"
            title="Average Response Time"
          >
            <label className="font-medium text-primary-foreground">ART:</label>
            <span className="text-right text-secondary-foreground">
              {Math.floor(trainerState.speed)}ms
            </span>
          </div>

          {/* Targets */}
          <div className="flex flex-col md:grid md:grid-cols-2 items-center gap-2 md:gap-4">
            <label className="font-medium text-primary-foreground">
              Targets Left:
            </label>
            <span className="text-right text-secondary-foreground">
              {trainerState.totalTargets - trainerState.currentTargetCount}
            </span>
          </div>
          {trainerState.score && (
            <div className="flex flex-col md:grid md:grid-cols-2 p-2 items-center gap-2 md:gap-4 text-lg bg-primary-background rounded-md">
              <label className="font-medium text-primary-foreground">
                Final Score:
              </label>
              <span className="text-right text-secondary-foreground">
                {trainerState.score.toFixed(0)}
              </span>
            </div>
          )}

          {/* Time */}
          <div className="grid grid-cols-1 items-center gap-4">
            <CountUpTimer
              startTime={trainerState.startTime}
              isStopped={trainerState.endTime}
            />
          </div>
        </div>

        {/* Control Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={!isSessionInactive ? endSession : restartSession}
            className={`
              w-full sm:w-auto px-6 py-3 rounded-md font-medium text-white 
              transition-all transform hover:scale-105
              ${
                !isSessionInactive
                  ? "bg-red-400 hover:bg-red-600"
                  : "bg-accent-foreground"
              }
            `}
          >
            {!isSessionInactive
              ? "Stop"
              : trainerState.score
                ? "Restart"
                : "Start"}
          </button>
        </div>
      </div>
    </div>
  );
};

const CountUpTimer = ({ startTime, isStopped }) => {
  const [elapsedTime, setElapsedTime] = useState(null);

  useEffect(() => {
    if (!startTime) return;

    let intervalId;
    if (!isStopped) {
      intervalId = setInterval(() => {
        setElapsedTime(new Date() - startTime);
      }, 10);
    } else {
      setElapsedTime(new Date() - startTime);
    }

    return () => clearInterval(intervalId);
  }, [startTime, isStopped]);

  if (!elapsedTime) return null;

  return (
    <div className="inline-flex items-center justify-center p-2 bg-primary-background text-primary-foreground rounded-lg">
      {formatTime(elapsedTime)}
    </div>
  );
};

const formatTime = (time) => {
  const ms = String(Math.floor((time % 1000) / 10)).padStart(2, "0");
  const seconds = String(Math.floor((time / 1000) % 60)).padStart(2, "0");
  const minutes = String(Math.floor((time / (1000 * 60)) % 60)).padStart(
    2,
    "0",
  );
  const hours = String(Math.floor(time / (1000 * 60 * 60))).padStart(2, "0");

  return (
    <div className="font-mono flex items-center space-x-1">
      <span className="text-2xl">{hours}</span>
      <span className="text-gray-400">:</span>
      <span className="text-2xl">{minutes}</span>
      <span className="text-gray-400">:</span>
      <span className="text-2xl">{seconds}</span>
      <span className="text-gray-400">.</span>
      <span className="text-xl text-gray-600">{ms}</span>
    </div>
  );
};

export default TrainerStats;
