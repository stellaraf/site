import type { IncomingMessage } from 'http';
import type { ComponentProps, ElementType } from 'react';

export type Cookies = IncomingMessage['headers']['cookie'];

export type { GlobalConfig, GlobalConfigPre, CustomTheme } from 'site/util';

export type PropsOf<T extends ElementType<any>> = ComponentProps<T>;
