import { createState, useState } from '@hookstate/core';
import { Initial } from '@hookstate/initial';
import { Touched } from '@hookstate/touched';
import type { ITestResults } from 'site/types';

const testState = createState<ITestResults>(Object());
testState.attach(Initial);
testState.attach(Touched);

export function useCloudLocations(locations?: ITestResults) {
  const state = useState(testState);
  if (typeof locations !== 'undefined' && Touched(state).untouched()) {
    state.set(locations.map(l => ({ ...l, done: false })));
  }
  return state;
}
