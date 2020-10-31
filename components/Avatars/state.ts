import { createState, useState } from '@hookstate/core';

const currentState = createState(0);
export const useCurrent = () => useState(currentState);
