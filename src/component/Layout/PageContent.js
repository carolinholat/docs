import React from "react";
import Typography from "@material-ui/core/Typography";
import {useTheme} from "@material-ui/core";

const PageTitle = ({title}) => {
    const theme = useTheme();

    return <Typography component="h1" variant="h4" style={{flexShrink: 0, marginTop: theme.spacing(3), marginBottom: theme.spacing(3)}}>
        {title}
    </Typography>
};

export {PageTitle,}
