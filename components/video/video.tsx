import dynamic from 'next/dynamic';
import { Skeleton } from '@chakra-ui/react';
import { useBooleanValue } from 'site/hooks';

import type { ReactPlayerProps } from 'react-player';
import type { IVideo } from './types';

const ReactPlayer = dynamic(() => import('react-player'), {
  loading: () => <Skeleton boxSize="100%" startColor="gray.500" endColor="tertiary.500" />,
});

const controlledProps = {
  loop: false,
  muted: false,
  playing: false,
  volume: 1,
  controls: true,
} as ReactPlayerProps;

const uncontrolledProps = {
  loop: true,
  muted: true,
  playing: true,
  volume: 0,
  controls: false,
} as ReactPlayerProps;

export const Video = (props: IVideo) => {
  const { url, enableControls = false, ...rest } = props;
  const { config = {}, style = {} } = rest;

  const customConfig = {
    file: {
      attributes: {
        controlsList: ['nodownload', 'nofullscreen'],
      },
    },
    ...config,
  } as ReactPlayerProps['config'];

  const customStyle = { borderRadius: '1.6rem', ...style } as ReactPlayerProps['style'];

  const playerProps = useBooleanValue(enableControls, controlledProps, uncontrolledProps);

  return (
    <ReactPlayer
      url={url}
      width="100%"
      height="100%"
      style={customStyle}
      config={customConfig}
      {...playerProps}
      {...rest}
    />
  );
};
