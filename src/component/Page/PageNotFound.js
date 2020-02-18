import {Layout} from "../Layout/Layout";
import {Container, Paper} from "@material-ui/core";
import {PageTitle} from "../Layout/PageContent";
import Nav from "../Nav";
import NavProject from "../NavProject";
import React from "react";
import Head from "../Layout/Head";

function PageNotFound() {
    return (
        <Layout>
            <Head title={'Page Not Found · UI-Schema'}
                  description={''}
            />
            <Container maxWidth={'md'} fixed style={{display: 'flex', flexDirection: 'column', flexGrow: 2,}}>
                <PageTitle title={'404 Not Found'}/>

                <Paper style={{margin: 12, padding: 24}}>
                    <Nav/>
                </Paper>

                <Paper style={{margin: 12, padding: 24}}>
                    <NavProject/>
                </Paper>
            </Container>
        </Layout>
    );
}

export {PageNotFound}
