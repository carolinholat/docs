import clsx from "clsx";
import {makeStyles, Divider, List, Drawer, Collapse} from "@material-ui/core";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import React from "react";
import {useTranslation} from 'react-i18next';
import {ListItemIcon, ListItemLink} from "../Link";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import {contentDocs} from "../../content/docs";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    drawerRoot: {
        height: '100%',
        overflow: 'auto',
        /*scrollbarColor: (theme.palette.type === 'dark' ?
                blueGrey[800] + ' ' + darken(blueGrey[900], 0.2) :
                'default'
        ),*/
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

const CollapseDrawer = ({toggle, icon, children}) => {
    const [open, setOpen] = React.useState(true);

    return <React.Fragment>
        <ListItem button onClick={() => setOpen(o => !o)}>
            {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
            <ListItemText primary={toggle}/>
            {open ? <ExpandLess/> : <ExpandMore/>}
        </ListItem>


        <Collapse in={open} timeout="auto" unmountOnExit>
            {children}
        </Collapse>
    </React.Fragment>
};

const AppDrawer = ({open}) => {
    const classes = useStyles();
    const {i18n} = useTranslation();

    return <Drawer
        variant="persistent"
        classes={{
            root: clsx(classes.drawerRoot),
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
    >
        <List>
            <ListItemLink to={'/' + i18n.language} primary={'Home'}/>
            <CollapseDrawer toggle={'Documentation'}>
                <List component="div" disablePadding>
                    {contentDocs.map(([id, label], i) =>
                        <ListItemLink key={i} to={'/' + i18n.language + '/docs/' + id} primary={label} style={{paddingLeft: 32}}/>
                    )}
                </List>
            </CollapseDrawer>
            <ListItemLink to={'/' + i18n.language + '/examples'} primary={'Examples'}/>
        </List>
        <Divider/>
    </Drawer>
};

export {AppDrawer}
