# Options List

Widgets for multiple options, either as 'select 1 from n' or 'select n from n', usable for `boolean`, `array` types.

- type: `boolean`, `array`
- view
    - grid keywords

- [Boolean Type Properties](/docs/schema#type-boolean)
- [Object Type Properties](/docs/schema#type-object)
- [View Properties](/docs/schema#view-keyword)

## Design System

### Material-UI

```js
import {
    OptionsCheck, OptionsRadio
} from "@ui-schema/ds-material/es/Widgets/Options";
```

Components:

- `OptionsCheck` multiple check boxes
    - use `enum` to specify array of values
    - produces `array` with selected values
- `OptionsRadio` radio inputs
    - produces `boolean`
