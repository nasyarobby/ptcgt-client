import { Menu, MenuItem, SubMenu } from "@szhsin/react-menu";
import Card from "./Card";
import PropTypes from "prop-types";
import useWindowDimensions from "./useWindowDimensions";

export default function HandCard({ data, imageL, attachments, position }) {
  const { height, width } = useWindowDimensions();
  const cardWidth = width / 6;
  const cardHeight = (91 / 66) * cardWidth;
  const headerHeight = cardHeight/8

  const atts = attachments || [];

  return (
    <div
      style={{
        position: "relative",
        height: cardHeight + (atts.length) * headerHeight,
        backgroundColor: "green",
        width: cardWidth,
      }}
    >
      {atts.map((att, index) => {
        return (
          <Card
            key={index}
            absolute={"absolute"}
            x={(index) * headerHeight}
            y={(index + 1) * 0}
            imageL={att.imageL}
          />
        );
      })}
      <Menu
        menuButton={
          <Card
            hand
            imageL={imageL}
            attachments={attachments}
            absolute={"absolute"}
            x={(atts.length * headerHeight)}
          />
        }
        transition
      >
        <MenuItem>Info: {data.name}</MenuItem>
        <MenuItem>Play</MenuItem>
        <SubMenu label="Move to">
          <MenuItem>Active</MenuItem>
          <MenuItem>Bench</MenuItem>
          <MenuItem>Deck</MenuItem>
          <MenuItem>Trash</MenuItem>
          <MenuItem>Stadium</MenuItem>
          <MenuItem>Lost Zone</MenuItem>
          <MenuItem>Prize</MenuItem>
        </SubMenu>
        <MenuItem>Flip Face Down</MenuItem>
      </Menu>
    </div>
  );
}

HandCard.propTypes = {
  imageL: PropTypes.string,
};
