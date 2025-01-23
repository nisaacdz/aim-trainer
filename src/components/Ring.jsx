import { ringThickness, largestRingSize, totalRings } from "../util";

const Ring = () => {
  const renderRings = () => {
    const rings = [];
    let size = largestRingSize;

    // Generate concentric rings
    for (let i = 0; i < totalRings; i++) {
      rings.push(
        <div
          key={i}
          style={{
            position: "absolute",
            top: `${(largestRingSize - size) / 2}px`,
            left: `${(largestRingSize - size) / 2}px`,
            bottom: `${(largestRingSize - size) / 2}px`,
            right: `${(largestRingSize - size) / 2}px`,
            borderRadius: "50%",
            boxSizing: "border-box",
            borderWidth: `${ringThickness}px`,
            zIndex: i,
          }}
          className="border-secondary-foreground"
        ></div>,
      );

      size -= 4 * ringThickness;
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
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "50%",
          width: "2px",
          height: "100%",
          transform: "translateX(-50%)",
        }}
        className="bg-secondary-foreground"
      ></div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "0",
          width: "100%",
          height: "2px",
          transform: "translateY(-50%)",
        }}
        className="bg-secondary-foreground"
      ></div>
    </div>
  );
};

export default Ring;
