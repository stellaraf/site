import { createState, useState } from '@hookstate/core';

const konamiState = createState<boolean>(false);

export const useKonamiState = () => useState<boolean>(konamiState);
