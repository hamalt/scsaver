// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('scsaverPage', { prevSubject: 'optional' }, () => {
  return cy.visit('cypress/test.html');
});

Cypress.Commands.add(
  'initScsaver',
  { prevSubject: 'optional' },
  (subject, config = {}, el = '.scsaver') => {
    return cy.window().then((_window) => {
      _window.document.body.innerHTML = `
      ${
        config.progressBar
          ? `
      <div class="scsaver progress-bar-parent"></div>`
          : ''
      }
      <div class="scsaver black-rainbow">
        <div class="scsaver-inner">
            <p>Hello, Scsaver. Inner</p>
        </div>
      </div>
      `;
      // eslint-disable-next-line dot-notation
      const _config = config;
      if (config.progressBar) {
        _config.progressBar = false
      }
      _window.scsaverRef = new _window.Scsaver(el, _config);
      return _window.scsaverRef;
    });
  },
);