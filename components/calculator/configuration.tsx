import { useMemo } from 'react';
import {
  Flex,
  Center,
  VStack,
  HStack,
  chakra,
  Tag,
  Badge,
  TagLabel,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { DynamicIcon } from '~/components';
import { useColorValue } from '~/context';
import { useOpposingColor, useIsDark } from '~/hooks';
import { isSelectField, isCheckboxField } from '~/types';
import { FieldWrapper } from './fields/wrapper';
import { CheckboxField } from './fields/checkbox';
import { SelectField } from './fields/select';
import { generateId } from './util';

import type { FlexProps } from '@chakra-ui/react';
import type { DeepEntry, BaseField } from '~/types';

interface ConfigurationProps extends FlexProps {
  product: string;
  configuration: DeepEntry<import('~/types').Configuration>;
}

export const Configuration = (props: ConfigurationProps): JSX.Element => {
  const { product, configuration, ...rest } = props;
  const { name, products, description, color: colorScheme, addOns } = configuration.fields;
  const bg = useColorValue(`${colorScheme}.500`, `${colorScheme}.300`);
  const color = useOpposingColor(bg);
  const isDark = useIsDark(bg);
  const [lightScheme, darkScheme] = useMemo((): [string, string] => {
    if (!isDark) {
      return ['whiteAlpha', 'blackSolid'];
    }
    return ['blackAlpha', 'blackSolid'];
  }, [bg, isDark]);
  const accentScheme = useColorValue(lightScheme, darkScheme);
  console.log(addOns);
  return (
    <Center px={4} py={2} bg={bg} color={color} rounded="lg" {...rest}>
      <VStack align="flex-start">
        <Flex justify="space-between" w="100%">
          <chakra.h5 fontSize="sm" fontWeight="bold">
            {name}
          </chakra.h5>
          <Tooltip label="Add to Quote" hasArrow fontSize="xs">
            <IconButton
              colorScheme={accentScheme}
              variant="ghost"
              size="xs"
              aria-label="Add to Quote"
              icon={<DynamicIcon icon={{ fa: 'plus' }} />}
            />
          </Tooltip>
        </Flex>
        <chakra.span fontSize="xs" opacity={0.66}>
          {description}
        </chakra.span>
        <HStack alignSelf="center">
          {products.map(({ fields: p }) => (
            <Tag size="sm" colorScheme={accentScheme} key={p.name} color="">
              <TagLabel>{p.productName}</TagLabel>
              <Badge size="sm" colorScheme={accentScheme} variant="outline" ms={2}>
                {p.quantity.toString()}
                {p.unit && ` ${p.unit}`}
              </Badge>
            </Tag>
          ))}
        </HStack>
        <HStack alignSelf="center">
          {addOns.map(addOn => {
            const id = generateId(addOn.fields.name);
            let component: JSX.Element | undefined;
            console.log(addOn.fields);
            if (isSelectField(addOn.fields)) {
              return (
                <SelectField
                  id={id}
                  product={product}
                  field={addOn.fields}
                  size="xs"
                  colorScheme={colorScheme}
                  buttonProps={{ colorScheme }}
                />
              );
            } else if (isCheckboxField(addOn.fields)) {
              return (
                <CheckboxField
                  id={id}
                  product={product}
                  field={addOn.fields}
                  colorScheme={colorScheme}
                />
              );
            }
            return (
              //   <FieldWrapper key={id} id={id} field={(addOn.fields as unknown) as BaseField}>
              //     {component}
              //   </FieldWrapper>
              <></>
            );
          })}
        </HStack>
      </VStack>
    </Center>
  );
};
