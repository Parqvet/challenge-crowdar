const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");

async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  "reporterOptions": {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    timestampFilename: true
  },
  e2e: {
    watchForFileChanges: false,
    defaultCommandTimeout: 7000,
    baseUrl: "https://www.saucedemo.com",
    //specPattern: "**/*.feature",
    specPattern: "**/*.{feature,cy.js}",
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    //setupNodeEvents,
    chromeWebSecurity: false
  },

});