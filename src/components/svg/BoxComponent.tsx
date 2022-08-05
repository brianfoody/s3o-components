import * as React from "react";
import SvgContainer from "./SvgContainer";

type Props = {
  size: number[];
  children?: React.ReactNode;
};

export const BASE_TAB_HGT = 40;

/**
 * A base container for a React component on the canvas.
 * @param
 * @returns
 */
export const BoxComponent = ({ size, children }: Props) => {
  const box = React.useRef<HTMLElement | undefined | null>();
  const [containerSize, setContainerSize] = React.useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  React.useEffect(() => {
    if (!box.current) return;

    setContainerSize({
      width: box.current.clientWidth,
      height: box.current.clientHeight,
    });
  }, [box.current]);

  return (
    <div
      style={{
        position: "relative",
        width: size[0],
        height: size[1],
      }}
      ref={(divElm) => (box.current = divElm)}
    >
      <SvgContainer>
        <path
          d={`
          M0,10
          L0,${size[1] - 10}
          a10,10 0 0,0 10,10
          L${size[0] - 10},${size[1]}
          a10,10 0 0,0 10,-10
          L${size[0]},10
          a10,10 0 0,0 -10,-10
          L10,0
          a10,10 0 0,0 -10,10
          Z`}
          stroke="black"
          strokeWidth={3}
          fill="transparent"
        />
        <line
          x1={0}
          x2={size[0]}
          y1={BASE_TAB_HGT}
          y2={BASE_TAB_HGT}
          stroke="black"
          strokeWidth={2}
        />
      </SvgContainer>
      <div style={{ position: "absolute", top: 0, left: 0, ...containerSize }}>
        {children}
      </div>
    </div>
  );
};
