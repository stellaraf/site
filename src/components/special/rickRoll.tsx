import { ModalWrapper, Video } from '~/components';
import { useRickRoll } from '~/hooks';

export const RickRoll: React.FC = () => {
  const [isOpen, close] = useRickRoll();
  return (
    <ModalWrapper
      isCentered
      size="full"
      isOpen={isOpen}
      blockScrollOnMount={false}
      onClose={() => close()}
      contentProps={{ boxSize: '100%' }}
      headerProps={{ py: 'unset', pb: 2, px: 'unset' }}
      containerProps={{
        py: 8,
        maxWidth: '6xl',
        display: 'flex',
        pl: { base: 0, lg: 8 },
        minWidth: { lg: 'xl' },
        pr: { base: 0, lg: 12 },
        height: { base: 'sm', lg: '2xl' },
      }}
      body={<Video enableControls playing url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />}
    />
  );
};
