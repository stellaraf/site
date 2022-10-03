type Dict<T extends unknown = unknown> = Record<string, T>;

type ReactRef<
  E extends HTMLElement | SVGElement = HTMLElement | SVGElement
> = React.MutableRefObject<E>;

type Animated<T> = Omit<T, 'transition'> & import('framer-motion').MotionProps;

type MeronexIcon = import('@meronex/icons').IconBaseProps;

interface Empty {} // eslint-disable-line

/**
 * Enforce string index type (not `number` or `symbol`).
 */
type StringKeyOf<O extends Dict, K = keyof O> = K extends string ? `${K}` : never;

type ValueOf<T> = T[keyof T];

type Nullable<T> = T | null;

type NoOp = () => void;

type PropOf<T, P extends keyof T> = T[P];
