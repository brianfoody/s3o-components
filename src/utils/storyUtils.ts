import { BaseComponentProps } from "../components/layout/BaseComponent";
import { AwsComponent, Component, ComponentStatus } from "../domain/core";

export const allGoodStatus: ComponentStatus = {
  authorisation: "authorized",
  playing: true,
};

export const allBadStatus: ComponentStatus = {
  authorisation: "expired",
  playing: false,
};

export const unauthorizedStatus: ComponentStatus = {
  authorisation: "expired",
  playing: true,
};

export const pausedStatus: ComponentStatus = {
  authorisation: "authorized",
  playing: false,
};

export const baseComponent: Component = {
  id: "base-component",
  def: {
    type: "box",
    name: "Box",
  },
  status: allGoodStatus,
  title: "Users",
  layout: {
    location: [0, 0],
    lastLocation: [0, 0],
    size: [500, 300],
  },
  props: {},
};

export const baseAwsComponent: AwsComponent<any> = {
  ...baseComponent,
  config: {
    ssoUrl: "https://myUrl.com",
    accountId: "123456789",
    region: "us-east-1",
    permissionSet: "AdministratorAccess",
  },
  props: {},
};

export const baseDispatch: BaseComponentProps["dispatch"] = {
  onTogglePlay: () => console.log("TOGGLE"),
  onAuthorise: () => console.log("AUTHORISE"),
  onResize: (size) => console.log("RESIZE", size),
  onMove: (size) => console.log("MOVE", size),
};
