import React from "react";
import BaseComponent, { BaseComponentProps } from "./BaseComponent";
import {
  allGoodStatus,
  baseComponent,
  baseDispatch,
  BaseStory,
} from "../../../utils/storyUtils";
import { AwsComponent } from "../../../domain/core";

export default {
  title: "components/layout/BaseComponent",
  component: BaseComponent,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const baseComponentProps: BaseComponentProps<number[], number> = {
  ports: {
    dataFetcher: {
      delay: 500,
      initialData: [],
      update: (data, update) => [...data, update],
      fetch: async () => Math.round(Math.random() * 100),
    },
  },
  state: {
    component: baseComponent,
    authorisation: allGoodStatus.authorisation,
    scale: 1,
  },
  dispatch: baseDispatch,
};

// Create a master template for mapping args to render the DynamoWatcher component
const Template = (args: BaseComponentProps<number[], number>) => () =>
  (
    <BaseStory>
      <BaseComponent {...args} />
    </BaseStory>
  );
// Reuse that template for creating different stories

export const AuthorisedAndPlaying = Template(baseComponentProps);

export const AuthorisedAndPaused = Template({
  ...baseComponentProps,
  state: {
    ...baseComponentProps.state,
    component: {
      ...baseComponentProps.state.component,
      playing: false,
    },
    authorisation: "authorized",
  },
});

export const UnauthorisedAndPlaying = Template({
  ...baseComponentProps,
  state: {
    ...baseComponentProps.state,
    component: {
      ...baseComponentProps.state.component,
      playing: true,
    },
    authorisation: "expired",
  },
});

export const UnauthorisedAndPaused = Template({
  ...baseComponentProps,
  state: {
    ...baseComponentProps.state,
    component: {
      ...baseComponentProps.state.component,
      playing: false,
    },
    authorisation: "expired",
  },
});

export const Selected = Template({
  ...baseComponentProps,
  state: {
    ...baseComponentProps.state,
    component: {
      ...baseComponentProps.state.component,
      selected: true,
    },
  },
});

export const MovesMoreOnAScaledOutCanvas = Template({
  ...baseComponentProps,
  state: {
    ...baseComponentProps.state,
    scale: 0.25,
  },
});

export const MovesLessOnAScaledInCanvas = Template({
  ...baseComponentProps,
  state: {
    ...baseComponentProps.state,
    scale: 10,
  },
});

export const AwsComponentShowingInformation = Template({
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
});
