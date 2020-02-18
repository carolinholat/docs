import ReactMarkdown from "react-markdown";
import {
    TableContainer, Table, TableHead, TableBody, TableRow, TableCell,
    Link, Typography, Button, useTheme, Paper, Divider,
} from "@material-ui/core";
import {UnfoldLess, UnfoldMore, OpenInNew} from "@material-ui/icons";
import {Link as InternalLink} from './Link'
import React from "react";
import {useTranslation} from "react-i18next";
import {RichCodeEditor, supportedModes} from "./RichCodeEditor";
import {LinkableHeadline} from "./LinkableHeadline";
import {AccessTooltipIcon} from "./Tooltip";

const InlineCode = ({variant, ...p}) => {
    const {palette} = useTheme();
    return <Typography component={'code'} variant={variant} style={{
        background: palette.divider
    }} gutterBottom>{p.children}</Typography>
};

const languageMapping = {
    js: 'javascript'
};

const Code = ({variant, ...p}) => {
    const {palette} = useTheme();
    const [showAll, setShowAll] = React.useState(0);// triple state/dual-type needed, 0 as default, true when open, false when closed
    const [editor, setEditor] = React.useState(undefined);

    const currentMode = languageMapping[p.language] ? languageMapping[p.language] : p.language;
    const scrollBar = editor && editor.container ? editor.container.querySelector('.ace_scrollbar-v') : undefined;

    return supportedModes.indexOf(currentMode) === -1 ?
        <Typography component={'pre'} variant={variant} style={{background: palette.divider}} gutterBottom>
            <Typography component={'code'} className={'code--' + p.language}>
                {p.value}
            </Typography>
        </Typography> :
        <div style={{position: 'relative'}}>
            <RichCodeEditor value={p.value} readOnly mode={currentMode}
                            fontSize={14} minLines={1} maxLines={showAll ? 3000 : 30}
                            getEditor={setEditor}
                            style={{margin: '24px 0', transition: 'height 0.4s linear 0s'}}/>
            {typeof showAll === 'boolean' || (editor && editor.container && scrollBar && scrollBar.clientHeight && scrollBar.clientWidth) ?
                <Button style={{position: 'absolute', bottom: 27, right: 20, minWidth: 'auto'}} onClick={() => setShowAll(p => !p)}>
                    <AccessTooltipIcon title={showAll ? 'Show less lines' : 'Show all lines'}>
                        {showAll ? <UnfoldLess fontSize={'small'}/> : <UnfoldMore fontSize={'small'}/>}
                    </AccessTooltipIcon>
                </Button> : null}
        </div>
};

const scrollParent = element => {
    if(!element) return null;

    if(element.scrollHeight > element.clientHeight) {
        return element;
    }

    return scrollParent(element.parentNode);
};

const InternalLocaleLink = (p) => {
    const {i18n} = useTranslation();
    return <InternalLink
        to={0 === p.to.indexOf('#') ?
            window.location.pathname + p.to
            : '/' + i18n.language + p.to}
        primary={p.primary} color={'primary'} style={{fontWeight: 'bold'}}
        onClick={0 === p.to.indexOf('#') ? () => {
            let nextPos = document.querySelector(p.to);
            if(nextPos) {
                const scrollElem = scrollParent(nextPos);
                if(scrollElem) {
                    scrollElem.scrollTop = nextPos.offsetTop - 56;
                }
            }
        } : undefined}
    />
};

const StyledBlockquote = p => {
    const theme = useTheme();
    return <Paper elevation={3} style={{margin: '12px 0 24px 0'}}>
        <Typography
            {...p} component={'blockquote'} variant={'body1'}
            style={{padding: '8px 12px 2px 30px', position: 'relative', borderLeft: '0 solid ' + theme.palette.divider}}/>
    </Paper>
};

// see: https://github.com/rexxars/react-markdown#node-types
const renderers = {
    root: React.Fragment,
    paragraph: p => <Typography {...p} component={'p'} variant={'body2'} gutterBottom/>,
    blockquote: StyledBlockquote,
    inlineCode: p => <InlineCode variant={'body2'} {...p}/>,
    code: p => <Code variant={'body2'} {...p}/>,
    thematicBreak: p => <Divider {...p}/>,
    heading: ({level, ...p}) => <Typography {...p} component={'h' + (level + 1)} variant={'subtitle' + (level)} style={{textDecoration: 'underline', marginTop: 48 / level}} gutterBottom/>,
    list: p => p.ordered ? <ol style={{margin: '10px'}}>{p.children}</ol> : <ul style={{margin: '10px 0'}}>{p.children}</ul>,
    listItem: p => <Typography component={'li'} variant={'body2'} style={{fontWeight: 'bold'}}><span style={{fontWeight: 'normal', display: 'block'}}>{p.children}</span></Typography>,
    link: p => -1 === p.href.indexOf('https://') ?
        <InternalLocaleLink to={p.href} primary={p.children} color={'primary'} style={{fontWeight: 'bold'}}/> :
        <Link href={p.href} target={'_blank'} color={'primary'} style={{fontWeight: 'bold'}}>
            {p.children}
            <OpenInNew fontSize={'small'} style={{transform: 'scale(0.6) translate(-2px,4px)'}}/>
        </Link>,
};

const renderersContent = {
    root: React.Fragment,
    paragraph: p => <Typography {...p} component={'p'} variant={'body1'} gutterBottom/>,
    blockquote: StyledBlockquote,
    inlineCode: p => <InlineCode variant={'body1'} {...p}/>,
    code: p => <Code variant={'body1'} {...p}/>,
    thematicBreak: p => <Divider {...p}/>,
    heading: LinkableHeadline,
    list: p => p.ordered ? <ol style={{margin: '10px'}}>{p.children}</ol> : <ul style={{margin: '10px 0'}}>{p.children}</ul>,
    listItem: p => <Typography component={'li'} variant={'body1'} style={{fontWeight: 'bold'}}><span style={{fontWeight: 'normal', display: 'block'}}>{p.children}</span></Typography>,
    link: p => -1 === p.href.indexOf('https://') ?
        <InternalLocaleLink to={p.href} primary={p.children} color={'primary'} style={{fontWeight: 'bold'}}/> :
        <Link href={p.href} target={'_blank'} color={'primary'} style={{fontWeight: 'bold'}}>
            {p.children}
            <OpenInNew fontSize={'small'} style={{transform: 'scale(0.6) translate(-2px,4px)'}}/>
        </Link>,
    table: p => <TableContainer><Table size={'small'} style={{margin: '0 0 24px 0'}}>{p.children}</Table></TableContainer>,
    tableHead: p => <TableHead>{p.children}</TableHead>,
    tableBody: p => <TableBody>{p.children}</TableBody>,
    tableRow: p => <TableRow>{p.children}</TableRow>,
    tableCell: p => <TableCell align={p.align} style={{fontWeight: p.isHeader ? 'bold' : 'inherit'}}>{p.children}</TableCell>,
};

const Markdown = ({source, content = false}) => <ReactMarkdown source={source} renderers={content ? renderersContent : renderers}/>;

export {Markdown}
