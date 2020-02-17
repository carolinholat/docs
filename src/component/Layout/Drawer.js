import clsx from "clsx";
import {makeStyles, Divider, List, Drawer, Collapse,} from "@material-ui/core";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import React from "react";
import {useTranslation} from 'react-i18next';
import {ListItemIcon, ListItemLink} from "../Link";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import {contentDocs} from "../../content/docs";
import {schemas} from "../../schemas/_list";

const DrawerContext = React.createContext([]);

const useDrawer = () => React.useContext(DrawerContext);

const DrawerProvider = ({children} = {}) => {
    const contextState = React.useState(true);

    return <DrawerContext.Provider value={contextState}>
        {children}
    </DrawerContext.Provider>
};

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    drawerRoot: {
        overflow: 'auto',
        position: 'absolute',
        top: 48,
        bottom: 0,
        [theme.breakpoints.up('md')]: {
            height: '100%',
            position: 'relative',
            top: 0,
        }
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: 0,
        [theme.breakpoints.up('sm')]: {
            width: 0,
        },
    },
}));

const CollapseDrawer = ({toggle, icon, children, dense, initial = true}) => {
    const [open, setOpen] = React.useState(initial);

    return <React.Fragment>
        <ListItem button onClick={() => setOpen(o => !o)} dense={dense}>
            {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
            <ListItemText primary={toggle}/>
            {open ? <ExpandLess/> : <ExpandMore/>}
        </ListItem>


        <Collapse in={open} timeout="auto" unmountOnExit>
            {children}
        </Collapse>
    </React.Fragment>
};

const AppDrawer = () => {
    const classes = useStyles();
    const {i18n} = useTranslation();
    const [open, setDrawerOpen] = useDrawer();

    const closeOnClick = React.useMemo(() => window.innerWidth < 960 ? setDrawerOpen(false) : undefined, [setDrawerOpen]);

    return <Drawer
        variant="persistent"
        classes={{
            root: clsx(classes.drawerRoot),
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
    >
        <List>
            <ListItemLink to={'/' + i18n.language} primary={'Home'} dense showActive onClick={closeOnClick}/>
            <ListItemLink to={'/' + i18n.language + '/examples'} primary={'Live Editor'} dense showActive onClick={closeOnClick}/>
            <CollapseDrawer toggle={'Documentation'} dense>
                <List component="div" disablePadding>
                    {contentDocs.map(([id, label], i) =>
                        <ListItemLink key={i} to={'/' + i18n.language + '/docs/' + id} primary={label} style={{paddingLeft: 32}} dense showActive onClick={closeOnClick}/>
                    )}
                </List>
            </CollapseDrawer>
            <CollapseDrawer toggle={'Schema Examples'} dense>
                <List component="div" disablePadding style={{overflow: 'auto'}}>
                    {schemas.map((schema, i) => (
                        <ListItemLink key={i} to={'/' + i18n.language + '/examples/' + (schemas[i][0].split(' ').join('-'))}
                                      primary={schema[0]} style={{paddingLeft: 32}} dense showActive onClick={closeOnClick}/>
                    ))}
                </List>
            </CollapseDrawer>
            {/*<CollapseDrawer toggle={'React Examples'} dense>
                <List component="div" disablePadding style={{overflow: 'auto'}}>
                    {schemas.map((schema, i) => (
                        <ListItemLink key={i} to={'/' + i18n.language + '/react-examples/' + (schemas[i][0].split(' ').join('-'))}
                                      primary={schema[0]} style={{paddingLeft: 32}} dense showActive onClick={closeOnClick}/>
                    ))}
                </List>
            </CollapseDrawer>*/}
        </List>
        <Divider/>
    </Drawer>
};

export {AppDrawer, DrawerProvider, useDrawer}
