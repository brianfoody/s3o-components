import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import { Response } from "easy-aws-utils";
import DynamoWatcher, { DynamoWatcherProps } from "./DynamoWatcher";

export default {
  title: "components/aws/DynamoWatcher",
  component: DynamoWatcher,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

// Create a master template for mapping args to render the DynamoWatcher component
const Template: Story<DynamoWatcherProps> = (args) => (
  <DynamoWatcher {...args} />
);

// Reuse that template for creating different stories
export const NoRecords = Template.bind({});
NoRecords.args = { title: "Users", records: [], size: [500, 300] };

export const NoRecordsLarge = Template.bind({});
NoRecordsLarge.args = { title: "Users", records: [], size: [900, 1200] };

export const RecordsKeyOnly = Template.bind({});
RecordsKeyOnly.args = {
  title: "Users",
  records: [
    {
      type: "INSERT",
      key: {
        id: "e0db8e08-e089-42a8-a11e-8dc0c42024ac",
        ts: +new Date(),
      },
    },
    {
      type: "MODIFY",
      key: {
        id: "e0db8e08-e089-42a8-a11e-8dc0c42024ac",
        ts: +new Date(),
      },
    },
  ],
  size: [500, 300],
};

export const RecordsNewImage = Template.bind({});
RecordsNewImage.args = {
  title: "Users",
  records: [
    {
      type: "INSERT",
      key: {
        id: "e0db8e08-e089-42a8-a11e-8dc0c42024ac",
        ts: +new Date(),
      },
      newImage: {
        id: "e0db8e08-e089-42a8-a11e-8dc0c42024ac",
        ts: +new Date(),
        value1: "test abc",
        value2: "test def",
      },
    },
    {
      type: "MODIFY",
      key: {
        id: "e0db8e08-e089-42a8-a11e-8dc0c42024ac",
        ts: +new Date(),
      },
      newImage: {
        id: "e0db8e08-e089-42a8-a11e-8dc0c42024ac",
        ts: +new Date(),
        value1: "12345",
        value2: "678910",
      },
    },
  ],
  size: [500, 300],
};

export const RecordsNewAndOldImage = Template.bind({});
RecordsNewAndOldImage.args = {
  title: "Users",
  records: [
    {
      type: "INSERT",
      key: {
        id: "e0db8e08-e089-42a8-a11e-8dc0c42024ac",
        ts: +new Date(),
      },
      newImage: {
        id: "e0db8e08-e089-42a8-a11e-8dc0c42024ac",
        ts: +new Date(),
        value1: "test abc",
        value2: "test def",
      },
    },
    {
      type: "MODIFY",
      key: {
        id: "e0db8e08-e089-42a8-a11e-8dc0c42024ac",
        ts: +new Date(),
      },
      newImage: {
        id: "e0db8e08-e089-42a8-a11e-8dc0c42024ac",
        ts: +new Date(),
        value1: "12345",
        value2: "678910",
      },
      oldImage: {
        id: "e0db8e08-e089-42a8-a11e-8dc0c42024ac",
        ts: +new Date(),
        value1: "12345",
      },
    },
  ],
  size: [500, 300],
};

const lotsOfRecords: Response[] = [];
for (let i = 0; i < 1000; i++) {
  lotsOfRecords.push({
    type: "INSERT",
    key: {
      id: "e0db8e08-e089-42a8-a11e-8dc0c42024ac",
      ts: +new Date(),
    },
    newImage: {
      id: "e0db8e08-e089-42a8-a11e-8dc0c42024ac",
      ts: +new Date(),
      value1: "test abc",
      value2: "test def",
    },
  } as Response);
}

export const LotsOfRecords = Template.bind({});
LotsOfRecords.args = {
  title: "Users",
  records: lotsOfRecords,
  size: [500, 300],
};
