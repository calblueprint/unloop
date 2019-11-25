/**
 * Functional Generator
 */

/* eslint strict: ["off"] */

'use strict';

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add a functional component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Button',
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'confirm',
      name: 'memo',
      default: false,
      message: 'Do you want to wrap your component in React.memo?',
    },
    {
      type: 'confirm',
      name: 'wantStyles',
      default: true,
      message: 'Do you want styles?',
    },
    {
      type: 'confirm',
      name: 'wantLoadable',
      default: false,
      message: 'Do you want to load the component asynchronously?',
    },
  ],
  actions: data => {
    // Generate index.js and index.test.js
    const actions = [
      {
        type: 'add',
        path: '../../app/javascript/components/{{properCase name}}/index.js',
        templateFile: './functional/index.js.hbs',
        abortOnFail: true,
      },
    ];

    // If user wants styles
    if (data.wantStyles) {
      actions.push({
        type: 'add',
        path: '../../app/javascript/components/{{properCase name}}/styles.js',
        templateFile: './functional/styles.js.hbs',
        abortOnFail: true,
      });
    }

    // If the user wants Loadable.js to load the component asynchronously
    if (data.wantLoadable) {
      actions.push({
        type: 'add',
        path: '../../app/javascript/components/{{properCase name}}/Loadable.js',
        templateFile: './functional/loadable.js.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'prettify',
      path: '/components/',
    });

    return actions;
  },
};
