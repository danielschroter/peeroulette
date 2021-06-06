import { AppTheme } from "./themetypes";

const themeindependent = {
    mixins: {
        textfieldminheight: "38px",
    },
};

const appThemeOptions = {
    [AppTheme.LIGHT]: {
        palette: {
            type: "light",
            primary: {
                light: "#1a6268",
                main: "rgba(38,82,95,0.77)",
                dark: "#86217c",
            },
            secondary: {
                light: "#ff4081",
                main: "#f50057",
                dark: "#c51162",
            },
            background: {
                paper: "#fff",
                default: "#fafafa",
            },
        },
        ...themeindependent,
    },
    [AppTheme.DARK]: {
        palette: {
            type: "dark",
            primary: {
                light: "#616161",
                main: "#424242",
                dark: "#212121",
            },
            secondary: {
                light: "#5A42EA",
                main: "#3E22E6",
                dark: "#22108E",
            },
            background: {
                paper: "#303030",
                default: "#000",
            },
        },
        ...themeindependent,
    },
};

export default appThemeOptions;
