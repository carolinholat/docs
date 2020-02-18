import {demoTextField} from "./docs/widgets/TextFieldDemo";
import {demoOptionsList} from "./docs/widgets/OptionsListDemo";
import {demoSwitch} from "./docs/widgets/SwitchDemo";

const contentDocs = [
    ['overview', 'Overview'],
    ['schema', 'Schema'],
    ['design-systems', 'Design-Systems'],
    ['widgets', 'Widgets'],
    ['widget-plugins', 'Widget-Plugins'],
    ['performance', 'Performance'],
    ['localization', 'Localization'],
    ['core', 'Core'],
];

const contentDocsWidgets = [
    ['widgets/TextField', 'TextField Widget', {
        demoEditor: demoTextField
    }],
    ['widgets/Switch', 'Switch Widget', {
        demoEditor: demoSwitch
    }],
    ['widgets/OptionsList', 'Options List Widget', {
        demoEditor: demoOptionsList
    }],
];

export {contentDocs, contentDocsWidgets}
