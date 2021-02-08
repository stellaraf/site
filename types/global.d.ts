type Dict<T extends unknown = unknown> = Record<string, T>;

type ReactRef<E extends HTMLElement = HTMLElement> = React.MutableRefObject<E>;

type Animated<T> = Omit<T, 'transition'> & import('framer-motion').MotionProps;

type MeronexIcon = import('@meronex/icons').IconBaseProps;

interface Empty {} // eslint-disable-line
