import React from 'react';
import PropTypes from 'prop-types';
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from "./Theme";

const universal = {
    typography: {
        fontSize: 14,
        h1: {
            fontSize: '3.2rem'
        },
        h2: {
            fontSize: '2.5rem'
        },
        h3: {
            fontSize: '2.25rem'
        },
        h4: {
            fontSize: '2rem'
        },
        h5: {
            fontSize: '1.75rem'
        },
        h6: {
            fontSize: '1.25rem'
        }
    },
    shape: {
        borderRadius: 0,
    }
};

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
    },
    ...universal,
});

const themeLight = createMuiTheme({
    palette: {
        type: "light",
        primary: {
            main: "#0590a7",
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
    },
    ...universal,
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
