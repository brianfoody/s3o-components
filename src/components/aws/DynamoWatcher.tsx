import React from "react";
import { Response } from "easy-aws-utils";
import { Inspector } from "react-inspector";
import "./DynamoWatcher.css";
import { dateToLogStr } from "../../services/DateService";
import { AwsComponent, ComponentStatus } from "../../domain/core";
import BaseAwsComponent from "../layout/BaseAwsComponent";
// @ts-ignore
// import lambdaIcon from "aws-svg-icons/lib/Architecture-Service-Icons_07302021/Arch_Compute/64/Arch_AWS-Lambda_64.svg";
import dynamoIcon from "aws-svg-icons/lib/Architecture-Service-Icons_07302021/Arch_Database/64/Arch_Amazon-DynamoDB_64.svg";
import { centeredRow } from "../../utils/layoutUtils";

export type DynamoWatcherComponent = AwsComponent<{
  tableName: string;
}>;

export type DynamoWatcherProps = {
  records: Response[];
  component: DynamoWatcherComponent;
  status: ComponentStatus;
};

const toSentenceCase = (str: string) => {
  return `${str[0]}${str.substring(1, str.length).toLowerCase()}`;
};
export default ({ component: c, records, status }: DynamoWatcherProps) => {
  return (
    <BaseAwsComponent
      title={c.props.tableName}
      component={c}
      icon={dynamoIcon}
      status={status}
    >
      <div style={{ paddingTop: 0, flex: 1 }}>
        {records.map((r, i) => {
          return (
            <div
              key={`${c.props.tableName}-${c.config.accountId}-${i}`}
              style={{
                padding: 8,
                flexDirection: "row",
                borderRightWidth: 0,
                borderLeftWidth: 0,
                borderTopWidth: i === 0 ? 1 : 0,
                borderBottomWidth: 1,
                borderStyle: "dotted",
                borderColor: "lightgray",
                ...centeredRow,
              }}
            >
              <p style={{ color: "gray" }}>{dateToLogStr(r.at)}</p>
              <p style={{ width: 70, paddingLeft: 20 }}>
                {toSentenceCase(r.type)}
              </p>

              <Inspector
                // theme="chromeDark"
                theme="chromeLight"
                table={false}
                data={{ a: 3 }}
                columns={["a"]}
              />
            </div>
          );
        })}
      </div>
    </BaseAwsComponent>
  );
};
