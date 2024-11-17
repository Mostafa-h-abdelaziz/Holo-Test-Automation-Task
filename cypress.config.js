const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    reportFilename: 'Holo-test-automation-report',
    overwrite: true,
    html: true,
    json: true
  },
  e2e: {
  setupNodeEvents(on, config) {
//  specPattern: 'cypress/e2e/**/*.cy.js',
  require('cypress-mochawesome-reporter/plugin')(on);
  return config;
    },
   supportFile: false,
  },
});
