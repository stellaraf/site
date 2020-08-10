/**@jsx jsx */
import { jsx } from "@styled/system";
import { PseudoBox, Flex } from "@chakra-ui/core";

export const InfoSectionMain = props => {
  return (
    <Flex
      w="100vw"
      maxW={["none", "none", "100%", "100%"]}
      pos="relative"
      overflow="hidden"
      minH="25vh"
      direction="column"
      flex="1 1 auto"
      alignSelf="center"
      px={4}
      {...props}
    />
  );
};

export const InfoSectionContent = props => {
  return (
    <PseudoBox w="100%" px={0} mW="100%" mx="auto" minH="25vh" {...props} />
  );
};

export const AngleSection = ({
  height,
  angleHeight,
  side,
  offset,
  directionTop,
  directionBottom,
  backgroundColor,
  ...props
}) => {
  const [heightInt, heightUnit] = height
    .split(/(\d+)([a-zA-Z]+)/)
    .filter(i => i);
  const [angleHeightInt, angleHeightUnit] = angleHeight
    .split(/(\d+)([a-zA-Z]+)/)
    .filter(i => i);

  const middleHeightInt = heightInt - angleHeightInt * 2;
  const middleHeight = `${middleHeightInt}${heightUnit}`;
  const middleMargin = `${~~(angleHeightInt * 1.2)}${angleHeightUnit}`;
  const groupMargin = `${angleHeightInt / 2}${angleHeightUnit}`;
  const borderMap = {
    rightDown: {
      color: `transparent ${backgroundColor} transparent transparent`,
      width: `${angleHeight} 100vw 0 0`
    },
    leftUp: {
      color: `${backgroundColor} transparent transparent`,
      width: `${angleHeight} 100vw 0 0`
    },
    leftDown: {
      color: `transparent transparent ${backgroundColor} transparent`,
      width: `0 100vw ${angleHeight} 0`
    },
    rightUp: {
      color: `transparent ${backgroundColor} transparent transparent`,
      width: `0 100vw ${angleHeight} 0`
    },
    flat: {
      color: "transparent",
      width: "100vw"
    }
  };
  return (
    <InfoSectionMain
      overflow="visible"
      px={0}
      my={angleHeight}
      css={{
        "&:first-of-type:not(:last-of-type)": { marginBottom: groupMargin },
        "&:last-of-type:not(:first-of-type)": { marginTop: groupMargin },
        "&:not(:first-of-type):not(:last-of-type)": {
          marginBottom: groupMargin,
          marginTop: groupMargin
        }
      }}
      {...props}
    >
      <InfoSectionContent
        bg="transparent"
        px={[angleHeight, angleHeight, null, null]}
        _after={{
          content: "",
          position: "absolute",
          right: 0,
          width: 0,
          height: 0,
          borderStyle: "solid",
          bottom: `calc(-${angleHeight} + 1px)`,
          borderWidth: borderMap[directionBottom].width,
          borderColor: borderMap[directionBottom].color
        }}
        _before={{
          content: "",
          position: "absolute",
          right: 0,
          width: 0,
          height: 0,
          borderStyle: "solid",
          top: `calc(-${angleHeight} + 1px)`,
          borderWidth: borderMap[directionTop].width,
          borderColor: borderMap[directionTop].color
        }}
      ></InfoSectionContent>
    </InfoSectionMain>
  );
};
