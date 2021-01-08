import type { ReactPlayerProps } from 'react-player';

export interface IVideo extends ReactPlayerProps {
  url: string;
  enableControls?: boolean;
}
