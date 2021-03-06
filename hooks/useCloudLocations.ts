import { createState, useState } from '@hookstate/core';
import { Initial } from '@hookstate/initial';
import { Touched } from '@hookstate/touched';

import type { State } from '@hookstate/core';
import type { ITestResults } from '~/types';

const testState = createState<ITestResults>(Object());
testState.attach(Initial);
testState.attach(Touched);

export function useCloudLocations(locations?: ITestResults): State<ITestResults> {
  const state = useState(testState);

  if (typeof locations !== 'undefined' && Touched(state).untouched()) {
    state.set(locations.map(l => ({ ...l, done: false })));
  }

  return state;
}
