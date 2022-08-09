import { AwsComponent, Component, ComponentStatus } from "../domain/core";

export const allGoodStatus: ComponentStatus = {
  authorisation: "authorized",
  playing: true,
};

export const baseComponent: Component = {
  id: "base-component",
  def: {
    type: "box",
    name: "Box",
  },
  location: [0, 0],
  lastLocation: [0, 0],
  size: [500, 300],
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
