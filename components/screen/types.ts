import type { BoxProps } from '@chakra-ui/react';
import type { IVideo } from '~/components';

export interface IScreen extends IVideo, Omit<BoxProps, 'style'> {}
