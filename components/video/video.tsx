import dynamic from 'next/dynamic';
import { Skeleton } from '@chakra-ui/react';
import { useBooleanValue } from '~/hooks';

import type { LoadableBaseOptions } from 'next/dynamic';
import type { ReactPlayerProps } from 'react-player';
import type { IVideo } from './types';

const Loader: LoadableBaseOptions['loading'] = () => (
  <Skeleton boxSize="100%" startColor="gray.500" endColor="tertiary.500" />
);

const ReactPlayer = dynamic(() => import('react-player'), {
  loading: Loader,
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

export const Video: React.FC<IVideo> = (props: IVideo) => {
  const { enableControls = false, ...rest } = props;

  const { config = {}, style = {}, url: _, ...other } = rest;

  let { url } = rest;
  if (url.match(/^\/\/.*$/)?.length ?? 0 !== 0) {
    url = 'https:' + url;
  }

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
      {...other}
    />
  );
};
