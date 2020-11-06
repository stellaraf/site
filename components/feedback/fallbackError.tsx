import NextHead from 'next/head';
import { Alert, AlertIcon, AlertTitle, AlertDescription, Box } from '@chakra-ui/core';
import { useConfig } from 'site/context';
import { useResponsiveStyle } from 'site/styles';

export const FallbackError = (props: IFallbackError) => {
  const { ...rest } = props;
  const { errorMessage } = useConfig();
  const rStyles = useResponsiveStyle();
  return (
    <>
      <NextHead>
        <title>Error</title>
        <meta name="robots" content="noindex" />
      </NextHead>
      <Box
        overflow="hidden"
        my={{ base: 4, lg: 16, xl: 32 }}
        px={{ base: 4, lg: 16, xl: 64 }}
        {...rStyles}
        {...rest}>
        <Alert
          status="error"
          variant="subtle"
          flexDir="column"
          textAlign="center"
          alignItems="center"
          justifyContent="center">
          <AlertIcon boxSize={16} mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Alert Title
          </AlertTitle>
          <AlertDescription maxWidth="sm">Alert Description</AlertDescription>
        </Alert>
      </Box>
    </>
  );
};
