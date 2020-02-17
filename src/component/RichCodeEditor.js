import React from 'react';
import AceEditor from "react-ace";
import ace from 'ace-builds/src-noconflict/ace';
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-dockerfile";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/mode-mysql";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-powershell";
import "ace-builds/src-noconflict/mode-scss";
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/ext-error_marker";
import "ace-builds/src-noconflict/ext-static_highlight";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-searchbox";
import "ace-builds/src-noconflict/ext-statusbar";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-clouds_midnight";
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/theme-gruvbox";
import "ace-builds/src-noconflict/theme-monokai";
import {useTheme} from "@material-ui/core";

ace.config.set("basePath", "https://cdn.jsdelivr.net/npm/ace-builds@1.4.8/src-noconflict/");
ace.config.setModuleUrl('ace/mode/javascript_worker', "https://cdn.jsdelivr.net/npm/ace-builds@1.4.8/src-noconflict/worker-javascript.js");

const supportedModes = ['json', 'css', 'dockerfile', 'html', 'javascript', 'jsx', 'mysql', 'php', 'powershell', 'scss', 'yaml'];
const themes = ['clouds_midnight', 'cobalt', 'gruvbox', 'monokai',];

const themesLight = ['chrome', 'github'];

const RichCodeEditor = ({
                            value, onChange, name, readOnly, style = {},
                            tabSize = 2, fontSize = 13, theme = 'clouds_midnight', mode = 'json', raw = false, renderChange = 0,
                            minLines = 10, maxLines = undefined, getEditor,
                        }) => {
    const [editor, setEditor] = React.useState({});
    const {palette} = useTheme();

    React.useEffect(() => {
        if(editor && editor.resize && editor.renderer) {
            editor.resize();
            editor.renderer.updateFull();
        }
    }, [editor, renderChange]);

    if(raw) {
        return <textarea
            onChange={e => onChange(e.target.value)} value={value}
            style={{
                fontSize, fontFamily: 'Consolas, "Lucida Console", Courier, monospace', lineHeight: '1.27em',
                width: '100%', height: 'auto', flexGrow: 2,
                display: 'block', margin: 0, padding: 3, boxSizing: 'border-box',
                background: palette.background.paper, color: palette.text.primary,
                border: '1px solid ' + palette.divider,
            }}
        />;
    }

    return <AceEditor
        mode={mode}
        theme={palette.type === 'light' ? themesLight[0] : theme}
        value={value}
        onChange={onChange}
        name={name}
        editorProps={{$blockScrolling: true}}
        showGutter={true}
        showPrintMargin={false}
        highlightActiveLine={true}
        orientation={'below'}
        style={{width: '100%', height: 'auto', flexGrow: 2, lineHeight: '1.27em', ...style}}
        width={'100%'}
        minLines={minLines}
        maxLines={maxLines}
        enableSnippets
        enableBasicAutocompletion
        enableLiveAutocompletion
        wrapEnabled
        readOnly={readOnly}
        onLoad={editor => {
            setEditor(editor);
            if(getEditor) {
                getEditor(editor)
            }
        }}
        tabSize={tabSize}
        setOptions={{
            wrap: true,
            autoScrollEditorIntoView: true,
            enableMultiselect: true,
            useWorker: false,// currently shows errors for valid JSON, to turn syntax checking on change to `true` and check imports/workers at top of page
            mergeUndoDeltas: true,
            showLineNumbers: true,
            scrollPastEnd: 0.3,
            fontSize: fontSize,
        }}
    />
};

export {RichCodeEditor, themes, supportedModes}
