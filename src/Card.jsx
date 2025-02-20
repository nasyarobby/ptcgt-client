import PropTypes from "prop-types";
import { forwardRef } from "react";
import useWindowDimensions from "./useWindowDimensions";

function Card(
  {
    empty,
    small,
    imageL,
    zIndex,
    absolute,
    x,
    y,
    ...restProps
  },
  ref
) {
  const { height, width } = useWindowDimensions();
  const cardWidth = small ? width / 8 : width / 6;
  const cardHeight = (91 / 66) * cardWidth;

  if(empty) {
    return (
      <div>
        <div
          ref={ref}
          className="card"
          style={{
            position: absolute ? absolute : "initial",
            top: absolute ? x : "initial",
            left: absolute ? y : "initial",
            width: cardWidth,
            height: cardHeight,
            border: "1px solid #999",
            backgroundColor: "#ffffff",
            borderRadius: 5
          }}
          {...restProps}
        ></div>
      </div>
    );
  }

  return (
    <div>
      <div
        ref={ref}
        className="card"
        style={{
          position: absolute ? absolute : "initial",
          top: absolute ? x : "initial",
          left: absolute ? y : "initial",
          width: cardWidth,
          height: cardHeight,
          zIndex: zIndex || 0,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundImage: imageL
            ? `url(${imageL})`
            : `url(https://sleevenocardbehind.com/wp-content/uploads/2022/11/pokemon-cardback_japanese.jpg)`,
        }}
        {...restProps}
      ></div>
    </div>
  );
}

Card.propTypes = {
  bench: PropTypes.bool,
  hand: PropTypes.bool,
  absolute: PropTypes.bool,
  x: PropTypes.number,
  y: PropTypes.number,
};

export default forwardRef(Card);
