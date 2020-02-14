import React from 'react';
import Loadable from 'react-loadable';
import './App.css';
import {Typography, Paper, Box,} from "@material-ui/core";
import {Refresh} from "@material-ui/icons";
import Nav from "./component/Nav";
import NavProject from "./component/NavProject";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {PageNotFound} from "./component/PageNotFound";
import {I18nProvider} from "./lib/I18n";
import AppTheme from "./lib/AppTheme";
import {I18nRedir} from "./lib/I18nRedir";
import {Layout} from "./component/Layout/Layout";
import {PageTitle} from "./component/Layout/PageContent";

function PageMain() {
    return (
        <Layout>
            <Box m={2}>
                <PageTitle title={'UI-Schema'}/>
            </Box>

            <Paper style={{margin: 12, padding: 24}}>
                <Nav/>
            </Paper>

            <Paper style={{margin: 12, padding: 24}}>
                <NavProject/>
            </Paper>
        </Layout>
    );
}

const PageLiveEdit = Loadable({
    loader: () => import('./component/PageLiveEdit'),
    loading: () => <div style={{display: 'block', margin: '24px'}}>
        <Refresh className={'refresh-spin'} fontSize={'large'} style={{display: 'block', margin: '24px auto'}}/>
        <Typography component={'p'} variant={'overline'} style={{textAlign: 'center', fontSize: '1em'}}>
            Loading Live-Editor
        </Typography>
    </div>,
});

const PageDocsOverview = Loadable({
    loader: () => import('./component/Docs/DocsOverview'),
    loading: () => <div style={{display: 'block', margin: '24px'}}>
        <Refresh className={'refresh-spin'} fontSize={'large'} style={{display: 'block', margin: '24px auto'}}/>
        <Typography component={'p'} variant={'overline'} style={{textAlign: 'center', fontSize: '1em'}}>
            Loading Docs
        </Typography>
    </div>,
});

const PageRoutes = ({match}) => <Switch>
    <Route path={"/" + match.params.lng + "/examples/:schema?"} component={PageLiveEdit}/>
    <Route path={"/" + match.params.lng + "/docs/:doc?"} component={PageDocsOverview}/>
    <Route path={"/" + match.params.lng} exact component={PageMain}/>
    <Route path={"/" + match.params.lng} component={PageNotFound}/>
</Switch>;

function App() {
    return <Router basename={'/'}>
        <I18nProvider
            allLanguages={['en', 'de', 'it', 'es', 'fr', 'pl']}
            defaultLanguage={'en'}
            pathIndex={0}
            expiration={process.env.NODE_ENV === 'production' ? 2 * 24 * 60 * 60 * 1000 : 100}
            debug={false}
            l10n={{ns: {de: {}}}}
        >
            <React.Suspense fallback={null}>
                <Switch>
                    <Route exact path={'/'} component={I18nRedir}/>
                    <Route path={'/admin'} exact render={() => <I18nRedir to={'admin'}/>}/>
                </Switch>
            </React.Suspense>

            <AppTheme>
                <React.Suspense fallback={null}>
                    <Route path="/:lng" component={PageRoutes}/>
                </React.Suspense>
            </AppTheme>
        </I18nProvider>
    </Router>
}

export default App;
