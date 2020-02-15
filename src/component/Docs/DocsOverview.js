import React from "react";
import {useRouteMatch} from "react-router-dom";
import {contentDocs} from '../../content/docs'
import {Container, Paper,} from "@material-ui/core";
import {contentLoader} from "../ContentLoader";
import {LinkList, ListItemLink} from "../Link";
import {Markdown} from "../Markdown";
import {useTranslation} from "react-i18next";
import {Layout} from "../Layout/Layout";

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

    return <Paper style={{margin: 12, padding: 24}}>
        {loadedDoc === 0 ?
            'loading' :
            loadedDoc === false ?
                'error' :
                <Markdown source={loadedDoc} content/>}
    </Paper>
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

    return <Layout>
        <Container maxWidth={'md'} fixed style={{display: 'flex', flexDirection: 'column', flexGrow: 2,}}>
            {match.params.doc ?
                <DocDetails id={match.params.doc}/> :
                <DocsOverview/>}
        </Container>
    </Layout>;
};

export default DocsHandler
