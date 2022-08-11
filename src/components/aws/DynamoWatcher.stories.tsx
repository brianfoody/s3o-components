import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import DynamoWatcher, { DynamoWatcherProps } from "./DynamoWatcher";
import { DynamoRecord } from "./model";
import ChildComponentWrapper from "../layout/ChildComponentWrapper";

export default {
  title: "components/aws/DynamoWatcher",
  component: DynamoWatcher,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

const id = () => Math.random() + "";

// Create a master template for mapping args to render the DynamoWatcher component
const Template: Story<DynamoWatcherProps> = (args) => (
  <div
    style={{
      width: 600,
      height: 400,
      borderRadius: 3,
      borderWidth: 3,
      borderStyle: "solid",
      overflow: "scroll",
    }}
  >
    <ChildComponentWrapper>
      <DynamoWatcher {...args} />
    </ChildComponentWrapper>
  </div>
);

// Reuse that template for creating different stories
export const NoRecords = Template.bind({});
NoRecords.args = {
  data: [],
};

export const RecordsKeyOnly = Template.bind({});
RecordsKeyOnly.args = {
  data: [
    {
      id: id(),
      at: new Date(),
      type: "INSERT",
      key: {
        id: "e0db8e08-e089-42a8-a11e-8dc0c42024ac",
        ts: +new Date(),
      },
    } as DynamoRecord,
    {
      id: id(),
      at: new Date(),
      type: "MODIFY",
      key: {
        id: "e0db8e08-e089-42a8-a11e-8dc0c42024ac",
        ts: +new Date(),
      },
    } as DynamoRecord,
  ],
};

export const RecordsNewImage = Template.bind({});
RecordsNewImage.args = {
  data: [
    {
      id: id(),
      at: new Date(),
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
    } as DynamoRecord,
    {
      id: id(),
      at: new Date(),
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
    } as DynamoRecord,
  ],
};

export const RecordsNewAndOldImage = Template.bind({});
RecordsNewAndOldImage.args = {
  data: [
    {
      id: id(),
      at: new Date(),
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
    } as DynamoRecord,

    {
      id: id(),
      at: new Date(),
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
    } as DynamoRecord,
  ],
};

const lotsOfRecords: DynamoRecord[] = [];
for (let i = 0; i < 100; i++) {
  lotsOfRecords.push({
    id: id(),
    at: new Date(),
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
  } as DynamoRecord);
}

export const LotsOfRecords = Template.bind({});
LotsOfRecords.args = {
  data: lotsOfRecords,
};
