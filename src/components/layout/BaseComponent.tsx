import React from "react";
import { Rnd } from "react-rnd";
import { Component, ComponentStatus } from "../../domain/core";
import {
  TbPlugConnected,
  TbPlugConnectedX,
  TbPlayerPlay,
  TbPlayerPause,
} from "react-icons/tb";
import { centered, centeredRow, spacedRow } from "../../utils/layoutUtils";
import "../../base.css";

export const BASE_TAB_HGT = 40;
export const BASE_FOOTER_HGT = 20;

export type BaseComponentProps = {
  children: React.ReactNode;
  component: Component;
  status: ComponentStatus;
  title: string;
  footer?: React.ReactNode;
  icon?: any;
};

export default ({
  component: c,
  title,
  children,
  footer,
  icon,
}: BaseComponentProps) => {
  return (
    <Rnd
      style={{
        borderColor: "black",
        borderWidth: 3,
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
            borderBottomWidth: 3,
            borderBottomStyle: "solid",
            ...spacedRow,
          }}
        >
          <div style={centeredRow}>
            {icon && <img src={icon} style={{ height: 40, width: 40 }} />}
            <h3 style={{ marginLeft: 16 }}> {title} </h3>
          </div>

          <div style={{ ...centeredRow, marginRight: 16 }}>
            <TbPlayerPlay color="green" />
            <div style={{ width: 10 }}></div>
            <TbPlugConnected color="green" />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            overflow: "scroll",
            marginBottom: 3,
          }}
        >
          {children}
        </div>

        {footer ? footer : null}
      </div>
    </Rnd>
  );
};
