import React from "react";
import { Response } from "easy-aws-utils";
import BaseComponent from "../layout/BaseComponent";
import { Inspector } from "react-inspector";
import "./DynamoWatcher.css";
import { dateToLogStr } from "../../services/DateService";
import { AwsComponent } from "../../domain/core";

export type DynamoWatcherComponent = AwsComponent<{
  tableName: string;
}>;

export type DynamoWatcherProps = {
  records: Response[];
  component: DynamoWatcherComponent;
};

const toSentenceCase = (str: string) => {
  return `${str[0]}${str.substring(1, str.length).toLowerCase()}`;
};
export default ({ component: c, records }: DynamoWatcherProps) => {
  return (
    <BaseComponent title={c.props.tableName} component={c}>
      <div style={{ paddingTop: 0 }}>
        {records.map((r, i) => {
          return (
            <div
              key={`${c.props.tableName}-${c.config.accountId}-${i}`}
              style={{
                padding: 8,
                display: "flex",
                flexDirection: "row",
                borderRightWidth: 0,
                borderLeftWidth: 0,
                borderTopWidth: i === 0 ? 1 : 0,
                borderBottomWidth: 1,
                borderStyle: "dotted",
                borderColor: "lightgray",
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
    </BaseComponent>
  );
};
