import {
  Divider,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/core';
import { useColorValue } from 'site/context';
import { PhotoWrapper } from './Photo';

import type { IDetail } from './types';

export const Detail = (props: IDetail) => {
  const { isOpen, onClose, name, title, body, photo } = props;
  const bg = useColorValue('original.light', 'blackAlpha.300');
  const border = useColorValue('blackAlpha.300', 'whiteAlpha.300');
  return (
    <Modal
      size="xl"
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      blockScrollOnMount={false}
      motionPreset="slideInBottom">
      <ModalOverlay>
        <ModalContent
          bg={bg}
          boxShadow="lg"
          borderRadius="lg"
          borderWidth="1px"
          borderStyle="solid"
          borderColor={border}
          css={{ backdropFilter: 'blur(20px)' }}>
          <ModalHeader p={12}>
            <Wrap justify={{ base: 'center', lg: 'space-between' }}>
              <WrapItem>
                <PhotoWrapper minWidth="unset" boxSize={32}>
                  <Image
                    fallbackSrc="https://via.placeholder.com/150"
                    src={photo?.file.url ?? 'https://via.placeholder.com/150'}
                    alt={name}
                    rounded="full"
                    boxSize="100%"
                    objectFit="cover"
                    borderWidth="1px"
                    borderStyle="solid"
                    borderColor={border}
                    transition="transform .15s ease 0s"
                  />
                </PhotoWrapper>
              </WrapItem>
              <WrapItem>
                <VStack align={{ base: 'center', lg: 'flex-end' }}>
                  <Heading as="h2" fontSize="xl">
                    {name}
                  </Heading>
                  <Divider bg={border} />
                  <Heading as="h3" fontSize="lg" fontWeight="light">
                    {title}
                  </Heading>
                </VStack>
              </WrapItem>
            </Wrap>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody css={{ '& p': { marginBottom: 0, marginTop: 0 } }}>{body}</ModalBody>
          <ModalFooter mb={4}></ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};
