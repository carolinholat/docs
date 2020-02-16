import ReactMarkdown from "react-markdown";
import {Link, Typography, useTheme} from "@material-ui/core";
import {OpenInNew} from "@material-ui/icons";
import {Link as InternalLink} from './Link'
import React from "react";
import {useTranslation} from "react-i18next";

const InlineCode = ({variant, ...p}) => {
    const {palette} = useTheme();
    return <Typography component={'code'} variant={variant} style={{background: palette.divider}}>{p.children}</Typography>
};

const Code = ({variant, ...p}) => {
    const {palette} = useTheme();
    return <Typography component={'pre'} variant={variant} style={{background: palette.divider}} gutterBottom>
        <Typography component={'code'} className={'code--' + p.language}>
            {p.value}
        </Typography>
    </Typography>
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

// see: https://github.com/rexxars/react-markdown#node-types
const renderers = {
    root: React.Fragment,
    paragraph: p => <Typography {...p} component={'p'} variant={'body2'} gutterBottom/>,
    inlineCode: p => <InlineCode variant={'body2'} {...p}/>,
    code: p => <Code variant={'body2'} {...p}/>,
    heading: ({level, ...p}) => <Typography {...p} component={'h' + (level + 1)} variant={'subtitle' + (level)} style={{textDecoration: 'underline', marginTop: 48 / level}} gutterBottom/>,
    list: p => p.ordered ? <ol style={{margin: '10px'}}>{p.children}</ol> : <ul style={{margin: '10px 0'}}>{p.children}</ul>,
    listItem: p => <Typography component={'li'} variant={'body2'} style={{fontWeight: 'bold'}}><span style={{fontWeight: 'normal'}}>{p.children}</span></Typography>,
    link: p => -1 === p.href.indexOf('https://') ?
        <InternalLocaleLink to={p.href} primary={p.children} color={'primary'} style={{fontWeight: 'bold'}}/> :
        <Link href={p.href} target={'_blank'} color={'primary'} style={{fontWeight: 'bold'}}>
            {p.children}
            <OpenInNew fontSize={'small'} style={{transform: 'scale(0.6) translate(-2px,4px)'}}/>
        </Link>,
};

const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

const renderersContent = {
    root: React.Fragment,
    paragraph: p => <Typography {...p} component={'p'} variant={'body1'} gutterBottom/>,
    inlineCode: p => <InlineCode variant={'body1'} {...p}/>,
    code: p => <Code variant={'body1'} {...p}/>,
    heading: ({level, ...p}) => <Typography
        {...p} component={'h' + (level + 1)} variant={'h' + (level)}
        onClick={() => copyToClipboard(window.location.protocol + '//' + window.location.host + window.location.pathname + '#' +
            (p.children && p.children[0] && p.children[0].props && p.children[0].props.value ?
                p.children[0].props.value.toLowerCase().replace(/\s/g, '-')
                : ''))}
        id={p.children && p.children[0] && p.children[0].props && p.children[0].props.value ?
            p.children[0].props.value.toLowerCase().replace(/\s/g, '-')
            : undefined}
        gutterBottom style={{marginTop: 48 / level}}/>,
    list: p => p.ordered ? <ol style={{margin: '10px'}}>{p.children}</ol> : <ul style={{margin: '10px 0'}}>{p.children}</ul>,
    listItem: p => <Typography component={'li'} variant={'body1'} style={{fontWeight: 'bold'}}><span style={{fontWeight: 'normal'}}>{p.children}</span></Typography>,
    link: p => -1 === p.href.indexOf('https://') ?
        <InternalLocaleLink to={p.href} primary={p.children} color={'primary'} style={{fontWeight: 'bold'}}/> :
        <Link href={p.href} target={'_blank'} color={'primary'} style={{fontWeight: 'bold'}}>
            {p.children}
            <OpenInNew fontSize={'small'} style={{transform: 'scale(0.6) translate(-2px,4px)'}}/>
        </Link>,
};

const Markdown = ({source, content}) => <ReactMarkdown source={source} renderers={content ? renderersContent : renderers}/>;

export {Markdown}
