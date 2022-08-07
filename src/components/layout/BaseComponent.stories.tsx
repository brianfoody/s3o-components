import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import { Response } from "easy-aws-utils";
import BaseComponent, { BaseComponentProps } from "./BaseComponent";
import { baseAwsComponent, baseComponent } from "../../utils/storyUtils";
import { centered } from "../../utils/layoutUtils";

export default {
  title: "components/layout/BaseComponent",
  component: BaseComponent,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

const baseComponentProps: BaseComponentProps = {
  component: baseComponent,
  title: "Title",
  children: (
    <div style={{ flex: 1, ...centered }}>
      <p>Child component</p>
    </div>
  ),
  status: {
    playing: true,
    authorisation: "authorized",
  },
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
  status: {
    authorisation: "authorized",
    playing: false,
  },
};

export const UnauthorisedAndPlaying = Template.bind({});
UnauthorisedAndPlaying.args = {
  ...baseComponentProps,
  status: {
    authorisation: "expired",
    playing: true,
  },
};

export const UnauthorisedAndPaused = Template.bind({});
UnauthorisedAndPaused.args = {
  ...baseComponentProps,
  status: {
    authorisation: "expired",
    playing: false,
  },
};
