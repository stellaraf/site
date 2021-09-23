import { useMemo } from 'react';
import { Flex, VStack } from '@chakra-ui/react';
import { isQuantityField, isBaseField } from '~/types';
import { FieldWrapper } from './fields/wrapper';
import { QuantityField } from './fields/quantity';
import { generateId } from './util';

import type { FlexProps } from '@chakra-ui/react';
import type { BaseField, QuoteEntry } from '~/types';

interface ProductProps extends FlexProps {
  product: ArrayType<QuoteEntry['fields']['products']>['fields'];
}

export const Product = (props: ProductProps): JSX.Element => {
  const { product, ...rest } = props;

  const fields = useMemo((): BaseField[] => {
    return product.formFields
      .filter(formField => isBaseField(formField.fields))
      .map(formField => formField.fields as BaseField) as BaseField[];
  }, [product]);

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
            <FieldWrapper key={id} id={id} field={field}>
              {component}
            </FieldWrapper>
          );
        })}
      </VStack>
    </Flex>
  );
};
