# Overview

UI and Form generator for React using [JSON-Schema](https://json-schema.org/understanding-json-schema/index.html) build around a powerful widget system, made for beautiful and great experiences!

Widgets are defined per design-system, use the design-system binding you need or create your own easily.

JSON-Schema included keywords are used to describe the data and create the UI based on the data-schema and special UI keywords. A data-schema with integrated ui-schema enforces the consistency of the UX across different apps and devices.

## Design Systems

The package `@ui-schema/ui-schema` supports rendering widgets for JSON-schema `type` and rendering own widgets for any type.

It is possible to connect any design system to the renderer, included or planned support:

- `@ui-schema/ds-material` adds binding to [@material-ui/core](https://material-ui.com/) to use [Material Design](https://material.io/) - **in dev**
- `@ui-schema/ds-bootstrap` adds binding to plain bootstrap semantic HTMLs to use with any Bootstrap theme - **in dev**
- `@ui-schema/ds-blueprint` adds binding to [blueprintjs](https://blueprintjs.com/docs/) - **would be nice**
- `@ui-schema/ds-semanticui` adds binding to [semantic-ui](https://react.semantic-ui.com/usage/) - **would be nice**
- `@ui-schema/ds-antdesign` adds binding to [Ant Design](https://ant.design/docs/react/introduce) - **would be nice**
- `@ui-schema/ds-pulse` adds binding to [.pulse](https://pulse.heartbeat.ua/components/box) - **would be nice**

📚 [How To Install A Design System](/docs/design-systems)

A design-system bundles multiple widgets, select the design-system binding you need, here is an overview of all widgets/types.

Each widget handles it's own sub-schema, e.g. the `string` type widget only needs to know how to handle it's own string.

A match by `widget` supersedes the `type` matching.

## Widget List

Widgets for `type`:

| Type         | Format      | Component            | Material-UI | Bootstrap | ? |
| :---         | :---        | :---                 | ---: | ---: | ---: | 
| `string`     | -           | [Normal Text](/docs/widgets/TextField)    | ⬛ | ⬜ | ⬜ |
| `string`     | `date`      | Date           | ⬛ | ⬜ | ⬜ |
| `string`     | `date-time` | Date+Time      | ⬜ | ⬜ | ⬜ |
| `string`     | `time`      | Time           | ⬜ | ⬜ | ⬜ |
| `string`     | `email`     | Email          | ⬜ | ⬜ | ⬜ |
| `string`     | `tel`       | Tel. No.       | ⬜ | ⬜ | ⬜ |
| `number`     | -           | [Number](/docs/widgets/TextField)     | ⬛ | ⬜ | ⬜ |
| `bool` or `boolean` | -    | [Switch / Toggle](/docs/widgets/Switch) | ⬛ | ⬜ | ⬜ |
| `object`     | -           | Native Objects       | ⬛ | ⬜ | ⬜ |
| `array`      | -           | only supported through widgets | - | - | - |

Widgets for `widget`, special UI's and specific type handling:

| Widget     | Component | Expected Type(s) | Formats | Material-UI | Bootstrap | ? |
| :---       | :----     | ---: | ---: | ---: | ---: | ---: |
| StringList | multiple strings as list  | `array<string>` | - | ⬜ | ⬜ | ⬜ |
| Text       | [multiline text](/docs/widgets/TextField)  | `string` | - | ⬛ | ⬜ | ⬜ |
| TextRich   | multiline rich text editor | `string` or `array` or `object` | **`html`** or `md` | ⬜ | ⬜ | ⬜ |
| TextRichInline | single-line rich text editor | `string` or `array` or `object` | **`html`** or `md` | ⬜ | ⬜ | ⬜ |
| Code       | text editor with syntax highlight | `string` or `array` or `object` | *multiple* | ⬜ | ⬜ | ⬜ |
| Color      | color selector  | `string` | - | ⬜ | ⬜ | ⬜ |
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
| OptionsCheck | [group of checkboxes](/docs/widgets/OptionsList)  | `array` | - | ⬛ | ⬜ | ⬜ |
| OptionsRadio | [group of radio buttons](/docs/widgets/OptionsList)  | `string` | - | ⬛ | ⬜ | ⬜ |
| Select     |  select one out of n | `string` | - | ⬛ | ⬜ | ⬜ |
| SelectMulti  |   | `array` (`List`) | - | ⬛ | ⬜ | ⬜ |
| [SelectGroup](https://material-ui.com/components/selects/#grouping)  |   | `array` | - | ⬜ | ⬜ | ⬜ |
| Dialog     | sub-schema as dialog | `object` | - | ⬜ | ⬜ | ⬜ |
| TransferList | double select list | `array` or `object` | - | ⬜ | ⬜ | ⬜ |
| NumberSlider | slider as input | `int` | - | ⬜ | ⬜ | ⬜ |

... more to follow

⬛ only means some working example is existing during the current dev-state.

📚 [more on providing/overriding Widgets](/docs/widgets)
