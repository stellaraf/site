import type { ComponentMultiStyleConfig, ComponentSingleStyleConfig } from "@chakra-ui/react";

export const CalendarMonth: ComponentMultiStyleConfig = {
  parts: ["month", "name", "week", "weekday", "days"],

  baseStyle: {
    name: {
      h: 8,
      fontSize: "md",
      lineHeight: 6,
      textAlign: "center",
      textTransform: "capitalize",
    },

    week: {
      gridTemplateColumns: "repeat(7, 1fr)",
    },

    weekday: {
      color: "body-fg",
      textAlign: "center",
      textTransform: "capitalize",
      _dark: {
        opacity: 0.8,
      },
    },

    days: {
      gridTemplateColumns: "repeat(7, 1fr)",
    },
  },

  defaultProps: {
    name: {
      as: "h2",
    },
  },
};

export const CalendarDay: ComponentSingleStyleConfig = {
  baseStyle: {
    rounded: "md",
    bgColor: "transparent",

    _hover: {
      bgColor: "blackAlpha.300",
    },
    _dark: {
      _hover: {
        bgColor: "whiteAlpha.300",
      },
    },

    _disabled: {
      opacity: 0.5,
      _hover: {
        cursor: "initial",
        bgColor: "transparent",
      },
    },
  },

  sizes: {
    sm: {
      h: 8,
    },
  },

  variants: {
    selected: {
      bgColor: "primary.500",
      color: "white",
      _dark: {
        bgColor: "secondary.300",
        _hover: {
          bgColor: "secondary.200",
        },
      },
      _hover: {
        bgColor: "primary.300",
      },
    },

    range: {
      bgColor: "primary.500",
      color: "white",

      _hover: {
        bgColor: "primary.300",
      },

      _disabled: {
        _hover: {
          bgColor: "primary.300",
        },
      },
    },

    outside: {
      opacity: 0.5,
    },
    today: {
      opacity: 1,
      color: "primary.500",
      _light: { opacity: 1 },
      _dark: { color: "secondary.300", opacity: 1 },
    },
  },

  defaultProps: {
    size: "sm",
  },
};

export const CalendarControl: ComponentMultiStyleConfig = {
  parts: ["controls", "button"],

  baseStyle: {
    controls: {
      position: "absolute",
      p: 4,
      w: "100%",
      justifyContent: "space-between",
    },

    button: {
      h: 6,
      px: 2,
      lineHeight: 0,
      fontSize: "md",
      rounded: "lg",
    },
  },
};

export const Calendar: ComponentMultiStyleConfig = {
  parts: ["calendar", "months"],

  baseStyle: {
    calendar: {
      userSelect: "none",
      position: "relative",
      w: "min-content",
      borderRadius: "lg",
      bg: "light.500",
      borderColor: "blackAlpha.300",
      borderWidth: "1px",
      borderStyle: "solid",
      boxShadow: "lg",
      _dark: {
        bg: "blackSolid.700",
        borderColor: "whiteAlpha.300",
        borderWidth: "1px",
        borderStyle: "solid",
      },
    },

    months: {
      p: 4,
      w: "100%",
      gridTemplateColumns: "1fr 1fr",
    },
  },
};
