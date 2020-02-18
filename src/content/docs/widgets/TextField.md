# TextField

Widgets for native HTML text inputs, usable for `string` (single/multiline), `number` types and browser supported formats.

- type: `string`, `number`
- formats:
    - `date`
    - `email`
    - `tel`
- view
    - grid keywords

- [Type Properties](/docs/schema#type-string)
- [View Properties](/docs/schema#view-keyword)

## Design System

### Material-UI

```js
import {
    TextRenderer, NumberRenderer, StringRenderer
} from "@ui-schema/ds-material/es/Widgets/TextField";
```

Supports extra keywords:

- `view`
    - `variant`
    - `margin`
- `formats`
    - `date+time`
    - `time`

Components:

- `TextRenderer` supports multi-line text
    - extra keywords:
        - `view`
            - `rows`
            - `rowsMax`
- `NumberRenderer` supports numbers
- `StringRenderer` base component used by both others and for `string`
