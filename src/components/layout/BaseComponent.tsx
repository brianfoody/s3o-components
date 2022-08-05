import React from "react";
import { BASE_TAB_HGT, BoxComponent } from "../svg/BoxComponent";

type Props = {
  size: number[];
  children: React.ReactNode;
  title: string;
};

const centered = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default ({ title, children, size }: Props) => {
  return (
    <BoxComponent size={size}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            height: BASE_TAB_HGT,
            width: "100%",
            paddingLeft: 30,
            ...centered,
          }}
        >
          <h3> {title} </h3>
        </div>

        <div style={{ flex: 1, overflow: "scroll", marginBottom: 3 }}>
          {children}
        </div>
      </div>
    </BoxComponent>
  );
};
