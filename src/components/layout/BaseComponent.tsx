import React from "react";
import { BASE_TAB_HGT } from "../svg/BoxComponent";
import { Rnd } from "react-rnd";
import { Component } from "../../domain/core";

type Props = {
  children: React.ReactNode;
  component: Component;
  title: string;
};

const centered = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default ({ component: c, title, children }: Props) => {
  return (
    <Rnd
      style={{
        borderColor: "black",
        borderWidth: 5,
        borderStyle: "solid",
        borderRadius: 5,
      }}
      size={{ width: c.size[0], height: c.size[1] }}
      position={{ x: c.location[0] | 0, y: c.location[1] | 0 }}
      onDragStop={(e, d) => {
        console.log({ x: d.x, y: d.y });
      }}
      onResizeStop={(_e, _direction, ref, _delta, position) => {
        console.log({
          width: ref.style.width,
          height: ref.style.height,
        });
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: BASE_TAB_HGT,
            width: "100%",
            paddingLeft: 30,
            borderBottomWidth: 3,
            borderBottomStyle: "solid",
            ...centered,
          }}
        >
          <h3> {title} </h3>
        </div>

        <div style={{ flex: 1, overflow: "scroll", marginBottom: 3 }}>
          {children}
        </div>
      </div>
    </Rnd>
  );
};
