import {
  Popover,
  IconButton,
  PopoverBody,
  PopoverArrow,
  PopoverHeader,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
} from '@chakra-ui/react';
import { DynamicIcon } from '~/components';
import { useColorValue } from '~/context';

import type { ButtonProps } from '@chakra-ui/react';
import type { BaseField } from '~/types';

interface FieldInfoProps extends ButtonProps {
  field: BaseField;
}

export const FieldInfo = (props: FieldInfoProps): JSX.Element => {
  const { field, ...rest } = props;
  const colorScheme = useColorValue('gray', 'yellow');
  if (field.info) {
    return (
      <Popover>
        <PopoverTrigger>
          <IconButton
            variant="ghost"
            size="xs"
            colorScheme={colorScheme}
            icon={<DynamicIcon icon={{ go: 'LightBulb' }} fill="currentColor" />}
            aria-label={`Details about ${field.name}`}
            {...rest}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>{field.name}</PopoverHeader>
          <PopoverBody>{field.info}</PopoverBody>
        </PopoverContent>
      </Popover>
    );
  }
  return <></>;
};
