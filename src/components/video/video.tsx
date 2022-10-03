import dynamic from 'next/dynamic';
import { Skeleton } from '@chakra-ui/react';
import { useBooleanValue, useSSR } from '~/hooks';

import type { DynamicOptions } from 'next/dynamic';
import type { ReactPlayerProps } from 'react-player';
import type { IVideo } from './types';

type LoaderType = NonNullable<DynamicOptions['loading']>;

const Loader: LoaderType = () => (
  <Skeleton boxSize="100%" startColor="gray.500" endColor="tertiary.500" />
);

const ReactPlayer = dynamic(() => import('react-player'), {
  loading: Loader,
});

const controlledProps = {
  playing: false,
  controls: true,
  muted: false,
  loop: false,
  volume: 1,
} as ReactPlayerProps;

const uncontrolledProps = {
  playsinline: true,
  controls: false,
  playing: true,
  muted: true,
  loop: true,
  volume: 0,
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

  const { isClient } = useSSR();

  return (
    <>
      {isClient && (
        <ReactPlayer
          url={url}
          width="100%"
          height="100%"
          style={customStyle}
          config={customConfig}
          {...playerProps}
          {...other}
        />
      )}
    </>
  );
};
