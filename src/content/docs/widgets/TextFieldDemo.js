const demoTextField = [
    [
        `
### Demo string
`,
        {type: 'object', properties: {demo_input: {type: 'string'}}}
    ], [
        `
### Demo string multiline
`,
        {type: 'object', properties: {demo_input: {type: 'string', widget: 'Text'}}}
    ], [
        `
### Demo number
`,
        {type: 'object', properties: {demo_input: {type: 'number'}}}
    ],
];

export {demoTextField}
