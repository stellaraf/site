namespace React {
  type ReactNode = import('react').ReactNode;
}
namespace Chakra {
  type BoxProps = import('@chakra-ui/core').BoxProps;
  type AlertProps = import('@chakra-ui/core').AlertProps;
}

interface IError extends Chakra.AlertProps {
  title?: string;
  description?: React.ReactNode;
}

interface IContentLoader extends Chakra.BoxProps {}
