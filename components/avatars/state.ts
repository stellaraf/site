import { createState, useState } from '@hookstate/core';

import type { State } from '@hookstate/core';

const currentState = createState<number>(0);
export const useCurrent = (): State<number> => useState(currentState);
