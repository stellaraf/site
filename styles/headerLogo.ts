import { createState, useState } from '@hookstate/core';

const headerLogo = createState(false);
export const useHeaderLogo = () => useState(headerLogo);
