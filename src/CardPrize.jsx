import Card from "./Card";
import useWindowDimensions from "./useWindowDimensions";

export default function CardPrize({ small, tight, number }) {
  const { height, width } = useWindowDimensions();
  const cardWidth = width / 8;
  const cardHeight = (91 / 66) * cardWidth;

  if(number === 0) {
    return (
        <div style={{ position: "relative", height: cardHeight, width: cardWidth }}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <Card small={small} empty absolute={"absolute"} x={0} y={index * 10} />
            ))}
        </div>
      );
  }

  if (tight) {
    return (
      <div
        style={{ position: "relative", height: cardHeight, width: cardWidth }}
      >
        {Array(number > 12 ? 12 : number)
          .fill(0)
          .map((_, index) => (
            <Card small absolute={"absolute"} x={0} y={index} />
          ))}
      </div>
    );
  }

  

  return (
    <div style={{ position: "relative", height: cardHeight, width: cardWidth }}>
      {Array(number)
        .fill(0)
        .map((_, index) => (
          <Card small absolute={"absolute"} x={0} y={index * 10} />
        ))}
    </div>
  );
}