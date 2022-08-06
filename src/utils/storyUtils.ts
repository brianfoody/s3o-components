import { AwsComponent, Component } from "../domain/core";

export const baseComponent: Component = {
  id: "base-component",
  type: "box",
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
};
