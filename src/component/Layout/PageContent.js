import React from "react";
import Typography from "@material-ui/core/Typography";
import {Box, useTheme} from "@material-ui/core";

const PageTitle = ({title}) => {
    const theme = useTheme();

    return <Box m={2}>
        <Typography component="h1" variant="h4" style={{flexShrink: 0, marginTop: theme.spacing(3), marginBottom: theme.spacing(3)}}>
            {title}
        </Typography>
    </Box>
};

export {PageTitle,}
