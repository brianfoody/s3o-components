import React from "react";
import { BaseStory, sampleOrgs } from "../../../utils/storyUtils";
import SideMenu, { SideMenuProps } from "./SideMenu";

export default {
  title: "components/layout/SideMenu",
  component: SideMenu,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const defaultProps: SideMenuProps = {
  state: { organisations: sampleOrgs },
  dispatch: {
    authorise: async (accessPair) => {},
    grabCredentials: async (accessPair) => {},
    onRenameOrg: async (organisation) => {},
    onDeleteOrg: async (organisation) => {},
    onAddOrg: async () => {},
    onRenameAccount: async (organisation) => {},
  },
};

// Create a master template for mapping args to render the DynamoWatcher component
const Template =
  (args: SideMenuProps, width: number | undefined = undefined) =>
  () =>
    (
      <div style={{ maxWidth: width }}>
        <BaseStory>
          <SideMenu {...args} />
        </BaseStory>
      </div>
    );
// Reuse that template for creating different stories

export const StandardMenu = Template(defaultProps);

export const StandardMenuAtWidth = Template(defaultProps, 400);
