import { useState, useMemo, useCallback } from 'react';
import { Button, VStack, Center, Tabs, TabList, TabPanels, TabPanel, Tab } from '@chakra-ui/react';
import { DynamicIcon } from '~/components';
import { useProductPrice, useAlert } from '~/hooks';
import { extractQuoteProductCodes } from '~/util';
import { isBaseField } from '~/types';
import { Product } from './product';
import { QuoteTable } from './table';
import { useFormValues, useTableState } from './state';
import { generateId } from './util';

import type { StackProps } from '@chakra-ui/react';
import type { QuoteEntry, Product as _ProductT, BaseField, DeepEntryMembers } from '~/types';
import type { TableRow } from './state';

type ProductT = DeepEntryMembers<_ProductT>;

interface QuoteProps extends StackProps {
  quote: QuoteEntry;
}

export const Quote = (props: QuoteProps): JSX.Element => {
  const { quote, ...rest } = props;

  const showAlert = useAlert();

  // Memoize unpacked Product fields.
  const products = useMemo((): ProductT[] => quote.fields.products.map(pe => pe.fields), [
    quote.sys.id,
  ]);
  // Track selected product tab.
  const [productTab, setProductTab] = useState<ProductT>(products[0]);

  const exportProduct = useFormValues(useCallback(s => s.exportProduct, []));
  const addRows = useTableState(useCallback(s => s.addRows, []));

  // Callback to unpack the valid fields of a product.
  const getFields = useCallback(
    (product: ProductT) =>
      product.formFields
        .filter(formField => isBaseField(formField.fields))
        .map(formField => formField.fields) as BaseField[],
    [],
  );

  // Create a memo key to help reduce recalculations of `productCodes`.
  const memoKey = products.flatMap(p => p.formFields.map(f => f.sys.id)).join('--');
  // Extract product codes for all products and fields.
  const productCodes = useMemo(() => extractQuoteProductCodes(quote), [memoKey]);

  const { error, getProductPrice, data, dataUpdatedAt } = useProductPrice(productCodes);

  /**
   * Add product items to quote.
   *
   * @param product Selected product.
   */
  function handleAdd(product: ProductT): void {
    const formValues = exportProduct(product.name);

    if (error !== null) {
      console.group(`Error loading pricing data for '${product.name}'`);
      console.info('Data last updated at', new Date(dataUpdatedAt).toISOString());
      console.error(error);
      showAlert({ message: error.message, status: 'error' });
    }

    if (typeof data !== 'undefined') {
      if (formValues !== null) {
        let rows = [] as TableRow[];
        const fields = getFields(product);
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
  }

  return (
    <VStack maxW={{ base: '100%', lg: '50%' }} w="100%" {...rest}>
      <Center w="100%">
        <Tabs
          isLazy
          isFitted
          w="100%"
          minH="md"
          border="1px"
          display="flex"
          flexDir="column"
          borderRadius="lg"
          borderColor="inherit"
          onChange={index => setProductTab(products[index])}
        >
          <TabList mb={4} w="100%">
            {products.map((product, i) => (
              <Tab borderTopStartRadius="lg" borderTopEndRadius="lg" key={i}>
                {product.name}
              </Tab>
            ))}
          </TabList>
          <Center flexGrow={1} flexDir="column" zIndex={1}>
            <TabPanels d="flex" flexGrow={1} justifyContent="center" alignItems="center">
              {products.map((product, i) => (
                <TabPanel key={i}>
                  <Product product={product} />
                </TabPanel>
              ))}
            </TabPanels>
            <Center w="100%" flexGrow={1} alignItems="flex-end" px={4} pb={4}>
              <Button
                size="sm"
                variant="outline"
                colorScheme="green"
                onClick={() => handleAdd(productTab)}
                leftIcon={<DynamicIcon icon={{ fa: 'plus' }} />}
              >
                Add to Quote
              </Button>
            </Center>
          </Center>
        </Tabs>
      </Center>
      <Center w="100%">
        <QuoteTable />
      </Center>
    </VStack>
  );
};
