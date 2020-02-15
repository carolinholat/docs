import {Layout} from "../Layout/Layout";
import {Container, Paper} from "@material-ui/core";
import {PageTitle} from "../Layout/PageContent";
import Nav from "../Nav";
import NavProject from "../NavProject";
import React from "react";

function PageMain() {
    return (
        <Layout>
            <Container maxWidth={'md'} fixed style={{display: 'flex', flexDirection: 'column', flexGrow: 2,}}>
                <PageTitle title={'UI-Schema'}/>

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

export default PageMain
