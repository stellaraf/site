import { useCallback } from "react";

import { useStyleConfig } from "@chakra-ui/react";
import { mergeWith } from "@chakra-ui/utils";
import * as ReactSelect from "react-select";

import { useColorValue, useColorTokenValue, useToken } from "~/context";
import { useMobile, useOpposingColor } from "~/hooks";
import { removeProps } from "~/lib";

import { useSelectContext } from "./select";

import type { RSStyleCallbackProps, RSThemeFunction, RSStyleFunction } from "./types";
import type { SelectOptionSingle } from "~/types";

export const useControlStyle = <Opt extends SelectOptionSingle, IsMulti extends boolean>(
  props: RSStyleCallbackProps,
): RSStyleFunction<"control", Opt, IsMulti> => {
  const { colorMode } = props;

  const { isError } = useSelectContext();

  const focusBorder = useColorTokenValue("blue.500", "blue.300");
  const borderColor = useColorTokenValue("gray.200", "whiteAlpha.200");
  const hoverBorder = useColorTokenValue("gray.300", "whiteAlpha.400");
  const invalidBorder = useColorTokenValue("red.500", "red.300");

  return useCallback(
    (base, state) => {
      const { isFocused } = state;
      const baseProps = removeProps(base, "border", "borderColor");
      const styles = {
        justifyContent: "space-between",
        display: "flex",
        flexWrap: "wrap",
        paddingRight: useToken("space", 2),
        border: "1px solid",
        borderColor: "inherit",
        backgroundColor: "inherit",
        borderRadius: useToken("radii", "md"),
        minHeight: useToken("sizes", 10),
        transition: "all 0.2s",
        boxShadow: isFocused ? `0 0 0 1px ${focusBorder}` : "none",
        "&:hover > div > span": { backgroundColor: borderColor },
        "&:hover .__rs-icon": { color: hoverBorder },
        "&:hover": { borderColor: isFocused ? focusBorder : hoverBorder },
        "&:disabled": { opacity: 0.4, cursor: "not-allowed" },
        "&:focus": {
          borderColor: focusBorder,
          boxShadow: `0 0 0 1px ${focusBorder}`,
          zIndex: "unset",
        },
        "&.invalid": {
          borderColor: invalidBorder,
          boxShadow: `0 0 0 1px ${invalidBorder}`,
        },
      };
      return mergeWith({}, baseProps, styles);
    },
    [colorMode, isError],
  );
};

export const useMenuStyle = <Opt extends SelectOptionSingle, IsMulti extends boolean>(
  props: RSStyleCallbackProps,
): RSStyleFunction<"menu", Opt, IsMulti> => {
  const { colorMode } = props;
  const { isOpen } = useSelectContext();
  const backgroundColor = useColorTokenValue("white", "blackSolid.800");
  const shadowSize = useColorValue("sm", "dark-lg");
  const boxShadow = useToken("shadows", shadowSize);
  const backdropFilter = useColorValue(undefined, "blur(4px");

  return useCallback(
    base => {
      const styles = {
        boxShadow,
        top: "100%",
        width: "100%",
        backdropFilter,
        backgroundColor,
        borderWidth: "1px",
        position: "absolute",
        paddingTop: useToken("space", 2),
        minWidth: useToken("sizes", "3xs"),
        paddingBottom: useToken("space", 2),
        borderRadius: useToken("radii", "md"),
        transition: "background 50ms ease-in 0s",
      };
      return mergeWith({}, base, styles);
    },
    [colorMode, isOpen],
  );
};

export const useMenuListStyle = <Opt extends SelectOptionSingle, IsMulti extends boolean>(
  props: RSStyleCallbackProps,
): RSStyleFunction<"menuList", Opt, IsMulti> => {
  const { colorMode } = props;
  const { isOpen } = useSelectContext();

  const scrollBg = useColorTokenValue("blackAlpha.50", "whiteAlpha.50");
  const scrollHover = useColorTokenValue("blackAlpha.400", "whiteAlpha.400");
  const scrollColor = useColorTokenValue("blackAlpha.300", "whiteAlpha.300");

  return useCallback(
    base => {
      const styles = {
        overflowY: "auto",
        position: "relative",
        maxHeight: useToken("sizes", "xs"),
        "&::-webkit-scrollbar": { width: "5px" },
        "&::-webkit-scrollbar-track": { backgroundColor: scrollBg },
        "&::-webkit-scrollbar-thumb": { backgroundColor: scrollColor },
        "&::-webkit-scrollbar-thumb:hover": { backgroundColor: scrollHover },
        "-ms-overflow-style": { display: "none" },
      };
      return mergeWith({}, base, styles);
    },
    [colorMode, isOpen],
  );
};

export const useOptionStyle = <Opt extends SelectOptionSingle, IsMulti extends boolean>(
  props: RSStyleCallbackProps,
): RSStyleFunction<"option", Opt, IsMulti> => {
  const { colorMode, colorScheme } = props;
  const { isOpen } = useSelectContext();

  const focusedBg = useColorTokenValue("blackAlpha.100", "whiteAlpha.100");
  const hoverBg = useColorTokenValue(`${colorScheme}.100`, `${colorScheme}.200`);
  const activeBg = useColorTokenValue(`${colorScheme}.500`, `${colorScheme}.300`);
  const hoverColor = useOpposingColor(hoverBg);
  const activeColor = useOpposingColor(activeBg);

  return useCallback(
    (base, state) => {
      const { isFocused } = state;
      const styles = {
        backgroundColor: isFocused ? focusedBg : "transparent",
        color: "inherit",
        transition: "background 50ms ease-in 0s",
        paddingTop: useToken("space", 2),
        paddingBottom: useToken("space", 2),
        paddingLeft: useToken("space", 4),
        paddingRight: useToken("space", 4),
        width: "100%",
        userSelect: "none",
        cursor: "default",
        "&:hover": { backgroundColor: hoverBg, color: hoverColor },
        "&:focus": { backgroundColor: activeBg, color: activeColor },
        "&:active": { backgroundColor: activeBg, color: activeColor },
        "&:disabled": { opacity: 0.4, cursor: "not-allowed" },
      };
      return mergeWith({}, base, styles);
    },
    [colorMode, isOpen],
  );
};

export const useIndicatorSeparatorStyle = <Opt extends SelectOptionSingle, IsMulti extends boolean>(
  props: RSStyleCallbackProps,
): RSStyleFunction<"indicatorSeparator", Opt, IsMulti> => {
  const { colorMode } = props;
  const border = useColorTokenValue("gray.200", "whiteAlpha.200");
  const styles = { backgroundColor: border, transition: "all 0.2s" };
  return useCallback(base => mergeWith({}, base, styles), [colorMode]);
};

export const usePlaceholderStyle = <Opt extends SelectOptionSingle, IsMulti extends boolean>(
  props: RSStyleCallbackProps,
): RSStyleFunction<"placeholder", Opt, IsMulti> => {
  const { colorMode } = props;
  const color = useColorTokenValue("gray.600", "whiteAlpha.600");
  const style = useColorValue({ opacity: 0.8 }, {});
  return useCallback(base => mergeWith({}, base, { color, ...style }), [colorMode]);
};

export const useMultiValueStyle = <Opt extends SelectOptionSingle, IsMulti extends boolean>(
  props: RSStyleCallbackProps,
): RSStyleFunction<"multiValue", Opt, IsMulti> => {
  const { colorMode, colorScheme } = props;

  const boxShadowLight = useToken("shadows", "md");
  const boxShadow = useColorValue(boxShadowLight, undefined);
  const style = useStyleConfig("Button", { colorScheme, variant: "solid" });
  const backgroundColor = useToken("colors", style.bg?.toString() ?? "inherit");
  const color = useToken("colors", style.color?.toString() ?? "inherit");

  const styles = {
    backgroundColor,
    fontWeight: useToken("fontWeights", "medium"),
    boxShadow,
    color: color,
    borderRadius: useToken("radii", "md"),
    margin: "0.2rem",
  };

  return useCallback(base => mergeWith({}, base, styles), [colorMode]);
};

export const useMultiValueLabelStyle = <Opt extends SelectOptionSingle, IsMulti extends boolean>(
  props: RSStyleCallbackProps,
): RSStyleFunction<"multiValueLabel", Opt, IsMulti> => {
  const { colorMode, colorScheme } = props;

  const styles = {
    fontSize: "85%",
    color: "inherit",
    whiteSpace: "nowrap",
    borderRadius: "unset",
    textOverflow: "ellipsis",
    padding: useToken("space", 1),
    paddingLeft: useToken("space", 2),
  };

  return useCallback(base => mergeWith({}, base, styles), [colorMode, colorScheme]);
};

export const useMultiValueRemoveStyle = <Opt extends SelectOptionSingle, IsMulti extends boolean>(
  props: RSStyleCallbackProps,
): RSStyleFunction<"multiValueRemove", Opt, IsMulti> => {
  const { colorMode } = props;

  const styles = {
    alignItems: "center",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    paddingRight: useToken("space", 2),
    transition: "opacity 50ms ease-in 0s",
    borderTopRightRadius: useToken("radii", "md"),
    borderBottomRightRadius: useToken("radii", "md"),
    "&:hover": { backgroundColor: "unset", color: "unset", opacity: 0.7 },
  };
  return useCallback(base => mergeWith({}, base, styles), [colorMode]);
};

export const useMenuPortal = <
  Opt extends SelectOptionSingle,
  IsMulti extends boolean,
>(): RSStyleFunction<"menuPortal", Opt, IsMulti> => {
  const isMobile = useMobile();
  const styles = {
    zIndex: isMobile ? 1500 : 1,
  };
  return useCallback(base => mergeWith({}, base, styles), [isMobile]);
};

export const useRSTheme = (): RSThemeFunction => {
  const borderRadiusStr = useToken("radii", "md");
  const borderRadius = parseInt(borderRadiusStr, 10);

  return useCallback((t: ReactSelect.Theme): ReactSelect.Theme => ({ ...t, borderRadius }), []);
};
