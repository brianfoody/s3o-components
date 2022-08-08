import React from "react";
import { Response } from "easy-aws-utils";
import { Inspector } from "react-inspector";
import "./DynamoWatcher.css";
import { dateToLogStr } from "../../services/DateService";
import { AwsComponent } from "../../domain/core";
import BaseComponent, { BaseComponentProps } from "../layout/BaseComponent";

import { centeredRow } from "../../utils/layoutUtils";

export type DynamoWatcherComponent = {
  tableName: string;
};

export interface DynamoWatcherProps extends BaseComponentProps {
  state: BaseComponentProps["state"] & {
    records: Response[];
    component: AwsComponent<DynamoWatcherComponent>;
  };
}

const toSentenceCase = (str: string) => {
  return `${str[0]}${str.substring(1, str.length).toLowerCase()}`;
};
export default ({ state, dispatch }: DynamoWatcherProps) => {
  const idGen = (i: number) =>
    `${state.component.props.tableName}-${state.component.config.accountId}-${i}`;
  return (
    <BaseComponent
      state={{ ...state, title: state.component.props.tableName }}
      dispatch={dispatch}
    >
      <div style={{ paddingTop: 0, flex: 1 }}>
        {state.records.map((r, i) => {
          return (
            <div
              key={idGen(i)}
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
    </BaseComponent>
  );
};
