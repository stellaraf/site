import * as React from 'react';
import { List, ListItem } from '@chakra-ui/core';

import type { UlProps, OlProps, LiProps } from './types';

export const Ul = (props: UlProps) => <List styleType="circle" {...props} />;

export const Ol = (props: OlProps) => <List as="ol" styleType="decimal" {...props} />;

export const Li = (props: LiProps) => <ListItem {...props} />;
