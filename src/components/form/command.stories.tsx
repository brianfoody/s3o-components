import React from "react";
// import { Meta } from "@storybook/react/types-6-0";
// import { Story } from "@storybook/react";
import Command, { CommandProps } from "./command";

export default {
  title: "components/form/Command",
  component: Command,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const defaultProps: CommandProps = {};

// Create a master template for mapping args to render the DynamoWatcher component
const Template = (args: CommandProps) => () => <Command {...args} />;

// Reuse that template for creating different stories
export const AuthorisedAndPlaying = Template(defaultProps);
