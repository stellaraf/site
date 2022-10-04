import { Box, Heading } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";
import { Label } from "~/components";
import { useColorValue } from "~/context";
import { forwardRef } from "~/util";

import type { FlexProps } from "@chakra-ui/react";
import type { IContentBody, IUpdatedAt, TitleProps, ISubtitle } from "./types";

export const Title = forwardRef<HTMLHeadingElement, TitleProps>((props, ref) => {
  const titleMe = useTitleCase();
  const { id, children, ...rest } = props;
  return (
    <>
      <Box id={id} as="span" pos="relative" top={-130} visibility="hidden" />
      <Heading ref={ref} as="h3" fontSize={{ base: "3xl", lg: "4xl" }} {...rest}>
        {titleMe(children)}
      </Heading>
    </>
  );
});

export const Subtitle: React.FC<ISubtitle> = (props: ISubtitle) => {
  const titleMe = useTitleCase();
  const { children, ...rest } = props;
  return (
    <Heading as="h4" fontSize={{ base: "1.5rem", lg: "xl" }} fontWeight="light" mt={8} {...rest}>
      {titleMe(children)}
    </Heading>
  );
};

export const Body: React.FC<IContentBody> = (props: IContentBody) => (
  <Box
    className="__st-content-body"
    zIndex={1}
    fontSize="lg"
    maxW={{ lg: "60%" }}
    whiteSpace="pre-line"
    my={{ base: 8, lg: 16 }}
    {...props}
  />
);

export const UpdatedAt: React.FC<IUpdatedAt> = (props: IUpdatedAt) => {
  const { children } = props;

  const label = useColorValue(
    { leftColor: "white", rightColor: "whiteAlpha.300" },
    {
      borderRadius: "md",
      border: "1px solid",
      leftColor: "transparent",
      rightColor: "transparent",
      borderColor: "whiteAlpha.300",
      rightProps: {
        borderLeft: "1px solid",
        borderLeftColor: "whiteAlpha.300",
      } as FlexProps,
    },
  );

  return <Label right="Last Updated" left={children} {...label} />;
};
