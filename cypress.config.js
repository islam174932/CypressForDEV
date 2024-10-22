const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");

async function setupNodeEvents(on, config) {
  // Cucumber preprocessor setup
  await addCucumberPreprocessorPlugin(on, config);
  require("cypress-mochawesome-reporter/plugin")(on);

  // Correctly configure esbuild with the preprocessor
  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  );

  return config;
}

// Cypress configuration
module.exports = defineConfig({
  projectId: "nodpcq",
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "Cypress Test Results",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    embeddedVideos: true,
  },
  e2e: {
    setupNodeEvents,
    specPattern: [
      "cypress/integration/examples/*.js",
      "cypress/integration/examples/BDD/*.feature",
    ],
    retries: {
      runMode: 1,
    },
    defaultCommandTimeout: 5000,
    screenshotOnRunFailure: true,
    screenshotsFolder: "cypress/screenshots",
    video: true,
    videosFolder: "cypress/videos",
    videoCompression: 32,
    videoOnFailOnly: false,
    env: {
      baseUrl: "https://rahulshettyacademy.com/AutomationPractice/",
    },
  },
  // Updated Cucumber preprocessor configuration
  "cypress-cucumber-preprocessor": {},
});
