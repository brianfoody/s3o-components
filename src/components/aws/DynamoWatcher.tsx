import React from "react";
import { Response } from "easy-aws-utils";
import { Inspector } from "react-inspector";
import "./DynamoWatcher.css";
import { dateToLogStr } from "../../services/DateService";
import { AwsComponent } from "../../domain/core";
import BaseComponent, { BaseComponentProps } from "../layout/BaseComponent";
import { centered, topAlignedRow } from "../../utils/layoutUtils";
import TextContent from "@cloudscape-design/components/text-content";
import SpaceBetween from "@cloudscape-design/components/space-between";

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

const diff = (o1: any, o2: any) =>
  Object.keys(o2).reduce((diff, key) => {
    if (o1[key] === o2[key]) return diff;
    return {
      ...diff,
      [key]: o2[key],
    };
  }, {});

export default (props: DynamoWatcherProps) => {
  const idGen = (i: number) =>
    `${props.state.component.props.tableName}-${props.state.component.config.accountId}-${i}`;

  const noRecords = props.state.records.length === 0;

  return (
    <BaseComponent {...props} state={{ ...props.state }}>
      <div style={{ paddingTop: 0, flex: 1, ...(noRecords ? centered : {}) }}>
        {noRecords && (
          <TextContent>
            {props.state.component.status.authorisation === "expired" && (
              <p>Authorisation has expired, refresh to view</p>
            )}
            {props.state.component.status.authorisation === "authorized" &&
              !props.state.component.status.playing && <p>Paused</p>}
            {props.state.component.status.authorisation === "authorized" &&
              props.state.component.status.playing && (
                <p>Listening for updates...</p>
              )}
          </TextContent>
        )}

        {props.state.records.map((r, i) => {
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
                ...topAlignedRow,
              }}
            >
              <div style={{ minWidth: 160 }}>
                <TextContent>
                  <SpaceBetween direction="horizontal" size="xs">
                    <p style={{ color: "gray" }}>{dateToLogStr(r.at)}</p>
                    <p style={{ width: 70, paddingLeft: 20 }}>
                      {toSentenceCase(r.type)}
                    </p>
                  </SpaceBetween>
                </TextContent>
              </div>

              <Inspector
                theme="chromeLight"
                table={false}
                data={
                  r.type === "MODIFY" && r.oldImage && r.newImage
                    ? { ...r.key, ...(diff(r.oldImage, r.newImage) || {}) }
                    : r.newImage || r.key
                }
              />
            </div>
          );
        })}
      </div>
    </BaseComponent>
  );
};
