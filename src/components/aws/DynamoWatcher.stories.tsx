import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import { Response } from "easy-aws-utils";
import DynamoWatcher, { DynamoWatcherProps } from "./DynamoWatcher";
import { allGoodStatus, baseAwsComponent } from "../../utils/storyUtils";
import { centered } from "../../utils/layoutUtils";
import { components } from "../../domain/core";

export default {
  title: "components/aws/DynamoWatcher",
  component: DynamoWatcher,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

const baseComponentProps: DynamoWatcherProps = {
  state: {
    component: {
      ...baseAwsComponent,
      def: components.find((c) => c.type === "dynamoDbWatcher")!,
      props: {
        tableName: "Users",
      },
    },
    title: "Title",
    status: {
      playing: true,
      authorisation: "authorized",
    },
    records: [],
  },
  dispatch: {},
  children: (
    <div style={centered}>
      <p>Child component</p>
    </div>
  ),
};

// Create a master template for mapping args to render the DynamoWatcher component
const Template: Story<DynamoWatcherProps> = (args) => (
  <DynamoWatcher {...args} />
);

// Reuse that template for creating different stories
export const NoRecords = Template.bind({});
NoRecords.args = {
  ...baseComponentProps,
  state: {
    ...baseComponentProps.state,
    component: {
      ...baseComponentProps.state.component,
      size: [500, 300],
    },
    status: allGoodStatus,
    records: [],
  },
};

export const NoRecordsLarge = Template.bind({});
NoRecordsLarge.args = {
  ...baseComponentProps,
  state: {
    ...baseComponentProps.state,
    component: {
      ...baseComponentProps.state.component,
      size: [900, 1200],
    },
    status: allGoodStatus,
    records: [],
  },
};

export const RecordsKeyOnly = Template.bind({});
RecordsKeyOnly.args = {
  ...baseComponentProps,
  state: {
    ...baseComponentProps.state,
    component: {
      ...baseComponentProps.state.component,
    },
    status: allGoodStatus,
    records: [
      {
        at: new Date(),
        type: "INSERT",
        key: {
          id: "e0db8e08-e089-42a8-a11e-8dc0c42024ac",
          ts: +new Date(),
        },
      },
      {
        at: new Date(),
        type: "MODIFY",
        key: {
          id: "e0db8e08-e089-42a8-a11e-8dc0c42024ac",
          ts: +new Date(),
        },
      },
    ],
  },
};

export const RecordsNewImage = Template.bind({});
RecordsNewImage.args = {
  ...baseComponentProps,
  state: {
    ...baseComponentProps.state,
    status: allGoodStatus,
    records: [
      {
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
      },
      {
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
      },
    ],
  },
};

export const RecordsNewAndOldImage = Template.bind({});
RecordsNewAndOldImage.args = {
  ...baseComponentProps,
  state: {
    ...baseComponentProps.state,
    status: allGoodStatus,
    records: [
      {
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
      },
      {
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
      },
    ],
  },
};

const lotsOfRecords: Response[] = [];
for (let i = 0; i < 1000; i++) {
  lotsOfRecords.push({
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
  } as Response);
}

export const LotsOfRecords = Template.bind({});
LotsOfRecords.args = {
  ...baseComponentProps,
  state: {
    ...baseComponentProps.state,
    status: allGoodStatus,
    records: lotsOfRecords,
  },
};
