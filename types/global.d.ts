namespace React {
  type MutableRefObject = import('react').MutableRefObject;
}

namespace Framer {
  type MotionProps = import('framer-motion').MotionProps;
}

namespace Meronex {
  type IconType = import('@meronex/icons').IconType;
}

type Dict<T extends any = any> = Record<string, T>;

type ReactRef = React.MutableRefObject<HTMLElement>;

type Animated<T> = Omit<T, keyof Framer.MotionProps> & Omit<Framer.MotionProps, keyof T>;

type MeronexIcon = Meronex.IconType;
