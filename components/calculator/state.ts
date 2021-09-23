import { useCallback, useEffect } from 'react';
import create from 'zustand';
import produce from 'immer';
import { persist } from 'zustand/middleware';
import { withDev, divideArray, entries } from '~/util';

import type { StateCreator } from 'zustand';

export type FormValue = string | number | boolean;

interface FormState {
  /**
   * Form field values, tracked by field ID.
   */
  fields: {
    [product: string]: {
      [field: string]: FormValue;
    };
  };

  /**
   * Set the value of a field.
   *
   * @param name Field ID.
   * @param value New value.
   */
  setValue(product: string, name: string, value: FormValue): void;

  /**
   * Get a getter/setter tuple similar to `React.useState()` for a given field. If that field
   * doesn't exist on the state object, it will be added.
   *
   * @param name Field ID.
   * @param initialValue Initial state value if the field does not exist.
   */
  getFieldState<VA extends FormValue, V extends VA = VA>(
    product: string,
    name: string,
    initialValue: V,
  ): readonly [V, (v: V) => void];

  /**
   * Export field values by product name.
   *
   * @param product Product name.
   */
  exportProduct<P extends string>(product: P): FormState['fields'][P] | null;
}

export interface TableRow {
  name: string;
  product: string;
  productCode: string;
  quantity: number;
  unitPrice: number;
  price: number;
}

export interface TableState {
  rows: TableRow[];
  resetRows(): void;
  removeRow(index: number): void;
  addRows(...rows: TableRow[]): void;
  updateRowQuantity(index: number, quantity: number): void;
  cloneRow(index: number): void;
}

const formValuesState: StateCreator<FormState> = (set, get) => ({
  fields: {},

  setValue(product: string, name: string, value: FormValue): void {
    set(
      produce<FormState>(state => {
        if (!(product in state.fields)) {
          state.fields[product] = {};
        }
        state.fields[product][name] = value;
      }),
    );
  },

  getFieldState<VA extends FormValue, V extends VA = VA>(
    product: string,
    name: string,
    initialValue: V,
  ): readonly [V, (v: V) => void] {
    const { setValue, fields } = get();
    if (!(name in fields)) {
      setValue(product, name, initialValue);
    }
    const getter = {
      get value() {
        return get().fields[product][name] as V;
      },
    };
    const setter = (value: FormValue) => {
      if (typeof value === 'number' && isNaN(value)) {
        // Handle NaN values, which are passed when a number field is empty.
        value = 0;
      }
      setValue(product, name, value);
    };
    return [getter.value, setter];
  },
  exportProduct<P extends string>(product: P): FormState['fields'][P] | null {
    const { fields } = get();
    if (product in fields) {
      return fields[product];
    }
    return null;
  },
});

const tableState: StateCreator<TableState> = set => ({
  rows: [],
  updateRowQuantity(index: number, quantity: number): void {
    set(
      produce<TableState>(state => {
        state.rows[index].quantity = quantity;
        for (const row of state.rows) {
          row.price = row.unitPrice * row.quantity;
        }
      }),
    );
  },
  addRows(...newRows: TableRow[]): void {
    set(
      produce<TableState>(state => {
        // Get rows that both do and do not overlap the input rows.
        const [overlapping, nonOverlapping] = divideArray(newRows, newRow => {
          const keys = ['productCode', 'product', 'unitPrice'] as (keyof TableRow)[];
          for (const current of state.rows) {
            const matchesAll = keys.filter(k => current[k] === newRow[k]).length === keys.length;
            if (matchesAll) {
              return true;
            }
          }
          return false;
        });
        for (const overlap of overlapping) {
          const index = state.rows.findIndex(i => i.productCode === overlap.productCode);
          if (index !== -1) {
            for (const [k, v] of entries(overlap)) {
              if (k === 'quantity') {
                // Add the quantity of the updated row to the current row's quantity.
                state.rows[index][k] += v as number;
              } else if (v !== state.rows[index][k]) {
                // Override the value of the current row with the incoming row's value.
                (state.rows[index][k] as typeof v) = v;
              }
            }
          }
        }
        for (const nonOverlap of nonOverlapping) {
          // Add non-overlapping non-zero quantity rows.
          if (nonOverlap.quantity !== 0) {
            state.rows.push(nonOverlap);
          }
        }
        for (const row of state.rows) {
          // Update the price based on new quantities.
          row.price = row.unitPrice * row.quantity;
        }
      }),
    );
  },
  cloneRow(index: number): void {
    set(
      produce<TableState>(state => {
        const current = state.rows[index];
        if (current) {
          state.rows.push({ ...current });
          for (const row of state.rows) {
            row.price = row.unitPrice * row.quantity;
          }
        }
      }),
    );
  },
  removeRow(index: number): void {
    set(
      produce<TableState>(state => {
        state.rows.splice(index, 1);
        for (const row of state.rows) {
          row.price = row.unitPrice * row.quantity;
        }
      }),
    );
  },
  resetRows(): void {
    set({ rows: [] });
  },
});

export const useTableState = create<TableState>(
  persist(withDev(tableState, 'UseTableState'), { name: 'stellar-calculator' }),
);
export const useFormValues = create<FormState>(withDev(formValuesState, 'UseFormValues'));

export function useFieldValues<VA extends FormValue, V extends VA = VA>(
  product: string,
  name: string,
  initialValue: V,
): readonly [V, (v: V) => void] {
  const fields = useFormValues(useCallback(s => s.fields, [name]));
  const setValue = useFormValues(useCallback(s => s.setValue, []));

  useEffect(() => {
    const currentProduct = fields[product];
    if (!currentProduct) {
      setValue(product, name, initialValue);
    }
  }, [product, name]);

  const setter = (value: FormValue) => {
    if (typeof value === 'number' && isNaN(value)) {
      // Handle NaN values, which are passed when a number field is empty.
      value = 0;
    }
    setValue(product, name, value);
  };

  return [(fields[product]?.[name] ?? initialValue) as V, setter];
}
