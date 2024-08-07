import {
  Button,
  ButtonGroup,
  type ButtonGroupProps,
  type ButtonProps,
  HStack,
  IconButton,
  type IconButtonProps,
  chakra,
} from "@chakra-ui/react";
import { type RenderCurrentPageLabelProps } from "@react-pdf-viewer/page-navigation";
import { type ToolbarSlot } from "@react-pdf-viewer/toolbar";

import {
  CaretLeft,
  CaretRight,
  Download as DownloadIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
} from "~/icons";

const disabledButtonProps: Partial<ButtonProps> = {
  isDisabled: true,
  borderRadius: "lg",
  sx: { "&[class]": { cursor: "default" } },
};

const buttonGroupProps: Partial<ButtonGroupProps> = {
  isAttached: true,
  variant: "outline",
  size: "sm",
};

function iconButtonProps(label: string): IconButtonProps {
  return { title: label, "aria-label": label, borderRadius: "lg" };
}

const Pager = (props: RenderCurrentPageLabelProps) => {
  const { currentPage, numberOfPages } = props;
  const current = `${currentPage + 1}`;
  const total = `${numberOfPages}`;
  return (
    <Button {...disabledButtonProps}>
      {current}
      <chakra.span opacity={0.5} px={1}>{`/`}</chakra.span>
      {total}
    </Button>
  );
};

export const ToolbarRenderer = (props: ToolbarSlot) => {
  const {
    ZoomIn,
    ZoomOut,
    GoToNextPage,
    CurrentScale,
    GoToPreviousPage,
    CurrentPageLabel,
    Download,
  } = props;
  return (
    <HStack px={2} justifyContent="space-between" w="100%">
      <HStack spacing={4}>
        <ButtonGroup {...buttonGroupProps}>
          <ZoomOut>
            {props => (
              <IconButton {...iconButtonProps("Zoom Out")} icon={<ZoomOutIcon />} {...props} />
            )}
          </ZoomOut>
          <CurrentScale>
            {props => (
              <Button {...disabledButtonProps}>{`${Math.round(props.scale * 100)}%`}</Button>
            )}
          </CurrentScale>
          <ZoomIn>
            {props => (
              <IconButton {...iconButtonProps("Zoom In")} icon={<ZoomInIcon />} {...props} />
            )}
          </ZoomIn>
        </ButtonGroup>
        <ButtonGroup {...buttonGroupProps}>
          <GoToPreviousPage>
            {props => (
              <IconButton {...iconButtonProps("Previous Page")} icon={<CaretLeft />} {...props} />
            )}
          </GoToPreviousPage>
          <CurrentPageLabel>{props => <Pager {...props} />}</CurrentPageLabel>
          <GoToNextPage>
            {props => (
              <IconButton {...iconButtonProps("NextPage")} icon={<CaretRight />} {...props} />
            )}
          </GoToNextPage>
        </ButtonGroup>
      </HStack>
      <HStack>
        <Download>
          {props => (
            <IconButton
              size="sm"
              colorScheme="primary"
              variant="ghost"
              icon={<DownloadIcon />}
              {...iconButtonProps("Download")}
              {...props}
            />
          )}
        </Download>
      </HStack>
    </HStack>
  );
};
