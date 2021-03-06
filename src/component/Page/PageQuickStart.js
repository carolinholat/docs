import React from "react";
import {Typography, Box, Grid, Button, Container, Paper,} from "@material-ui/core";
import {containerStyle, Layout} from "../Layout/Layout";
import Head from "../Layout/Head";
import {Markdown} from "../Markdown";
import DemoEditor from "../Schema/DemoEditor";
import {RichCodeEditor} from "../RichCodeEditor";
import {LoadingCircular} from "../LoadingCircular";
import {HeadlineMenu} from "../LinkableHeadline";
import {useHistory} from "react-router-dom";


const demoSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            minLength: 3
        },
        comment: {
            type: 'string',
            widget: 'Text',
            view: {
                rows: 3,
            }
        },
        accept_privacy: {
            type: 'boolean'
        }
    },
    required: ['accept_privacy']
};

const PageQuickStart = () => {
    const classes = containerStyle();
    const history = useHistory();
    const [ds, setDS] = React.useState('mui');

    const hash = history.location.hash;
    React.useEffect(() => {
        if(hash) {
            const target = document.querySelector(hash);
            if(target) {
                target.scrollIntoView();
            }
        }
    }, [hash]);

    return <Layout>
        <Head title={'Quick-Start UI-Schema'}
              description={'In 6 Steps to a React form which sends the data to an API! Build with JSON-Schema and Material-UI or Bootstrap'}
        />
        <Container maxWidth={'md'} fixed className={classes.root}>
            <Paper style={{margin: 12, padding: 24, display: 'flex', flexDirection: 'column', overflowX: 'auto'}} elevation={4}>
                <Markdown content source={`
# Quick-Start UI-Schema

In **6 Steps** to a contact form that sends the data to an API if the user entered it correctly.

UI-Schema works with JSON-Schema and multiple design-systems, each design-system exports a widget binding that connects to the UI-Schema renderer.

See the [**list of widgets**](/docs/overview#widget-list) for the different design-system support.
`}/>
                <HeadlineMenu initial/>
            </Paper>

            <Paper style={{margin: 12, padding: 24, display: 'flex', flexDirection: 'column', overflowX: 'auto'}} elevation={4}>
                <Markdown content source={`
## 1. Install

First select the design-system and install ui-schema and dependencies.
`}/>

                <Grid container>
                    <Grid item xs={6} style={{paddingRight: 6}}>
                        <Button fullWidth variant={ds === 'mui' ? 'contained' : 'outlined'} color={'secondary'} onClick={() => setDS('mui')}>Material-UI</Button>
                    </Grid>
                    <Grid item xs={6} style={{paddingLeft: 6}}>
                        <Button fullWidth variant={ds === 'bts' ? 'contained' : 'outlined'} color={'secondary'} onClick={() => setDS('bts')}>Bootstrap</Button>
                    </Grid>
                    <Grid item xs={12} style={{marginTop: 24}}>
                        {ds === 'mui' ? <Markdown content source={`
\`\`\`bash
npm i --save @ui-schema/ui-schema immutable \

             @ui-schema/ds-material @material-ui/core @material-ui/icons
\`\`\`
`}/> :
                            ds === 'bts' ? <Markdown content source={`
\`\`\`bash
npm i --save @ui-schema/ui-schema immutable \

             @ui-schema/ds-bootstrap bootstrap
\`\`\`
`}/> :
                                'unsupported'
                        }
                    </Grid>
                </Grid>
            </Paper>

            <Paper style={{margin: 12, padding: 24, display: 'flex', flexDirection: 'column', overflowX: 'auto'}} elevation={4}>
                <Markdown content source={`
## 2. Create Demo Editor

Create a file which serves as demo: \`DemoEditor.js\`

Create an empty editor component in the file:
`}/>

                <Grid container>
                    <Grid item xs={12}>
                        <Markdown content source={`
\`\`\`jsx
import React from "react";

// Import Schema-Editor
import {
    SchemaEditor,               // main component
    isInvalid,                  // helper function for validity checking
    createMap, createOrderedMap // helper functions for deep immutables
} from "@ui-schema/ui-schema";

// Empty Demo Schema & Data
const schema1 = {};
const data1 = {};

const Editor = () => {
    // here the state will be added
   
    return (
        <SchemaEditor
            {/* here the props will be added */}
        />
    )
};

export {Editor}
\`\`\`
`}/>
                    </Grid>
                </Grid>
            </Paper>

            <Paper style={{margin: 12, padding: 24, display: 'flex', flexDirection: 'column', overflowX: 'auto'}} elevation={4}>
                <Markdown content source={`
## 3. Import Design-System Widgets

Import the widgets for your selected design-system and add them to the SchemaEditor:
`}/>

                <Grid container>
                    <Grid item xs={12}>
                        {ds === 'mui' ? <Markdown content source={`
\`\`\`jsx
import {widgets} from "@ui-schema/ds-material";
\`\`\`
`}/> :
                            ds === 'bts' ? <Markdown content source={`
\`\`\`jsx
import {widgets} from "@ui-schema/ds-bootstrap";
\`\`\`
`}/> :
                                'unsupported'
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <Markdown content source={`
\`\`\`jsx
<SchemaEditor
    widgets={widgets}
/>
\`\`\`
`}/>
                    </Grid>
                </Grid>
            </Paper>

            <Paper style={{margin: 12, padding: 24, display: 'flex', flexDirection: 'column', overflowX: 'auto'}} elevation={4}>
                <Markdown content source={`
## 4. Create Data State, Add Schema

Each SchemaEditor needs to receive a \`store\` and \`setData\` to work with the data. In the store, the data is saved as an [immutable](https://immutable-js.github.io/immutable-js/).

The schema in this example is bundled with the component and not dynamic, also the schema must be immutable. A minimal valid schema is an empty \`object\` schema.
`}/>

                <Grid container>
                    <Grid item xs={12}>
                        <Markdown content source={`
\`\`\`jsx
// Minimal Schema, transformed from JS-Object into deep immutable
const schema1 = createOrderedMap({
    type: 'object',
});

const data1 = {};

const Editor = () => {
    // Create a state with the data, transforming into immutable on first mount 
    const [data, setData] = React.useState(() => createOrderedMap(data1));
   
    return (
        <SchemaEditor
            schema={schema1}
            
            store={data}
            onChange={setData}

            widgets={widgets}
        />
    )
};
\`\`\`
`}/>
                    </Grid>
                </Grid>
            </Paper>

            <Paper style={{margin: 12, padding: 24, display: 'flex', flexDirection: 'column', overflowX: 'auto'}} elevation={4}>
                <Grid container>
                    <Grid item xs={12}>
                        <Markdown content source={`
## 5. Add First Inputs

Each \`object\` can have multiple \`properties\`, each can be of a different type, we define now a single-line text, multi-line text and boolean property to our contact schema.

Properties defined in \`required\` must be filled out, see what is [invalid for required](/docs/schema#required-keyword).

See [schema docs](/docs/schema) for the keywords of each type. 
`}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Markdown content source={`
\`\`\`jsx
const schema1 = createOrderedMap(${JSON.stringify(demoSchema, null, 2)});
\`\`\`
`}/>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Markdown content source={`
---

> Your editor should look like this when using **ds-material**:
`}/>
                </Grid>
                <Grid item xs={12} md={9} style={{margin: '0 auto'}}>
                    <DemoEditor activeSchema={demoSchema} id={'qs-demo'}/>
                </Grid>
            </Paper>

            <Paper style={{margin: 12, padding: 24, display: 'flex', flexDirection: 'column', overflowX: 'auto'}} elevation={4}>
                <Grid container>
                    <Grid item xs={12}>
                        <Markdown content source={`
## 6. Add Validity & API Call

Now we add the validity store and a button that will send the data of the editor to an API if the form is valid.

We tell the editor also to display invalidity from start on. 
`}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Markdown content source={`
\`\`\`jsx
const Editor = () => {
    const [data, setData] = React.useState(() => createOrderedMap(data1));
    
    // Add also the validity state 
    const [validity, setValidity] = React.useState(() => createMap());
    
    return (
        <React.Fragment>
            <SchemaEditor
                schema={schema1}
            
                store={data}
                onChange={setData}

                widgets={widgets}

                {/* add the validity props */}
                validity={validity}
                onValidity={setValidity}
                
                showValidity={true}
            />
            {/* add your sending button, in the onClick check for validity and do the needed action */}
            <button 
                disabled={!!isInvalid(validity)}
                onClick={() => {
                    if(!isInvalid(validity)) {
                        // when not invalid, post to an API
                        fetch('https://httpbin.org/post', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            // here the immutable store is converted back to JS-Object and then to JSON
                            body: JSON.stringify(data.toJS())
                        })
                            .then(r => r.json())
                            .then(answer => console.log(answer))
                            .catch(err => console.error(err))
                    }
                }
            >Send</button>
        </React.Fragment>
    )
};
\`\`\`
`}/>
                    </Grid>

                    <Grid item xs={12}>
                        <Markdown content source={`
Test the demo form below, it will send the entered data to [httpbin.org](https://httpbin.org) with \`POST\` and display the response after the form. 
`}/>
                    </Grid>

                    <Grid item xs={12} md={9} style={{margin: '24px auto 0 auto'}}>
                        <QuickStartEditor/>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    </Layout>;
};

const QuickStartEditor = () => {
    const [sending, setSending] = React.useState(0);

    return <React.Fragment>
        <DemoEditor
            activeSchema={demoSchema}
            id={'qs-demo-send'}
            onClick={(store) => {
                setSending(true);
                fetch('https://httpbin.org/post', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(store.toJS())
                })
                    .then(r => r.json())
                    .then(setSending)
                    .catch(() => setSending(false))
            }}
            showDebugger={false}
        />

        <Box style={{marginTop: 12}}>
            {sending === true ?
                <LoadingCircular title={'Sending'}/>
                : null}

            {sending === false ?
                <LoadingCircular title={'Error Sending'}/>
                : null}

            {typeof sending === 'object' ?
                <Typography component={'p'} variant={'body1'} gutterBottom>Answer from httpbin:</Typography>
                : null}

            {typeof sending === 'object' ?
                <RichCodeEditor minLines={3} maxLines={30} mode={'json'} value={typeof sending === 'string' ? sending : JSON.stringify({...sending}, null, 2)}/>
                : null}
        </Box>
    </React.Fragment>;
};

export default PageQuickStart
