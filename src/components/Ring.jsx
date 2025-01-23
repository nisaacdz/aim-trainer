import { ringThickness, largestRingSize, ringColors } from "../util";

const Ring = () => {
  const renderRings = () => {
    const rings = [];
    let size = largestRingSize;

    // Generate concentric rings
    for (let i = 0; i < ringColors.length; i++) {
      rings.push(
        <div
          key={i}
          style={{
            position: "absolute",
            top: `${(largestRingSize - size) / 2}px`,
            left: `${(largestRingSize - size) / 2}px`,
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: ringColors[i],
            borderRadius: "50%",
            zIndex: i,
          }}
        ></div>
      );

      size -= 2 * ringThickness; // Decrease size for the next inner ring
    }

    return rings;
  };

  return (
    <div
      className="relative"
      style={{
        width: `${largestRingSize}px`,
        height: `${largestRingSize}px`,
      }}
    >
      {renderRings()}
    </div>
  );
};

export default Ring;
