import React from 'react';
import {Button, Box, Typography,} from "@material-ui/core";
import {createMap, createOrderedMap, SchemaEditorProvider, SchemaRootRenderer, useSchemaData, isInvalid} from "@ui-schema/ui-schema";
import {widgets} from "@ui-schema/ds-material";
import {RichCodeEditor,} from "../RichCodeEditor";

const SchemaJSONEditor = ({schema, setJsonError, setSchema, tabSize, fontSize, richIde, renderChange, theme, id, maxLines}) => {
    return <RichCodeEditor
        tabSize={tabSize}
        fontSize={fontSize}
        raw={!richIde}
        theme={theme}
        renderChange={renderChange}
        value={typeof schema === 'string' ? schema : JSON.stringify(schema.toJS(), null, tabSize)}
        onChange={(newValue) => {
            try {
                setJsonError(false);
                setSchema(createOrderedMap(JSON.parse(newValue)));
            } catch(e) {
                setJsonError(e.toString());
                setSchema(newValue);
            }
        }}
        minLines={3} maxLines={maxLines}
        name={'live-editor-' + id}
    />
};

const SchemaDataDebug = ({tabSize, fontSize, richIde, renderChange, theme, id, maxLines}) => {
    const {store} = useSchemaData();

    return <RichCodeEditor
        value={JSON.stringify(store.toJS(), null, tabSize)}
        name={'live-editor-debug-' + id}
        theme={theme}
        tabSize={tabSize}
        fontSize={fontSize}
        renderChange={renderChange}
        raw={!richIde}
        minLines={3} maxLines={maxLines}
        readOnly
    />
};

const DemoEditor = ({activeSchema, id = 0, onClick, showDebugger = true}) => {
    const [jsonError, setJsonError] = React.useState(false);
    const [maxLines, /*setMaxLines*/] = React.useState(15);

    // default schema state - begin
    const [showValidity, /*setShowValidity*/] = React.useState(true);
    const [validity, setValidity] = React.useState(createMap());
    const [schema, setSchema] = React.useState(createOrderedMap(activeSchema));
    const [data, setData] = React.useState(createOrderedMap({}));
    // end - default schema state

    React.useEffect(() => {
        setSchema(createOrderedMap(activeSchema));
        setData(createOrderedMap({}));
    }, [activeSchema]);

    const tabSize = 2;
    const fontSize = 13;

    return <SchemaEditorProvider
        schema={schema}
        store={data}
        onChange={setData}
        widgets={widgets}
        validity={validity}
        showValidity={showValidity}
        onValidity={setValidity}
    >
        {jsonError ?
            <Box style={{margin: '0 12px 0 12px'}}>
                <Typography component={'h2'} variant={'h6'} color={'error'}>
                    JSON-Error:
                </Typography>

                <Typography component={'p'} variant={'subtitle1'}>
                    {jsonError.replace('SyntaxError: JSON.parse: ', '')}
                </Typography>
            </Box> :
            typeof schema === 'string' ? null : <React.Fragment>
                <SchemaRootRenderer/>
                {onClick ? <Button variant={'contained'}
                                   disabled={!!isInvalid(validity)}
                                   style={{marginTop: 12}}
                                   onClick={() => isInvalid(validity) ? undefined : onClick(data)}>Send</Button> : null}
            </React.Fragment>}

        {showDebugger ? <Box style={{display: 'flex', margin: '12px 0 24px 0'}}>
            <Box style={{width: '50%', paddingRight: 6}}>
                <Typography component={'p'} variant={'overline'} style={{paddingLeft: 4}}>
                    Schema:
                </Typography>
                <SchemaJSONEditor
                    schema={schema} setSchema={setSchema}
                    setJsonError={setJsonError} richIde={true}
                    id={id} tabSize={tabSize} fontSize={fontSize} maxLines={maxLines}
                />
            </Box>

            <Box style={{width: '50%', paddingLeft: 6}}>
                <Typography component={'p'} variant={'overline'} style={{paddingLeft: 4}}>
                    Data:
                </Typography>
                <SchemaDataDebug
                    richIde={true}
                    id={id} tabSize={tabSize} fontSize={fontSize} maxLines={maxLines}
                />
            </Box>
        </Box> : null}
    </SchemaEditorProvider>;
};

export default DemoEditor;
