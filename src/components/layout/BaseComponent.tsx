import React, { useEffect } from "react";
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
    scale?: number;
  };
  dispatch: {
    onAuthorise: () => void;
    onTogglePlay: () => void;
    onResize: (size: number[]) => void;
    onMove: (size: number[]) => void;
  };
  children?: React.ReactNode;
}

export default ({ state, dispatch, children }: BaseComponentProps) => {
  const [location, setLocation] = React.useState<number[] | undefined>();
  const [size, setSize] = React.useState<number[] | undefined>();

  const { component: c } = state;

  const icon = state.component.def.icon;

  // We use the props to set the initial location and size but after that we ignore it and control
  // it with internal state to avoid any jitter. The side effects are dispatched to update for next open.
  useEffect(() => {
    setLocation(c.layout.location);
    setSize(c.layout.size);
  }, []);

  // Dispatch location side effect
  useEffect(() => {
    if (!location) return;

    dispatch.onMove(location);
  }, [location]);

  // Dispatch resize side effect
  useEffect(() => {
    if (!size) return;

    dispatch.onResize(size);
  }, [size]);

  if (!location || !size) return null;

  return (
    <Rnd
      style={{
        borderColor: "black",
        borderWidth: 3,
        borderStyle: "solid",
        borderRadius: 5,
      }}
      scale={state.scale || 1}
      position={{ x: location[0], y: location[1] }}
      size={{ width: size[0], height: size[1] }}
      onDragStop={(e, d) => {
        setLocation([d.x, d.y]);
      }}
      onResizeStop={(_e, _direction, ref, _delta, position) => {
        setSize([parseFloat(ref.style.width), parseFloat(ref.style.height)]);
        setLocation([position.x, position.y]);
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
            {icon && (
              <img
                src={`data:image/svg+xml;utf8,${encodeURIComponent(icon)}`}
                style={{ height: 40, width: 40 }}
              />
            )}
            <h3 className="brand" style={{ marginLeft: 8 }}>
              {" "}
              {c.title}{" "}
            </h3>
          </div>

          <div style={{ ...centeredRow, marginRight: 8 }}>
            <Icons
              status={c.status}
              component={c}
              togglePlay={() => dispatch.onTogglePlay()}
              authorise={() => dispatch.onAuthorise()}
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
  togglePlay: () => void;
  authorise: () => void;
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
      renderWithPortal={true}
      triggerType="custom"
      content={
        <TextContent>
          {awsComponent.def.name} in account {awsComponent.config.accountId} (
          {awsComponent.config.region}) using{" "}
          {awsComponent.config.permissionSet} permission set.
        </TextContent>
      }
    >
      <Pointer style={{ marginTop: 3 }}>
        <TbInfoCircle size={16} />
      </Pointer>
    </Popover>
  );
};

const PlayAuthoriseWrapper = ({
  status,
  authorise,
  children,
}: {
  status: ComponentStatus;
  authorise: () => void;
  children: React.ReactNode;
}) => {
  if (status.authorisation === "authorized")
    return <Pointer>{children}</Pointer>;

  return (
    <Popover
      dismissButton={false}
      position="top"
      size="small"
      triggerType="custom"
      renderWithPortal={true}
      content={
        <TextContent>
          Authorisation expired.
          <br />
          <br />
          <Button onClick={authorise}>Reauthorise</Button>
        </TextContent>
      }
    >
      <Pointer>{children}</Pointer>
    </Popover>
  );
};

const PlayIcon = ({
  status,
  togglePlay,
}: {
  status: ComponentStatus;
  togglePlay: () => void;
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
  authorise: () => void;
}) => {
  if (status.authorisation === "authorized") {
    return (
      <Popover
        dismissButton={false}
        position="top"
        size="small"
        triggerType="custom"
        renderWithPortal={true}
        // TODO Authorised until {ssoExpiryTime}
        // content={<StatusIndicator type="success">Authorised</StatusIndicator>}
        content={<StatusIndicator type="success">Authorised</StatusIndicator>}
      >
        <Pointer>
          <TbPlugConnected color="green" />
        </Pointer>
      </Popover>
    );
  } else {
    return (
      <Popover
        dismissButton={false}
        position="top"
        size="small"
        triggerType="custom"
        renderWithPortal={true}
        content={
          <TextContent>
            Authorisation expired.
            <br />
            <br />
            <Button onClick={authorise}>Reauthorise</Button>
          </TextContent>
        }
      >
        <Pointer>
          <TbPlugConnectedX color="orange" />
        </Pointer>
      </Popover>
    );
  }
};

const Pointer = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) => (
  <div
    style={{
      ...(style || {}),
      cursor: "pointer",
    }}
  >
    {children}
  </div>
);
