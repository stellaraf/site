import type { IncomingMessage } from 'http';
import type { ComponentProps, ElementType, MutableRefObject } from 'react';
import type { MotionProps } from 'framer-motion';

export type Cookies = IncomingMessage['headers']['cookie'];

export type PropsOf<T extends ElementType<any>> = ComponentProps<T>;

/**
 * PushFront & Tuple taken from:
 * https://github.com/Microsoft/TypeScript/issues/26223
 *
 * In order to describe Tuples of N length as a type variable.
 */
type PushFront<TailT extends any[], FrontT> = ((front: FrontT, ...rest: TailT) => any) extends (
  ...tuple: infer TupleT
) => any
  ? TupleT
  : never;

export type Tuple<ElementT, LengthT extends number, OutputT extends any[] = []> = {
  0: OutputT;
  1: Tuple<ElementT, LengthT, PushFront<OutputT, ElementT>>;
}[OutputT['length'] extends LengthT ? 0 : 1];

export type { GetStaticProps, GetStaticPaths, NextPageContext } from 'next';

export type Dict = Record<string, any>;

export type ReactRef = MutableRefObject<HTMLElement>;

export type DivRef = MutableRefObject<HTMLDivElement>;

export type Animated<T> = Omit<T, keyof MotionProps> & Omit<MotionProps, keyof T>;
