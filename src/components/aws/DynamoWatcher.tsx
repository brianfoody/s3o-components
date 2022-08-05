import React from "react";
import { Response } from "easy-aws-utils";
import BaseComponent from "../layout/BaseComponent";
import { Inspector } from "react-inspector";

export type DynamoWatcherProps = {
  size: number[];
  records: Response[];
  title: string;
};
export default ({ size, records, title }: DynamoWatcherProps) => {
  return (
    <BaseComponent title={title} size={size}>
      <div style={{ padding: 10 }}>
        <p>Number of records found: {records.length}</p>

        {records.map((r) => {
          return <Inspector data={{ a: 1 }} />;
        })}
      </div>
    </BaseComponent>
  );
};
