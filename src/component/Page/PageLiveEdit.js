import React from "react";
import {Container,} from "@material-ui/core";
import LiveEditor from '../Schema/LiveEditor'
import {Layout} from "../Layout/Layout";

function PageLiveEdit() {
    return <Layout title={'Live-Editor'}>
        <Container maxWidth={false} fixed style={{display: 'flex', maxWidth: 'none', flexDirection: 'column', height: '100%', flexGrow: 2, padding: 0}}>
            <LiveEditor/>
        </Container>
    </Layout>;
}

export default PageLiveEdit
