import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import { Response } from "easy-aws-utils";
import DynamoWatcher, { DynamoWatcherProps } from "./DynamoWatcher";
import {
  allGoodStatus,
  allBadStatus,
  unauthorizedStatus,
  pausedStatus,
  baseAwsComponent,
  baseDispatch,
} from "../../utils/storyUtils";
import { centered } from "../../utils/layoutUtils";
import { DynamoWatcherComponent } from "../../domain/components";

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
      def: DynamoWatcherComponent,
      props: {
        tableName: "Users",
      },
      title: "Title",
      status: allGoodStatus,
    },
    records: [],
  },
  dispatch: baseDispatch,
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
export const NoRecordsListening = Template.bind({});
NoRecordsListening.args = {
  ...baseComponentProps,
};
export const NoRecordsNotAuthorized = Template.bind({});
NoRecordsNotAuthorized.args = {
  ...baseComponentProps,
  state: {
    ...baseComponentProps.state,
    component: {
      ...baseComponentProps.state.component,
      status: unauthorizedStatus,
    },
  },
};
export const NoRecordsPaused = Template.bind({});
NoRecordsPaused.args = {
  ...baseComponentProps,
  state: {
    ...baseComponentProps.state,
    component: {
      ...baseComponentProps.state.component,
      status: pausedStatus,
    },
  },
};

export const NoRecordsLarge = Template.bind({});
NoRecordsLarge.args = {
  ...baseComponentProps,
  state: {
    ...baseComponentProps.state,
    component: {
      ...baseComponentProps.state.component,
      status: allGoodStatus,
      layout: {
        ...baseComponentProps.state.component.layout,
        size: [900, 1200],
      },
    },
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
      status: allGoodStatus,
    },
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
    component: {
      ...baseComponentProps.state.component,
      status: allGoodStatus,
    },
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
    component: {
      ...baseComponentProps.state.component,
      status: allGoodStatus,
    },
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
    component: {
      ...baseComponentProps.state.component,
      status: allGoodStatus,
    },
    records: lotsOfRecords,
  },
};
