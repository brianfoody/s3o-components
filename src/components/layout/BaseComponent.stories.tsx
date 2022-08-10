import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import BaseComponent, { BaseComponentProps } from "./BaseComponent";
import { baseComponent } from "../../utils/storyUtils";
import { centered } from "../../utils/layoutUtils";
import { AwsComponent } from "../../domain/core";

export default {
  title: "components/layout/BaseComponent",
  component: BaseComponent,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

const baseComponentProps: BaseComponentProps = {
  state: {
    component: baseComponent,
    title: "Title",
    status: {
      playing: true,
      authorisation: "authorized",
    },
  },
  dispatch: {
    onTogglePlay: () => console.log("TOGGLE"),
    onAuthorise: () => console.log("AUTHORISE"),
    onResize: (size) => console.log("RESIZE", size),
    onMove: (size) => console.log("MOVE", size),
  },
  children: (
    <div style={{ flex: 1, ...centered }}>
      <p>Child component</p>
    </div>
  ),
};

// Create a master template for mapping args to render the DynamoWatcher component
const Template: Story<BaseComponentProps> = (args) => (
  <BaseComponent {...args} />
);

// Reuse that template for creating different stories

export const AuthorisedAndPlaying = Template.bind({});
AuthorisedAndPlaying.args = {
  ...baseComponentProps,
};

export const AuthorisedAndPaused = Template.bind({});
AuthorisedAndPaused.args = {
  ...baseComponentProps,
  state: {
    ...baseComponentProps.state,
    status: {
      authorisation: "authorized",
      playing: false,
    },
  },
};

export const UnauthorisedAndPlaying = Template.bind({});
UnauthorisedAndPlaying.args = {
  ...baseComponentProps,
  state: {
    ...baseComponentProps.state,
    status: {
      authorisation: "expired",
      playing: true,
    },
  },
};

export const UnauthorisedAndPaused = Template.bind({});
UnauthorisedAndPaused.args = {
  ...baseComponentProps,
  state: {
    ...baseComponentProps.state,
    status: {
      authorisation: "expired",
      playing: false,
    },
  },
};

export const MovesMoreOnAScaledOutCanvas = Template.bind({});
MovesMoreOnAScaledOutCanvas.args = {
  ...baseComponentProps,
  state: {
    ...baseComponentProps.state,
    scale: 0.25,
  },
};

export const MovesLessOnAScaledInCanvas = Template.bind({});
MovesLessOnAScaledInCanvas.args = {
  ...baseComponentProps,
  state: {
    ...baseComponentProps.state,
    scale: 10,
  },
};

export const AwsComponentShowingInformation = Template.bind({});
AwsComponentShowingInformation.args = {
  ...baseComponentProps,
  state: {
    ...baseComponentProps.state,
    component: {
      ...baseComponentProps.state.component,
      name: "DynamoDB stream poller",
      config: {
        accountId: "123456789",
        region: "us-east-1",
        permissionSet: "DeveloperAccess",
      },
    } as AwsComponent<any>,
  },
};
