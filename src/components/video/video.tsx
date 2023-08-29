import { useMemo } from "react";

import { chakra } from "@chakra-ui/react";
import Plyr from "plyr-react";

import "plyr-react/plyr.css";

import type { VideoProps } from "./types";
import type { PlyrOptions, PlyrSource } from "plyr-react";

const controlledProps: PlyrOptions = {
  autoplay: false,
  clickToPlay: true,
  disableContextMenu: true,
  hideControls: false,
  loop: { active: false },
  muted: false,
  volume: 1,
  storage: { enabled: true, key: "plyr" },
};

const uncontrolledProps: PlyrOptions = {
  autopause: false,
  autoplay: true,
  clickToPlay: false,
  controls: [],
  disableContextMenu: true,
  fullscreen: { enabled: false },
  hideControls: true,
  loop: { active: true },
  muted: true,
  volume: 0,
  storage: { enabled: false },
};

export const Video = (props: VideoProps) => {
  const { enableControls = false, autoPlay, youTube = false, url: _, ...rest } = props;

  let { url } = props;
  if (url.match(/^\/\/.*$/)?.length ?? 0 !== 0) {
    url = "https:" + url;
  }

  const options = useMemo<PlyrOptions>(() => {
    const out = enableControls ? controlledProps : uncontrolledProps;
    if (typeof autoPlay !== "undefined") {
      out.autoplay = autoPlay;
    }
    return out;
  }, [enableControls]);

  const source = useMemo<PlyrSource>(() => {
    const src: ArrayElement<PlyrSource["sources"]> = { src: url };
    if (youTube) {
      src.provider = "youtube";
    }
    const out: PlyrSource = { type: "video", sources: [src] };
    return out;
  }, [url]);

  return (
    <chakra.div css={{ "& .plyr": { cursor: "default", height: "100%" } }} boxSize="100%">
      <Plyr id={url} disablePictureInPicture {...rest} source={source} options={options} />
    </chakra.div>
  );
};
