import { Organisation } from "easy-aws-utils";
import React from "react";

import {
  BaseComponentProps,
  ComponentStatus,
} from "../components/layout/BaseComponent";
import { DynamoWatcherComponentDef } from "../domain";
import { AwsComponent, Component } from "../domain/core";

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
  def: DynamoWatcherComponentDef,
  playing: allGoodStatus.playing,
  selected: false,
  title: "Feedback",
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

export const baseDispatch: BaseComponentProps<unknown, unknown>["dispatch"] = {
  onSelection: (selected) => console.log(`selected ${selected}`),
  onTogglePlay: () => console.log("TOGGLE"),
  onAuthorise: () => console.log("AUTHORISE"),
  onResize: (size) => console.log("RESIZE", size),
  onMove: (size) => console.log("MOVE", size),
};

export const BaseStory = ({ children }: { children: React.ReactNode }) => (
  <div style={{ padding: 20 }}>{children}</div>
);

export const sampleOrgs: Organisation[] = [
  {
    ssoStartUrl: "https://d-90677e2e6d.awsapps.com/start",
    ssoRegion: "us-east-1",
    accounts: [
      {
        accountId: "532747402531",
        defaultRegion: "us-east-1",
        roles: ["AdministratorAccess"],
      },
      {
        accountId: "431781111075",
        defaultRegion: "us-east-1",
        roles: ["AdministratorAccess"],
      },
    ],
    roles: ["AdministratorAccess"],
  },
  {
    ssoStartUrl: "https://d-97670d3191.awsapps.com/start#/",
    ssoRegion: "ap-southeast-2",
    accounts: [
      {
        accountId: "337387902522",
        defaultRegion: "ap-southeast-2",
        roles: ["AWSAdministratorAccess"],
      },
    ],
    roles: ["AWSAdministratorAccess"],
  },
];