import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import {InvertColors as InvertColorsIcon, Menu as MenuIcon} from '@material-ui/icons';
import {I18nSwitch} from "../../lib/I18nSwitch";
import {AppDrawer} from "./Drawer";
import {useThemer} from "../../lib/Theme";

const Header = ({setDrawerOpen}) => {
    const classes = {};
    const switchTheme = useThemer();

    return <AppBar position="static" style={{flexShrink: 0,}}>
        <Toolbar variant={'dense'}>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={() => setDrawerOpen(o => !o)}
                className={clsx(classes.menuButton)}
            >
                <MenuIcon className={classes.badgeIcon}/>
            </IconButton>

            <I18nSwitch style={{marginLeft: 'auto'}}/>

            <IconButton color="inherit" onClick={switchTheme}>
                <InvertColorsIcon className={classes.badgeIcon}/>
            </IconButton>
        </Toolbar>
    </AppBar>;
};

const Layout = ({children}) => {
    const [drawerOpen, setDrawerOpen] = React.useState(true);

    return <React.Fragment>
        <CssBaseline/>
        <Header setDrawerOpen={setDrawerOpen}/>
        <div style={{display: 'flex', overflow: 'auto', flexGrow: 1}}>
            <AppDrawer open={drawerOpen}/>
            <div style={{display: 'flex', flexDirection: 'column', overflow: 'auto', flexGrow: 1}}>
                {children}
            </div>
        </div>
    </React.Fragment>
};

export {Layout}
