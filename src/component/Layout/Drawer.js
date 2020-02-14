import clsx from "clsx";
import {makeStyles, Divider, List, Drawer} from "@material-ui/core";
import React from "react";
import {useTranslation} from 'react-i18next';
import {ListItemLink} from "../Link";

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
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
}));

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
            <ListItemLink to={'/' + i18n.language + '/docs'} primary={'Documentation'}/>
            <ListItemLink to={'/' + i18n.language + '/examples'} primary={'Examples'}/>
        </List>
        <Divider/>
    </Drawer>
};

export {AppDrawer}
