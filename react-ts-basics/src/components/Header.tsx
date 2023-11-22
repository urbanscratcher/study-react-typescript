import { type PropsWithChildren } from "react";

type HeaderProps = PropsWithChildren<{
  image: {
    src: string;
    alt: string;
  };
}>;

function Header({ image, children }: HeaderProps) {
  return (
    <header>
      <img {...image} />
      {children}
    </header>
  );
}

export default Header;
