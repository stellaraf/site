import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { getFilePlugin, type GetFilePlugin } from "@react-pdf-viewer/get-file";

import { useSlug } from "~/hooks";

import { ToolbarRenderer } from "./toolbar";

import type { OpenFile, Plugin } from "@react-pdf-viewer/core";
import type { ToolbarProps, ToolbarSlot } from "@react-pdf-viewer/toolbar";
import type { Document as DocumentType } from "~/types";

function newFileNamePlugin(name: string): GetFilePlugin {
  const fileNameGenerator = (_: OpenFile): string => {
    return name;
  };
  return getFilePlugin({ fileNameGenerator });
}

/**
 *
 * @see [source code](https://github.com/react-pdf-viewer/examples/blob/main/remove-some-parts-from-the-default-toolbar/RemovePartsDefaultToolbarDefaultLayoutExample.tsx)
 */
export function usePlugins(doc: DocumentType): Plugin[] {
  const slug = useSlug(doc.name);
  const filePlugin = newFileNamePlugin(slug);

  const renderToolbar = (Toolbar: (props: ToolbarProps) => React.ReactElement) => (
    <Toolbar>
      {(slots: ToolbarSlot) => {
        const { Download, ...rest } = slots;
        return <ToolbarRenderer Download={filePlugin.Download} {...rest} />;
      }}
    </Toolbar>
  );

  const defaultPlugin = defaultLayoutPlugin({
    renderToolbar,
    sidebarTabs: () => [],
  });
  return [defaultPlugin, filePlugin];
}
