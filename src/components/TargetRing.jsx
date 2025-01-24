import React, { useEffect, useRef } from "react";
import Ring from "./Ring";
import { largestRingSize } from "../util";

const computeDistance = (event, divRef) => {
  const { clientX, clientY } = event;
  const { top, left, width, height } = divRef.current.getBoundingClientRect();
  const divCenterX = left + width / 2;
  const divCenterY = top + height / 2;

  const distance = Math.sqrt(
    Math.pow(clientX - divCenterX, 2) + Math.pow(clientY - divCenterY, 2),
  );
  return distance;
};

const TargetRing = ({ clickResult, boardRef }) => {
  const divRef = useRef(null);

  useEffect(() => {
    const board = boardRef.current;
    const handleClick = (event) => {
      const distance = computeDistance(event, divRef);
      clickResult(distance);
    };
    board.addEventListener("mousedown", handleClick);

    return () => {
      board.removeEventListener("mousedown", handleClick);
    };
  }, [clickResult, boardRef]);

  return (
    <div
      ref={divRef}
      style={{
        width: `${largestRingSize}px`,
        height: `${largestRingSize}px`,
      }}
    >
      <Ring />
    </div>
  );
};

export default TargetRing;
