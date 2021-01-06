import { createState, useState } from '@hookstate/core';

import type { State } from '@hookstate/core';

const konamiState = createState<boolean>(false);

export const useKonamiState = (): State<boolean> => useState<boolean>(konamiState);
