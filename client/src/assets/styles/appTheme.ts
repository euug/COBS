const font = "'Poppins', sans-serif";

// Colours as Constants
const primary: string = "#006B32";
const secondary: string = "#5052B4";
const tertiary: string = "#FFE264";
const surface: string = "#F9FAF4";

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    display1: true;
    h1_home: true;
  }
}

const appTheme = {
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
    success: {
      main: tertiary,
    },
    background: {
      default: surface,
    },
  },
  typography: {
    fontFamily: font,
    display: "block",
    display1: {
      fontSize: "3rem",
      color: primary,
      fontWeight: "600",
      lineHeight: "3rem",
      marginTop: "1rem",
      marginBottom: "1rem",
      "@media (min-width:600px)": {
        fontSize: "4rem",
        lineHeight: "4rem",
      },
    },
    h1: {
      fontSize: "2.5rem",
      fontWeight: "600",
      lineHeight: "3.5rem",
      marginTop: "1rem",
      marginBottom: "1rem",
      paddingTop: "4rem",

      "@media (min-width:600px)": {
        fontSize: "3rem",
        lineHeight: "3rem",
      },
    },
    h1_home: {
      fontSize: "2.5rem",
      fontWeight: "600",
      lineHeight: "3.5rem",
      marginTop: "1rem",
      marginBottom: "1rem",
      paddingTop: "4rem",
      color: primary,

      "@media (min-width:600px)": {
        fontSize: "3rem",
        lineHeight: "3rem",
      },
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: "400",
      lineHeight: "2.1rem",
      marginTop: "1rem",
      marginBottom: "1rem",

      "@media (min-width:600px)": {
        fontSize: "2rem",
        lineHeight: "2.5rem",
      },
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: "500",
      lineHeight: "1.5rem",
      marginTop: "1.5rem",
      marginBottom: "0.5rem",

      "@media (min-width:600px)": {
        fontSize: "1.75rem",
        lineHeight: "1.75rem",
      },
    },
    h4: {
      fontSize: "1.2rem",
      fontWeight: "600",
      lineHeight: "1.2rem",
      marginTop: "1rem",

      "@media (min-width:600px)": {
        fontSize: "1.3rem",
        lineHeight: "1.3rem",
      },
    },
    body1: {
      marginTop: "0.67rem",
      marginBottom: "0.67rem",
    },
    subtitle1: {
      fontSize: "1.5rem",
      fontWeight: "200",
      fontStyle: "italic",
    },
    subtitle2: {
      fontSize: "0.7rem",
      fontWeight: "200",
      lineHeight: "0.7rem",

      "@media (min-width:600px)": {
        fontSize: "0.8rem",
        lineHeight: "0.8rem",
      },
    },
    button: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      textTransform: "none" as any,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 20,
          paddingRight: 20,
          minWidth: 80,
          borderRadius: 20,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          marginLeft: 8,
          marginRight: 8,
        },
      },
    },
  },
  overrides: {
    MuiTextField: {
      root: {
        borderRadius: "2px",
      },
    },
    MuiInputBase: {
      root: {
        marginBottom: "0px",
      },
    },
    MuiSwitch: {
      root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: 8,
      },
      switchBase: {
        padding: 1,
        "&$checked, &$colorPrimary$checked, &$colorSecondary$checked": {
          transform: "translateX(16px)",
          color: "#fff",
          "& + $track": {
            opacity: 1,
            border: "none",
          },
        },
      },
      thumb: {
        width: 24,
        height: 24,
      },
      track: {
        borderRadius: 13,
        border: "1px solid #bdbdbd",
        backgroundColor: "#fafafa",
        opacity: 1,
        transition:
          "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      },
    },
  },
};

export default appTheme;
