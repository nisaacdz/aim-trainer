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
  const boardRef = useRef(null);

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
    <div
      className="relative w-full h-full overflow-hidden graph-background bg-primary-background"
      ref={boardRef}
    >
      {currentTargetPosition && (
        <div
          ref={targetRef}
          className={`absolute`}
          style={{
            top: currentTargetPosition.y,
            left: currentTargetPosition.x,
            display: "none",
            width: largestRingSize,
            height: largestRingSize,
          }}
        >
          <TargetRing clickResult={targetClickResult} boardRef={boardRef} />
        </div>
      )}
    </div>
  );
};

export default TrainerBoard;
