import React from 'react';
import Loadable from 'react-loadable';
import './App.css';
import {Container, Paper, Typography,} from "@material-ui/core";
import {Refresh} from "@material-ui/icons";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {PageNotFound} from "./component/Page/PageNotFound";
import {I18nProvider} from "./lib/I18n";
import AppTheme from "./lib/AppTheme";
import {I18nRedir} from "./lib/I18nRedir";
import {Layout} from "./component/Layout/Layout";
import {DrawerProvider} from "./component/Layout/Drawer";

const LoadingPage = ({title}) => <Layout>
    <Container maxWidth={'md'} fixed style={{display: 'flex', flexDirection: 'column', flexGrow: 2,}}>
        <Paper style={{margin: 12, padding: 24}}>
            <Refresh className={'refresh-spin'} fontSize={'large'} style={{display: 'block', margin: '24px auto'}}/>
            <Typography component={'p'} variant={'overline'} style={{textAlign: 'center', fontSize: '1em'}}>
                {title}
            </Typography>
        </Paper>
    </Container>
</Layout>;

const PageLoader = (loader, title) => Loadable({
    loader,
    loading: () => <LoadingPage title={title}/>,
});

const pages = {
    Home: PageLoader(() => import('./component/Page/PageMain'), 'Loading Page'),
    LiveEdit: PageLoader(() => import('./component/Page/PageLiveEdit'), 'Loading Live-Editor'),
    DocsOverview: PageLoader(() => import('./component/Docs/DocsOverview'), 'Loading Docs'),
};

const PageRoutes = ({match}) => <Switch>
    <Route path={"/" + match.params.lng + "/examples/:schema?"} component={pages.LiveEdit}/>
    <Route path={"/" + match.params.lng + "/docs/:doc?"} component={pages.DocsOverview}/>
    <Route path={"/" + match.params.lng} exact component={pages.Home}/>
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
                    <Route path={'/examples'} exact render={() => <I18nRedir to={'examples'}/>}/>
                    <Route path={'/docs'} exact render={() => <I18nRedir to={'docs'}/>}/>
                </Switch>
            </React.Suspense>

            <DrawerProvider>
                <AppTheme>
                    <React.Suspense fallback={null}>
                        <Route path="/:lng" component={PageRoutes}/>
                    </React.Suspense>
                </AppTheme>
            </DrawerProvider>
        </I18nProvider>
    </Router>
}

export default App;
