import React from "react";
import { Button } from "@mantine/core";
import clsx from "clsx";
import styles from "./RespondButton.module.css";

type Variant = "gray" | "dark";

type Props = {
  children?: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: Variant;
  fullWidth?: boolean;
  loading?: boolean;
  className?: string; 
  target?: string;
  rel?: string;
};

export function RespondButton({
  children = "Откликнуться",
  href,
  onClick,
  variant = "gray",
  loading = false,
  className,
  target,
  rel,
}: Props) {
  const localClass = clsx(
    className ? className : variant === "dark" ? styles.buttonMainBlack : styles.buttonAlt,
  );

  if (href) {
    return (
      <Button
        component="a"
        href={href}
        target={target}
        rel={rel}
        className={localClass}
        loading={loading}
      >
        {children}
      </Button>
    );
  }

  return (
    <Button className={localClass} onClick={onClick} loading={loading}>
      {children}
    </Button>
  );
}

