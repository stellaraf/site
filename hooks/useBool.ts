import { useReducer, Reducer } from 'react';

const toggleReducer = (state: boolean, nextValue?: any) =>
  typeof nextValue === 'boolean' ? nextValue : !state;

export function useBool(initialValue: boolean): [boolean, (nextValue?: any) => void] {
  return useReducer<Reducer<boolean, any>>(toggleReducer, initialValue);
}
