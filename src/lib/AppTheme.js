import React from 'react';
import PropTypes from 'prop-types';
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from "./Theme";

const themeDark = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#05aeca",
            dark: '#033944',
        },
        secondary: {
            light: '#d8eed4',
            main: '#bbe1b4',
            dark: "#002634",
        },
        background: {
            paper: '#001f29',
            default: '#001820',
        },
        text: {
            primary: '#e8e8e8',
            secondary: '#acc9c5',
        },
        action: {
            hoverOpacity: 0.2,
        },
    }
});

const themeLight = createMuiTheme({
    palette: {
        type: "light",
        primary: {
            main: "#0599b2",
            dark: '#033944',
        },
        secondary: {
            light: '#d8eed4',
            main: '#37936c',
            dark: "#002634",
        },
        background: {
            paper: '#e8e8e8',
            default: '#cecece',
        },
        text: {
            primary: '#001f29',
            secondary: '#001820',
        },
        action: {
            hoverOpacity: 0.2,
        },
    }
});

const themes = {
    dark: themeDark,
    light: themeLight,
};

export default function AppTheme(props) {
    const {children} = props;

    return (
        <ThemeProvider themes={themes} initial={
            window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        }>
            {children}
        </ThemeProvider>
    );
}

AppTheme.propTypes = {
    children: PropTypes.element.isRequired,
};
