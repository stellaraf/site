import type { ReactPlayerProps } from 'react-player';

export interface IVideo extends Pick<ReactPlayerProps, 'style' | 'config'> {
  url: string;
  enableControls?: boolean;
}
