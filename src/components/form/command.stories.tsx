import React from "react";
// import { Meta } from "@storybook/react/types-6-0";
// import { Story } from "@storybook/react";
import Command, { CommandProps } from "./command";
import { sampleOrgs } from "../../utils/storyUtils";

export default {
  title: "components/form/Command",
  component: Command,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const defaultProps: CommandProps = {
  organisations: sampleOrgs,
  dataFetcher: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return [1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => ({
      label: `Table ${i}`,
      value: `Table ${i}`,
    }));
  },
};

// Create a master template for mapping args to render the DynamoWatcher component
const Template = (args: CommandProps) => () => <Command {...args} />;

// Reuse that template for creating different stories
export const AuthorisedAndPlaying = Template(defaultProps);
