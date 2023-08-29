import { AsProps } from "~/types";

export type VideoProps = AsProps<"video"> & {
  url: string;
  enableControls?: boolean;
  autoPlay?: boolean;
  youTube?: boolean;
};
