import { useMemo, useCallback } from 'react';
import { Flex, Button, VStack } from '@chakra-ui/react';
import { FaPlus as PlusIcon } from '@meronex/icons/fa';
import { useProductPrice } from '~/hooks';
import { isQuantityField, isBaseField } from '~/types';
import { FieldWrapper } from './fields/wrapper';
import { QuantityField } from './fields/quantity';
import { useTableState, useFormValues } from './state';

import type { FlexProps } from '@chakra-ui/react';
import type { BaseField, QuoteEntry } from '~/types';
import type { TableRow } from './state';

interface ProductProps extends FlexProps {
  product: ArrayType<QuoteEntry['fields']['products']>['fields'];
}

export const Product = (props: ProductProps): JSX.Element => {
  const { product, ...rest } = props;
  const exportProduct = useFormValues(s => s.exportProduct);
  const addRows = useTableState(s => s.addRows);
  const generateId = useCallback((name: string) => name.split(' ').join('-').toLowerCase(), [
    product,
  ]);

  const fields = useMemo((): BaseField[] => {
    return product.formFields
      .filter(formField => isBaseField(formField.fields))
      .map(formField => formField.fields as BaseField) as BaseField[];
  }, [product]);

  const productCodes = useMemo(() => fields.map(field => field.productCode), [product]);
  const { refetch, getProductPrice, isLoading } = useProductPrice(productCodes);

  function handleAdd(): void {
    const formValues = exportProduct(product.name);
    refetch().then(({ error, isError, data }) => {
      if (isError) {
        console.error(error);
      }
      if (data) {
        if (formValues !== null) {
          let rows = [] as TableRow[];
          const baseRows = fields.map(({ name, productCode }) => ({
            name,
            productCode,
            product: product.name,
          }));
          for (const field of baseRows) {
            const row = field as TableRow & { productCode: string };
            row.quantity = formValues[generateId(row.name)] as number;
            row.unitPrice = getProductPrice(row.productCode)?.unitPrice ?? 0;
            row.price = 0;
            rows = [...rows, row];
          }
          addRows(...rows);
        }
      }
    });
  }

  return (
    <Flex {...rest}>
      <VStack>
        {fields.map(field => {
          let component: JSX.Element | undefined;
          const id = generateId(field.name);
          if (isQuantityField(field)) {
            component = <QuantityField id={id} product={product.name} field={field} />;
          }
          return (
            <FieldWrapper key={id} id={id} label={field.name}>
              {component}
            </FieldWrapper>
          );
        })}
        <Button
          size="sm"
          variant="outline"
          colorScheme="green"
          leftIcon={<PlusIcon />}
          onClick={handleAdd}
          isLoading={isLoading}
        >
          Add to Quote
        </Button>
      </VStack>
    </Flex>
  );
};
