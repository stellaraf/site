import { createContext, useContext } from 'react';

import type { ISelectContext } from './types';

const SelectContext = createContext<ISelectContext>({} as ISelectContext);
export const { Provider: SelectProvider } = SelectContext;

export const useSelectContext = (): ISelectContext => useContext(SelectContext);
