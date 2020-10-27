import { createState, useState } from '@hookstate/core';
import { Initial } from '@hookstate/initial';
import { Touched } from '@hookstate/touched';
import type { ITestResult } from './types';

const testState = createState<ITestResult>(Object());
testState.attach(Initial);
testState.attach(Touched);

export function useCloudLocations(locations?: ITestResult) {
  const state = useState(testState);
  if (typeof locations !== 'undefined' && Touched(state).untouched()) {
    state.set(locations);
  }
  return state;
}
