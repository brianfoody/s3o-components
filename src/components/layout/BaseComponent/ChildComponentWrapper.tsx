import React from "react";

type Props = {
  children: React.ReactNode;
};
export default (props: Props) => {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        overflow: "scroll",
        marginBottom: 3,
        cursor: "default",
      }}
      className="componentBody"
    >
      {props.children}
    </div>
  );
};
