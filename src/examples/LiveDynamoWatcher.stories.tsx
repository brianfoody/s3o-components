import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import LiveDynamoWatcher from "./LiveDynamoWatcher";

export default {
  title: "components/examples/LiveDynamoWatcher",
  component: LiveDynamoWatcher,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

const id = () => Math.random() + "";

// Create a master template for mapping args to render the DynamoWatcher component
const Template: Story = (args) => <LiveDynamoWatcher />;

// Reuse that template for creating different stories
export const DynamoWatcherExample = Template.bind({});
DynamoWatcherExample.args = {};
