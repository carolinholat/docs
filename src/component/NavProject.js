import React from "react";
import GithubLogo from "./GithubLogo";
import {Link, Typography} from "@material-ui/core";

export default () => <React.Fragment>
    <Typography component={'p'} variant={'body1'}>
        <GithubLogo style={{marginTop: -2}}/> <Link href={'https://github.com/ui-schema/ui-schema'}>Project, Issues</Link>
    </Typography>
    <hr style={{opacity: 0.1, margin: '4px 0 4px 26px'}}/>
    <Typography component={'p'} variant={'body1'}>
        <svg role="img" style={{display: 'inline-block', padding: 1, margin: 1, boxSizing: 'border-box', width: 20, height: 20, verticalAlign: 'middle'}} viewBox="0 0 24 24" fill="#7B16FF" xmlns="http://www.w3.org/2000/svg">
            <title>Spectrum icon</title>
            <path d="M0 10.2A1.8 1.8 0 001.8 12h1.8a8.4 8.4 0 018.4 8.4v1.8a1.8 1.8 0 001.8 1.8h8.4a1.8 1.8 0 001.8-1.8v-1.8C24 9.133 14.867 0 3.6 0H1.8A1.8 1.8 0 000 1.8v8.4z"/>
        </svg>
        {' '}
        <Link href={'https://spectrum.chat/ui-schema'}>Chat on Spectrum</Link>
    </Typography>
    <hr style={{opacity: 0.1, margin: '4px 0 4px 26px'}}/>
    <Typography component={'p'} variant={'body1'}>
        <span role={'img'} aria-label={'Quick Evaluate'}>🚀</span>{' '}
        <Link href={'https://codesandbox.io/s/github/ui-schema/demo-cra/tree/master/?autoresize=1&fontsize=12&hidenavigation=1&module=%2Fsrc%2FSchema%2FDemoEditor.js'}>Example on CodeSandbox</Link>
    </Typography>
</React.Fragment>;
