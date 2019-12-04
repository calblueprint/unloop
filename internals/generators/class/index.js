/**
 * Class Component Generator
 */

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add a class component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Form',
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
      name: 'wantHeaders',
      default: false,
      message: 'Do you want headers?',
    },
    {
      type: 'confirm',
      name: 'wantStyles',
      default: true,
      message: 'Do you want styles?',
    },
    {
      type: 'confirm',
      name: 'wantTheme',
      default: false,
      message: 'Do you want to wrap your component with ThemeProvider?',
    },
    {
      type: 'confirm',
      name: 'wantLoadable',
      default: true,
      message: 'Do you want to load resources asynchronously?',
    },
  ],
  actions: data => {
    // Generate index.js and index.test.js
    const actions = [
      {
        type: 'add',
        path: '../../app/javascript/components/{{properCase name}}/index.js',
        templateFile: './class/index.js.hbs',
        abortOnFail: true,
      },
    ];

    // If component wants styles
    if (data.wantStyles) {
      actions.push({
        type: 'add',
        path: '../../app/javascript/components/{{properCase name}}/styles.js',
        templateFile: './class/styles.js.hbs',
        abortOnFail: true,
      });
    }

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
