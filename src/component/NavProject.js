import React from "react";
import GithubLogo from "./GithubLogo";
import {Link, Typography} from "@material-ui/core";

export default () => <React.Fragment>
    <Typography component={'p'} variant={'body1'}>
        <GithubLogo/> <Link href={'https://github.com/ui-schema/ui-schema'}>Project, Issues</Link>
    </Typography>
    <hr style={{opacity: 0.1, margin: '4px 0 4px 26px'}}/>
    <Typography component={'p'} variant={'body1'}>
        <span role={'img'} aria-label={'Quick Evaluate CodeSandbox'}>🚀</span>{' '}
        <Link href={'https://codesandbox.io/s/github/ui-schema/demo-cra/tree/master/?autoresize=1&fontsize=12&hidenavigation=1&module=%2Fsrc%2FSchema%2FDemoEditor.js'}>Run on CodeSandbox</Link>
    </Typography>
</React.Fragment>;
