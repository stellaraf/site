import { chakra } from '@chakra-ui/react';
import { motion, MotionConfig } from 'framer-motion';

import type { MotionProps, Transition, CustomDomComponent } from 'framer-motion';
import type { BoxProps, SystemStyleObject } from '@chakra-ui/react';

type MotionBoxProps = React.PropsWithChildren<
  Exclude<BoxProps, 'transition'> & Exclude<MotionProps, 'transition'> & { transition?: Transition }
>;

type MakeMotionProps<P extends BoxProps> = React.PropsWithChildren<
  Omit<P, 'transition'> & Omit<MotionProps, 'transition'> & { transition?: Transition }
>;

export function motionChakraDiv(baseProps?: SystemStyleObject): React.FC<MotionBoxProps> {
  const baseStyle = baseProps ?? ({} as SystemStyleObject);
  const Chakra = motion<BoxProps>(chakra('div', { baseStyle }));
  const AnimatedDiv = <T extends MotionBoxProps>(props: T): JSX.Element => {
    const { transition, ...rest } = props;
    return (
      <MotionConfig transition={transition}>
        <Chakra {...rest} />
      </MotionConfig>
    );
  };
  return AnimatedDiv;
}

// /**
//  * Combined Chakra + Framer Motion component.
//  * @see https://chakra-ui.com/guides/integrations/with-framer
//  */
// export const AnimatedDiv = motion<BoxProps>(
//   forwardRef<BoxProps, React.ElementType<BoxProps>>((props, ref) => {
//     const chakraProps = Object.fromEntries(
//       Object.entries(props).filter(([key]) => !isValidMotionProp(key)),
//     );
//     return <Box ref={ref} {...chakraProps} />;
//   }),
// );

type MCComponent = Parameters<typeof chakra>[0];
type MCOptions = Parameters<typeof chakra>[1];

export function motionChakra<P extends BoxProps = BoxProps>(
  component: MCComponent,
  options?: MCOptions,
): CustomDomComponent<MakeMotionProps<P>> {
  // @ts-expect-error I don't know how to fix this.
  return motion<P>(chakra<MCComponent, P>(component, options));
}

export const AnimatedDiv = motionChakra<BoxProps>('div');
