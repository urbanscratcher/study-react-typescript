import React, { type ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  href?: never;
};
type AnchorProps = ComponentPropsWithoutRef<"a"> & {
  href: string;
};

// Type Predicate
// if boolean result is true, it tells the exact arg type
function isAnchorProps(props: ButtonProps | AnchorProps): props is AnchorProps {
  // if (props.href) { // not gonna work! -> use in operator
  return "href" in props;
}

export default function Button(props: ButtonProps | AnchorProps) {
  if (isAnchorProps(props)) {
    return <a className="button" {...props}></a>;
  }

  return (
    <button className="button" {...props}>
      {props.children}
    </button>
  );
}
