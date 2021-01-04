namespace Framer {
  type MotionProps = import('framer-motion').MotionProps;
}

namespace Meronex {
  type IconType = import('@meronex/icons').IconType;
}

type Dict<T extends unknown = unknown> = Record<string, T>;

type ReactRef = React.MutableRefObject<HTMLElement>;

type Animated<T> = Omit<T, 'transition'> & Framer.MotionProps;

type MeronexIcon = import('@meronex/icons').IconBaseProps;
