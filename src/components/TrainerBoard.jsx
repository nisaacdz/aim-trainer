import { useEffect, useRef } from "react";
import TargetRing from "./TargetRing";
import { largestRingSize } from "../util";

const TrainerBoard = ({
  handleScore,
  startTime,
  endTime,
  currentTargetPosition,
}) => {
  const targetRef = useRef(null);

  const targetClickResult = (distance) => {
    handleScore(distance);
  };

  useEffect(() => {
    const target = targetRef.current;
    if (endTime) {
      target.style.display = "none";
    } else if (startTime) {
      target.style.display = "block";
    }
  }, [currentTargetPosition, endTime, startTime]);

  return (
    <div className="relative w-full h-full bg-yellow-300 overflow-hidden graph-background">
      {currentTargetPosition && <div
        ref={targetRef}
        className={`bg-red-500 rounded-full absolute`}
        style={{ top: currentTargetPosition.y, left: currentTargetPosition.x, display: "none", width: largestRingSize, height: largestRingSize }}
      >
        <TargetRing clickResult={targetClickResult} />
      </div>}
    </div>
  );
};

export default TrainerBoard;
