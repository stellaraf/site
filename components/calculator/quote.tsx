import { useMemo } from 'react';
import { VStack, Center, Tabs, TabList, TabPanels, TabPanel, Tab } from '@chakra-ui/react';
import { useConfig } from '~/context';
import { Product } from './product';
import { QuoteTable } from './table';

export const Quote = (): JSX.Element => {
  const { quote } = useConfig();
  const products = useMemo(() => quote.fields.products.map(pe => pe.fields), []);

  return (
    <VStack maxW={{ base: '100%', lg: '50%' }} w="100%">
      <Center w="100%">
        <Tabs isLazy isFitted variant="enclosed" w="100%">
          <TabList mb={4}>
            {products.map((product, i) => (
              <Tab borderTopStartRadius="lg" borderTopEndRadius="lg" key={i}>
                {product.name}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {products.map((product, i) => (
              <TabPanel key={i}>
                <Product product={product} />
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Center>
      <Center w="100%">
        <QuoteTable />
      </Center>
    </VStack>
  );
};
