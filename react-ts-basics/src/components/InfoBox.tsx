import React, { type PropsWithChildren } from "react";

type HintBoxProps = PropsWithChildren<{
  mode: "hint";
}>;

type WarningBoxProps = PropsWithChildren<{
  mode: "warning";
  severity: "low" | "medium" | "high" | undefined;
}>;

type InfoBoxProps = HintBoxProps | WarningBoxProps;

// type InfoBoxProps = PropsWithChildren<{
//   mode: "hint" | "warning";
//   // severity: "low" | "medium" | "high" | undefined;
//   severity?: "low" | "medium" | "high";
// }>;

export default function InfoBox(props: InfoBoxProps) {
  const { children } = props;

  if (props.mode === "hint") {
    return (
      <aside className="infobox infobox-hint">
        <p>{children}</p>
      </aside>
    );
  }

  // TS automatically recognize required conditions in optional conditions
  const { severity } = props;

  return (
    <aside className={`infobox infobox-warning warning--${severity}`}>
      <h2>Warning</h2>
      <p>{children}</p>
    </aside>
  );
}
