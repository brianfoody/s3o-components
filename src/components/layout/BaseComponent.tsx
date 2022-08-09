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
import Button from "@cloudscape-design/components/button";
import TextContent from "@cloudscape-design/components/text-content";
import StatusIndicator from "@cloudscape-design/components/status-indicator";
import "../../base.css";

export const BASE_TAB_HGT = 40;
export const BASE_FOOTER_HGT = 20;

export interface BaseComponentProps {
  state: {
    component: Component;
    status: ComponentStatus;
    title: string;
  };
  dispatch: {
    authorise: () => Promise<void>;
    togglePlay: () => Promise<void>;
  };
  children?: React.ReactNode;
}

export default ({ state, dispatch, children }: BaseComponentProps) => {
  const { component: c, status } = state;

  const icon = state.component.def.icon;
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
      onResizeStop={(_e, _direction, ref, _delta) => {
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
              {state.title}{" "}
            </h3>
          </div>

          <div style={{ ...centeredRow, marginRight: 8 }}>
            <Icons
              status={status}
              component={c}
              togglePlay={dispatch.togglePlay}
              authorise={dispatch.authorise}
            />
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

const Icons = (props: {
  status: ComponentStatus;
  component: Component;
  togglePlay: () => Promise<void>;
  authorise: () => Promise<void>;
}) => {
  return (
    <div style={{ ...centeredRow, marginRight: 16 }}>
      <InformationIcon {...props} />

      <div style={{ width: 10 }}></div>

      <PlayAuthoriseWrapper status={props.status} authorise={props.authorise}>
        <PlayIcon {...props} />
      </PlayAuthoriseWrapper>

      <div style={{ width: 10 }}></div>

      <ConnectionIcon status={props.status} authorise={props.authorise} />
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
          {awsComponent.def.name} in account {awsComponent.config.accountId} (
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

const PlayAuthoriseWrapper = ({
  status,
  authorise,
  children,
}: {
  status: ComponentStatus;
  authorise: () => Promise<void>;
  children: React.ReactNode;
}) => {
  if (status.authorisation === "authorized") return <>{children}</>;

  return (
    <Popover
      dismissButton={false}
      position="top"
      size="small"
      triggerType="custom"
      content={
        <TextContent>
          Authorisation expired.
          <br />
          <br />
          <Button onClick={authorise}>Reauthorise</Button>
        </TextContent>
      }
    >
      {children}
    </Popover>
  );
};

const PlayIcon = ({
  status,
  togglePlay,
}: {
  status: ComponentStatus;
  togglePlay: () => Promise<void>;
}) => {
  if (status.playing && status.authorisation === "authorized") {
    return <TbPlayerPlay color="green" onClick={togglePlay} />;
  }
  if (status.playing && status.authorisation === "expired") {
    return <TbPlayerPlay color="orange" onClick={togglePlay} />;
  } else {
    return <TbPlayerPause color="black" onClick={togglePlay} />;
  }
};

const ConnectionIcon = ({
  status,
  authorise,
}: {
  status: ComponentStatus;
  authorise: () => Promise<void>;
}) => {
  if (status.authorisation === "authorized") {
    return (
      <Popover
        dismissButton={false}
        position="top"
        size="small"
        triggerType="custom"
        // TODO Authorised until {ssoExpiryTime}
        // content={<StatusIndicator type="success">Authorised</StatusIndicator>}
        content={<StatusIndicator type="success">Authorised</StatusIndicator>}
      >
        <TbPlugConnected color="green" />
      </Popover>
    );
  } else {
    return (
      <Popover
        dismissButton={false}
        position="top"
        size="small"
        triggerType="custom"
        content={
          <TextContent>
            Authorisation expired.
            <br />
            <br />
            <Button onClick={authorise}>Reauthorise</Button>
          </TextContent>
        }
      >
        <TbPlugConnectedX color="orange" />
      </Popover>
    );
  }
};
