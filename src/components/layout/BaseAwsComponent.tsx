import React from "react";
import { AwsComponent, ComponentStatus } from "../../domain/core";
import BaseComponent, { BASE_FOOTER_HGT } from "./BaseComponent";
import "../../base.css";

type AwsComponentProps<T> = {
  children: React.ReactNode;
  component: AwsComponent<T>;
  status: ComponentStatus;
  // Browse here -> https://sashee.github.io/aws-svg-icons/index.html
  icon: any;
  title: string;
};

const centered = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default (props: AwsComponentProps<any>) => {
  const footer = (
    <div
      style={{
        height: BASE_FOOTER_HGT,
        width: "100%",
        paddingLeft: 8,
        borderTopWidth: 3,
        borderTopStyle: "solid",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <p style={{ fontSize: 12, color: "gray" }}>
        {" "}
        Account {props.component.config.accountId} in{" "}
        {props.component.config.region} using{" "}
        {props.component.config.permissionSet}
      </p>
    </div>
  );
  // return <BaseComponent {...props} footer={footer} />;
  return <BaseComponent {...props} />;
};
