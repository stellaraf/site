import dynamic from "next/dynamic";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Divider,
  Flex,
  HStack,
  Heading,
  VStack,
} from "@chakra-ui/react";

import { Button } from "~/components/button";
import { ChakraNextImage } from "~/components/util";
import { useAddress } from "~/hooks/use-address";
import { Phone } from "~/icons";

import { Hours } from "./hours";

import type { OfficeLocationProps, OfficeLocationsProps } from "./types";

const GoogleMap = dynamic(() => import("~/components/google-map").then(m => m.GoogleMap));

const OfficeLocation = (props: OfficeLocationProps) => {
  const { loc, orgName, holidays, ...rest } = props;
  const address = useAddress(loc.address);
  const shortAddress = useAddress(loc.address, true);
  return (
    <Card
      mt={8}
      zIndex={1}
      bg="white"
      borderRadius="lg"
      w={{ base: "100%", lg: "75%" }}
      _light={{ boxShadow: "2xl" }}
      _dark={{
        borderWidth: "1px",
        bg: "blackAlpha.400",
        borderStyle: "solid",
        backdropFilter: "blur(2px)",
        borderColor: "whiteAlpha.300",
      }}
      {...rest}
    >
      <CardHeader>
        <HStack justifyContent="space-between">
          <Flex flexDir="column" justifyContent="flex-start">
            <Heading as="h3" fontSize={{ base: "sm", md: "lg" }}>
              {loc.name}
            </Heading>
            <Heading as="h6" fontSize="xs" opacity={0.75} fontWeight="normal">
              {shortAddress}
            </Heading>
          </Flex>
          <ChakraNextImage
            width={65}
            height={65}
            rounded="full"
            alt={loc.name}
            minHeight="4rem"
            draggable={false}
            borderWidth="1px"
            userSelect="none"
            objectFit="cover"
            placeholder="blur"
            borderStyle="solid"
            src={loc.photo.url}
            pointerEvents="none"
            borderColor="whiteAlpha.400"
            transition="transform .15s ease 0s"
            _dark={{ borderColor: "blackAlpha.400" }}
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII=)"
          />
        </HStack>
      </CardHeader>
      <Divider
        mb={4}
        w="100%"
        borderColor="blackAlpha.400"
        _dark={{ borderColor: "whiteAlpha.400" }}
      />
      <CardBody>
        <Center w="100%" flexDir="column">
          <GoogleMap
            my={0}
            orgName={orgName}
            displayAddress={address}
            lat={loc.location.latitude}
            lng={loc.location.longitude}
            width="100%"
            maxHeight={{ base: "24rem", lg: "24rem" }}
          />
        </Center>
      </CardBody>
      <Divider
        my={4}
        borderColor="blackAlpha.400"
        _dark={{ borderColor: "whiteAlpha.400" }}
        w="100%"
      />
      <CardBody>
        <Flex flexDir="column" justifyContent="flex-start" alignItems="flex-start" w="100%">
          <Heading as="h4" fontSize={{ base: "sm", md: "lg" }}>
            Hours
          </Heading>
          <Hours
            w="100%"
            fontSize={{ base: "xs", md: "md" }}
            open={loc.openTime}
            close={loc.closeTime}
            timezone={loc.timezoneId}
            lat={loc.location.latitude}
            lng={loc.location.longitude}
            holidays={holidays}
          />
        </Flex>
      </CardBody>
      <CardFooter justifyContent="center">
        <Button href="/contact" leftIcon={<Phone />} variant="outline">
          Contact
        </Button>
      </CardFooter>
    </Card>
  );
};

export const OfficeLocations = (props: OfficeLocationsProps) => {
  const { officeLocations, orgName, holidays, ...rest } = props;
  return (
    <VStack w="100%" {...rest}>
      {officeLocations.map(loc => (
        <OfficeLocation key={loc.name} loc={loc} orgName={orgName} holidays={holidays} />
      ))}
    </VStack>
  );
};
