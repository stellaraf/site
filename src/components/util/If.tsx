import type { IIf } from "./types";

export const If: React.FC<IIf> = (props: IIf) => {
  const { condition, render, children } = props;
  return condition ? (render ? render() : children) : null;
};
