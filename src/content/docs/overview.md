# Overview

UI-Schema is a UI and Form generator for React using JSON-Schema. In the core is a widget system which supports creating complex interactions and custom inputs.

JSON-Schema included keywords are used to describe the data and create the UI based on the data-schema and special UI keywords. A data-schema with integrated ui-schema enforces the consistency of the UX across different apps and devices.

## Design Systems

The package `@ui-schema/ui-schema` supports rendering widgets for JSON-schema `type` and rendering own widgets for any type.

It is possible to connect any design system to the renderer, included or planned support:

- `@ui-schema/ds-material` adds binding to [@material-ui/core](https://material-ui.com/) to use [Material Design](https://material.io/) **in dev**
- `@ui-schema/ds-bootstrap` adds binding to plain bootstrap semantic HTMLs to use with any Bootstrap theme **in dev**
- `@ui-schema/ds-blueprint` adds binding to [blueprintjs](https://blueprintjs.com/docs/) **would be nice**
- `@ui-schema/ds-semanticui` adds binding to [semantic-ui](https://react.semantic-ui.com/usage/) **would be nice**
- `@ui-schema/ds-antdesign` adds binding to [Ant Design](https://ant.design/docs/react/introduce) **would be nice**
- `@ui-schema/ds-pulse` adds binding to [.pulse](https://pulse.heartbeat.ua/components/box) **would be nice**

📚 [How To Install A Design System](/docs/design-systems)

> You want to add a design system binding?
>
> Reach out to us, we help you to get started and we are open to make it an official binding!
>
> [I want to help!](/contribute)

A match by `widget` supersedes the `type` matching.

Match by `type` in schema and each type component must handle its own formats:

| Type         | Format      | Component            | Material-UI | Bootstrap | ? |
| :---         | :---        | :---                 | ---: | ---: | ---: | 
| `string`     | -           | [Normal Text Input](/docs/widgets/TextField)    | ⬛ | ⬜ | ⬜ |
| `string`     | `date`      | Date Input           | ⬛ | ⬜ | ⬜ |
| `string`     | `date-time` | Date+Time Input      | ⬜ | ⬜ | ⬜ |
| `string`     | `time`      | Time Input           | ⬜ | ⬜ | ⬜ |
| `string`     | `email`     | Email Input          | ⬜ | ⬜ | ⬜ |
| `string`     | `tel`       | Tel. No. Input       | ⬜ | ⬜ | ⬜ |
| `number`     | -           | Number Input         | ⬛ | ⬜ | ⬜ |
| `bool` or `boolean` | -    | Toggle Input (true/false) | ⬛ | ⬜ | ⬜ |
| `object`     | -           | Native Objects       | ⬛ | ⬜ | ⬜ |
| `array`      | -           | only supported through widgets | - | - | - |

Included widgets (match by `widget` in schema), each widget could have multiple types and formats:

| Widget     | Component | Expected Type(s) | Formats | Material-UI | Bootstrap | ? |
| :---       | :----     | ---: | ---: | ---: | ---: | ---: |
| StringList | multiple strings as list  | `array<string>` | - | ⬜ | ⬜ | ⬜ |
| Text       | multiline text input  | `string` | - | ⬛ | ⬜ | ⬜ |
| TextRich   | multiline rich text editor | `string` or `array` or `object` | **`html`** or `md` | ⬜ | ⬜ | ⬜ |
| TextRichInline | single-line rich text editor | `string` or `array` or `object` | **`html`** or `md` | ⬜ | ⬜ | ⬜ |
| Code       | text editor with syntax highlight | `string` or `array` or `object` | *multiple* | ⬜ | ⬜ | ⬜ |
| Color      | color input  | `string` | - | ⬜ | ⬜ | ⬜ |
| File       | single file selector  | `object` | - | ⬜ | ⬜ | ⬜ |
| Files      | multiple files selector  | `object` | - | ⬜ | ⬜ | ⬜ |
| Folder     | single folder selector  | `object` | - | ⬜ | ⬜ | ⬜ |
| Folders    | multiple folder selector  | `object` | - | ⬜ | ⬜ | ⬜ |
| MediaImage | single/multiple image selector, may enable embed of external (like from youtube) | `object` | - | ⬜ | ⬜ | ⬜ |
| MediaVideo | single/multiple video selector, may enable embed of external | `object` | - | ⬜ | ⬜ | ⬜ |
| MediaAudio | single/multiple audio selector, may enable embed of external | `object` | - | ⬜ | ⬜ | ⬜ |
| MediaGallery | multiple media files selector, may enable embed of external | `object` | - | ⬜ | ⬜ | ⬜ |
| Table      | table editor  | `object` or `string` | - | ⬜ | ⬜ | ⬜ |
| Grid       | drag-drop grid  | `object` | - | ⬜ | ⬜ | ⬜ |
| GenericList | list with sub-schema  | `array` | - | ⬜ | ⬜ | ⬜ |
| Card | card with headline and any sub-schema  | `array` or `object` | - | ⬜ | ⬜ | ⬜ |
| ExpansionPanel | list headlines and sub-schema  | `array` or `object` | - | ⬜ | ⬜ | ⬜ |
| Step       | list with sub-schema as steppers | `array` or `object` | - | ⬜ | ⬜ | ⬜ |
| Tabs       | list with sub-schema as tabs | `array` or `object` | - | ⬜ | ⬜ | ⬜ |
| BoolIcon   |   | `bool` | - | ⬜ | ⬜ | ⬜ |
| OptionsCheck | group of checkboxes  | `array` | - | ⬛ | ⬜ | ⬜ |
| OptionsRadio | group of radio buttons  | `string` | - | ⬛ | ⬜ | ⬜ |
| Select     |  select one out of n | `string` | - | ⬛ | ⬜ | ⬜ |
| SelectMulti  |   | `array` (`List`) | - | ⬛ | ⬜ | ⬜ |
| [SelectGroup](https://material-ui.com/components/selects/#grouping)  |   | `array` | - | ⬜ | ⬜ | ⬜ |
| Dialog     | sub-schema as dialog | `object` | - | ⬜ | ⬜ | ⬜ |
| TransferList | double select list | `array` or `object` | - | ⬜ | ⬜ | ⬜ |
| NumberSlider | slider as input | `int` | - | ⬜ | ⬜ | ⬜ |

... more to follow

⬛ only means some working example is existing during the current dev-state.

📚 [more on providing/overriding Widgets](/docs/widgets)
