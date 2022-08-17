import React from "react";
import SideNavigation from "@cloudscape-design/components/side-navigation";
import { AccessPair, Account, Organisation } from "easy-aws-utils";
import {
  Button,
  ButtonDropdown,
  Header,
  Icon,
  StatusIndicator,
  TextContent,
} from "@cloudscape-design/components";

import "./SideMenu.css";

export type SideMenuProps = {
  state: {
    organisations: Organisation[];
  };
  dispatch: {
    authorise: (organisation: Organisation) => Promise<void>;
    grabCredentials: (accessPair: AccessPair) => Promise<void>;
    onRenameOrg: (organisation: Organisation) => Promise<void>;
    onDeleteOrg: (organisation: Organisation) => Promise<void>;
    onAddOrg: () => Promise<void>;
    onRenameAccount: (organisation: Organisation) => Promise<void>;
  };
};

type Dispatch = SideMenuProps["dispatch"];

export default (props: SideMenuProps) => {
  return (
    <div style={{ padding: 8 }}>
      <div style={{ paddingLeft: 16 }}>
        <Header variant="h3">Global AWS Access</Header>
      </div>

      <Separator />

      <div style={{ height: 8 }}></div>

      {props.state.organisations.map((org) => {
        return (
          <OrganisationMenu
            org={org}
            key={org.ssoStartUrl}
            d={props["dispatch"]}
          />
        );
      })}

      <div
        style={{
          padding: "20px 0px",
        }}
      >
        <Separator />
      </div>

      <div
        style={{
          padding: "0px 30px",
        }}
      >
        <Button variant="normal" onClick={props.dispatch.onAddOrg}>
          Add organisation
        </Button>
      </div>
    </div>
  );
};

const OrganisationMenu = ({ org, d }: { org: Organisation; d: Dispatch }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div style={{ margin: "8px 0px" }} className="organisation">
      <TextContent>
        <h5>
          <ButtonDropdown
            className="dropdown"
            items={[
              { text: "Delete", id: "del", disabled: false },
              {
                text: org.nickname ? "Edit nickname" : "Add nickname",
                id: "add-nick",
                disabled: false,
              },
            ]}
            variant="icon"
            onItemClick={async (evt) => {
              if (evt.detail.id === "del") {
                await d.onDeleteOrg(org);
              } else if (evt.detail.id === "add-nick") {
                await d.onRenameAccount(org);
              }
            }}
          ></ButtonDropdown>

          <span
            style={{ marginRight: 8, position: "relative", top: 5 }}
            aria-open={open}
            onClick={() => setOpen(!open)}
          >
            <Icon name="caret-right-filled" />
          </span>
          <span onClick={() => setOpen(!open)}>
            {org.nickname || org.ssoStartUrl}
          </span>
        </h5>
        <span className="organisation-status">
          {org.authorisedUntil && +org.authorisedUntil > +new Date() && (
            <StatusIndicator type="success">
              Authorised until 21:04
            </StatusIndicator>
          )}
          {(!org.authorisedUntil || +org.authorisedUntil < +new Date()) && (
            <StatusIndicator type="stopped">
              Session expired, <a href="#">refresh</a>
            </StatusIndicator>
          )}
        </span>
      </TextContent>
      <div style={{ paddingLeft: 32 }} className="account">
        {org.accounts.map((a) => (
          <AccountMenu acc={a} key={a.accountId} display={open} d={d} />
        ))}
      </div>
    </div>
  );
};

const AccountMenu = ({
  acc,
  display,
  d,
}: {
  acc: Account;
  display: boolean;
  d: Dispatch;
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div style={{ margin: "8px 0px", display: display ? "block" : "none" }}>
      <TextContent>
        <p>
          <span
            style={{ marginRight: 8, position: "relative", top: 0 }}
            aria-open={open}
            onClick={() => setOpen(!open)}
          >
            <Icon name="caret-right-filled" />
          </span>
          <span onClick={() => setOpen(!open)}>
            {acc.name ? `${acc.name} (#${acc.accountId})` : acc.accountId}
          </span>
        </p>
      </TextContent>

      <div style={{ paddingLeft: 32 }}>
        {acc.roles.map((r) => (
          <Role role={r} acc={acc} display={open} />
        ))}
      </div>
    </div>
  );
};

const Role = ({
  role,
  acc,
  display,
}: {
  role: string;
  acc: Account;
  display: boolean;
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div style={{ margin: "8px 0px", display: display ? "block" : "none" }}>
      <TextContent key={`${acc.accountId}-${role}`}>
        <p>
          {role} (<a>Copy credentials</a>)
        </p>
      </TextContent>
    </div>
  );
};

const Separator = () => (
  <div style={{ height: 2, margin: "8px 0px", background: "#e9ebed" }} />
);
