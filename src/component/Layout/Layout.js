import React from 'react';
import {useHistory} from 'react-router-dom';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import {InvertColors as InvertColorsIcon, Menu as MenuIcon} from '@material-ui/icons';
import {I18nSwitch} from "../../lib/I18nSwitch";
import {AppDrawer, useDrawer} from "./Drawer";
import {useThemer} from "../../lib/Theme";
import Typography from "@material-ui/core/Typography";
import GithubLogo from "../GithubLogo";
import {Link as RouterLink} from "react-router-dom";
import {Link} from "@material-ui/core";

const RenderLink = React.forwardRef(({to, children, ...itemProps}, ref) =>
    -1 === to.indexOf('https://') ? <RouterLink {...itemProps} to={to} innerRef={ref} children={children}/> : <Link {...itemProps} href={to} innerRef={ref} children={children}/>
);

const LinkIconButton = ({children, to}) => {
    return <IconButton component={RenderLink} to={to} color="inherit">
        {children}
    </IconButton>
};

const Header = ({title}) => {
    const classes = {};
    const switchTheme = useThemer();
    const [, setDrawerOpen] = useDrawer();

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

            {title ? <Typography component="h1" variant="h6" style={{flexShrink: 0, margin: '0 auto'}}>
                {title}
            </Typography> : null}

            <I18nSwitch style={{marginLeft: title ? 0 : 'auto'}}/>

            <LinkIconButton to={'https://github.com/ui-schema/ui-schema'} color="inherit">
                <GithubLogo className={classes.badgeIcon} fill='currentColor'/>
            </LinkIconButton>

            <IconButton color="inherit" onClick={switchTheme}>
                <InvertColorsIcon className={classes.badgeIcon}/>
            </IconButton>
        </Toolbar>
    </AppBar>;
};

const Layout = ({children, title}) => {
    const ref = React.useRef();
    const history = useHistory();

    const loc = history.location.pathname;
    React.useEffect(() => {
        ref.current.scrollTo(0, 0)
    }, [loc]);

    return <React.Fragment>
        <CssBaseline/>
        <Header title={title}/>
        <div style={{display: 'flex', overflow: 'auto', flexGrow: 1}}>
            <AppDrawer/>
            <div ref={ref} id={'main-content'} style={{display: 'flex', flexDirection: 'column', overflow: 'auto', flexGrow: 1}}>
                {children}
            </div>
        </div>
    </React.Fragment>
};

export {Layout}
