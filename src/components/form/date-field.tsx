import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import {
  Calendar,
  CalendarControls,
  type CalendarDate,
  CalendarDays,
  CalendarMonth,
  CalendarMonthName,
  CalendarMonths,
  CalendarNextButton,
  CalendarPrevButton,
  type CalendarValues,
  CalendarWeek,
} from "@uselessdev/datepicker";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "~/icons";

import { type FieldValues, useController, useFormContext } from "react-hook-form";

import type { DateFieldProps } from "./types";

type CalendarProps = React.ComponentProps<typeof Calendar>;

export const DateField = <V extends FieldValues>(props: DateFieldProps<CalendarProps, V>) => {
  const { name, field, rules = {}, defaultValue, ...rest } = props;

  const { displayName, required, allowFuture, allowPast, label } = field;

  const { onClose, isOpen, onOpen } = useDisclosure();

  const [dates, setDates] = useState<CalendarValues>({});
  const [displayValue, setDisplayValue] = useState<string>();
  const initialRef = useRef(null);

  const { control, register } = useFormContext<V>();

  const {
    field: { onChange },
    fieldState: { error },
  } = useController<V>({ name, control, rules: { required }, defaultValue });

  const onDateChange = (changed: CalendarDate | CalendarValues): void => {
    if (changed instanceof Date) {
      setDisplayValue(changed.toLocaleDateString(undefined, { dateStyle: "full" }));
      onChange(changed);
      onClose();
      setDates({ start: changed, end: changed });
    }
  };

  return (
    <Popover
      isLazy
      onOpen={onOpen}
      isOpen={isOpen}
      onClose={onClose}
      placement="auto-start"
      initialFocusRef={initialRef}
    >
      <PopoverTrigger>
        <FormControl
          id={name}
          as="fieldset"
          isRequired={field.required}
          isInvalid={typeof error !== "undefined"}
        >
          <FormLabel as="legend">{label ? label : displayName}</FormLabel>
          <Input readOnly value={displayValue} placeholder="Select Date" />
          <input readOnly hidden {...register(name, { required: field.required, ...rules })} />
          <FormErrorMessage>{typeof error !== "undefined" && error.message}</FormErrorMessage>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent
        bg="unset"
        p={0}
        border="none"
        outline="none"
        w="min-content"
        ref={initialRef}
        _focus={{ boxShadow: "none" }}
      >
        <Calendar
          value={dates}
          singleDateSelection
          highlightToday={true}
          onSelectDate={onDateChange}
          disablePastDates={!allowPast}
          disableFutureDates={!allowFuture}
          {...rest}
        >
          <PopoverBody p={0}>
            <CalendarControls>
              <CalendarPrevButton
                as={props => (
                  <IconButton
                    size="xs"
                    aria-label="Previous Month"
                    icon={<ArrowLeft />}
                    {...props}
                  />
                )}
              />
              <CalendarNextButton
                as={props => (
                  <IconButton size="xs" aria-label="Next Month" icon={<ArrowRight />} {...props} />
                )}
              />
            </CalendarControls>

            <CalendarMonths>
              <CalendarMonth>
                <CalendarMonthName />
                <CalendarWeek />
                <CalendarDays />
              </CalendarMonth>
            </CalendarMonths>
          </PopoverBody>
        </Calendar>
      </PopoverContent>
    </Popover>
  );
};
