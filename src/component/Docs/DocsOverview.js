import React from "react";
import {useRouteMatch} from "react-router-dom";
import {contentDocs} from '../../content/docs'
import {Container, Paper, Typography} from "@material-ui/core";
import {contentLoader} from "../ContentLoader";
import {Link, LinkList, ListItemLink} from "../Link";
import {Markdown} from "../Markdown";
import {useTranslation} from "react-i18next";

const DocDetails = ({id}) => {
    const [loadedDoc, setLoadedDoc] = React.useState(0);

    React.useEffect(() => {
        contentLoader('docs/' + id + '.md', (data, status) => {
            if(status === 200) {
                setLoadedDoc(data);
            } else {
                setLoadedDoc(false);
            }
        })
    }, [setLoadedDoc, id]);

    return loadedDoc === 0 ? 'loading' : loadedDoc === false ? 'error' : <Markdown source={loadedDoc}/>
};

const DocsOverview = () => {
    const {i18n} = useTranslation();
    return <Paper style={{margin: 12, padding: 24}}>
        <LinkList>
            {contentDocs.map(([id, label], i) => <ListItemLink key={i} to={'/' + i18n.language + '/docs/' + id} primary={label}/>)}
        </LinkList>
    </Paper>
};

const DocsHandler = () => {
    const match = useRouteMatch();
    const {i18n} = useTranslation();

    return <div className="App">
        <header className="App-header" style={{position: 'relative'}}>
            <Link to={'/' + i18n.language}
                  primary={<span role={'img'} style={{fontSize: '1.25rem', display: 'flex', marginLeft: 4}} aria-label={'Home Icon'}>🏠</span>}
                  style={{display: 'inline-block', position: 'absolute', left: 0}}/>
            <Typography component={'h1'} variant={'h6'}>
                UI-Schema
            </Typography>
        </header>
        <Container className="App-main" maxWidth={'md'} fixed>
            {match.params.doc ? <DocDetails id={match.params.doc}/> : <DocsOverview/>}
        </Container>
    </div>
};

export default DocsHandler
