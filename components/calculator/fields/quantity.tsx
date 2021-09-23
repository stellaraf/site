import {
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { useFieldValues } from '../state';

import type { BoxProps } from '@chakra-ui/react';
import type { QuantityField as QuantityFieldT } from '~/types';

interface QuantityFieldProps extends BoxProps {
  id: string;
  product: string;
  field: QuantityFieldT;
}

export const QuantityField = (props: QuantityFieldProps): JSX.Element => {
  const {
    id,
    product,
    field: { decimalPlaces, inputType },
    ...rest
  } = props;
  const [value, setValue] = useFieldValues<number>(product, id, 0);
  return (
    <Box w="100%" {...rest}>
      {inputType === 'text' && (
        <NumberInput
          defaultValue={0}
          precision={decimalPlaces}
          value={value}
          onChange={(_, changed) => setValue(changed)}
        >
          <NumberInputField type="number" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      )}
      {inputType === 'slider' && (
        <Slider defaultValue={0} value={value} max={1_000} onChange={setValue}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      )}
    </Box>
  );
};
