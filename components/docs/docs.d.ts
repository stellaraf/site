namespace React {
  type ReactNode = import('react').ReactNode;
}
namespace Chakra {
  type BoxProps = import('@chakra-ui/core').BoxProps;
}

interface IDataBlock extends Chakra.BoxProps {
  title: string;
  data: React.ReactNode;
}

interface IPRangeResponse {
  ipv4: string[];
  ipv6: string[];
  urls: string[];
}
