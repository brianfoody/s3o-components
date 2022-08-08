import React from "react";
import { Rnd } from "react-rnd";
import { AwsComponent, Component, ComponentStatus } from "../../domain/core";
import {
  TbPlugConnected,
  TbPlugConnectedX,
  TbPlayerPlay,
  TbPlayerPause,
  TbInfoCircle,
} from "react-icons/tb";
import { centeredRow, spacedRow } from "../../utils/layoutUtils";
import Popover from "@cloudscape-design/components/popover";
import StatusIndicator from "@cloudscape-design/components/status-indicator";
import TextContent from "@cloudscape-design/components/text-content";
import "../../base.css";

export const BASE_TAB_HGT = 40;
export const BASE_FOOTER_HGT = 20;

export type BaseComponentProps = {
  component: Component;
  status: ComponentStatus;
  title: string;
  icon?: any;
  children: React.ReactNode;
};

export default ({
  component: c,
  title,
  status,
  children,
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
      cancel=".componentBody"
      allowAnyClick={false}
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
            <h3 className="brand" style={{ marginLeft: 8 }}>
              {" "}
              {title}{" "}
            </h3>
          </div>

          <div style={{ ...centeredRow, marginRight: 8 }}>
            <Icons status={status} component={c} />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            overflow: "scroll",
            marginBottom: 3,
            cursor: "default",
          }}
          className="componentBody"
        >
          {children}
        </div>
      </div>
    </Rnd>
  );
};

const Icons = (props: { status: ComponentStatus; component: Component }) => {
  return (
    <div style={{ ...centeredRow, marginRight: 16 }}>
      <InformationIcon {...props} />
      <div style={{ width: 10 }}></div>
      <PlayIcon {...props} />
      <div style={{ width: 10 }}></div>
      <ConnectionIcon {...props} />
    </div>
  );
};

const InformationIcon = (props: {
  status: ComponentStatus;
  component: Component;
}) => {
  // Test for AWS Component as we only show for them
  const awsComponent = props.component as AwsComponent<any>;
  if (!awsComponent?.config?.accountId) return null;

  return (
    <Popover
      dismissButton={false}
      position="top"
      size="small"
      triggerType="custom"
      content={
        <TextContent>
          {awsComponent.name} in account {awsComponent.config.accountId} (
          {awsComponent.config.region}) using{" "}
          {awsComponent.config.permissionSet} permission set.
        </TextContent>
      }
    >
      <div style={{ marginTop: 6 }}>
        <TbInfoCircle size={16} />
      </div>
    </Popover>
  );
};

const PlayIcon = ({ status }: { status: ComponentStatus }) => {
  if (status.playing && status.authorisation === "authorized") {
    return <TbPlayerPlay color="green" />;
  }
  if (status.playing && status.authorisation === "expired") {
    return <TbPlayerPlay color="orange" />;
  } else {
    return <TbPlayerPause color="black" />;
  }
};

const ConnectionIcon = ({ status }: { status: ComponentStatus }) => {
  if (status.authorisation === "authorized") {
    return <TbPlugConnected color="green" />;
  } else {
    return <TbPlugConnectedX color="orange" />;
  }
};
