import useWindowDimensions from "./useWindowDimensions";

export default function EmptyZone({small, noBorder, text, absolute}) {
  const { height, width } = useWindowDimensions();
  const cardWidth = small ? width / 8 : width / 6;
  const cardHeight = (87 / 66) * cardWidth;

  return (
    <div
      className="card"
      style={{
        width: cardWidth,
        height: cardHeight,
        backgroundSize: "contain",
        border: noBorder ? "" : "1px solid #ccc",
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "0.6em"
      }}
    >{text===undefined ? "ACTIVE" : text}</div>
  );
}
