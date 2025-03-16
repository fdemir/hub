/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { legacyPlugin } from "@web/dev-server-legacy";
import { playwrightLauncher } from "@web/test-runner-playwright";

const mode = process.env.MODE || "dev";
if (!["dev", "prod"].includes(mode)) {
  throw new Error(`MODE must be "dev" or "prod", was "${mode}"`);
}

// Uncomment for testing on Sauce Labs
// Must run `npm i --save-dev @web/test-runner-saucelabs` and set
// SAUCE_USERNAME and SAUCE_USERNAME environment variables
// ===========
// import {createSauceLabsLauncher} from '@web/test-runner-saucelabs';
// const sauceLabsLauncher = createSauceLabsLauncher(
//   {
//     user: process.env.SAUCE_USERNAME,
//     key: process.env.SAUCE_USERNAME,
//   },
//   {
//     'sauce:options': {
//       name: 'unit tests',
//       build: `${process.env.GITHUB_REF ?? 'local'} build ${
//         process.env.GITHUB_RUN_NUMBER ?? ''
//       }`,
//     },
//   }
// );

// Uncomment for testing on BrowserStack
// Must run `npm i --save-dev @web/test-runner-browserstack` and set
// BROWSER_STACK_USERNAME and BROWSER_STACK_ACCESS_KEY environment variables
// ===========
// import {browserstackLauncher as createBrowserstackLauncher} from '@web/test-runner-browserstack';
// const browserstackLauncher = (config) => createBrowserstackLauncher({
//   capabilities: {
//     'browserstack.user': process.env.BROWSER_STACK_USERNAME,
//     'browserstack.key': process.env.BROWSER_STACK_ACCESS_KEY,
//     project: 'my-element',
//     name: 'unit tests',
//     build: `${process.env.GITHUB_REF ?? 'local'} build ${
//       process.env.GITHUB_RUN_NUMBER ?? ''
//     }`,
//     ...config,
//   }
// });

const browsers = {
  // Local browser testing via playwright
  // ===========
  chromium: playwrightLauncher({ product: "chromium" }),
  firefox: playwrightLauncher({ product: "firefox" }),
  webkit: playwrightLauncher({ product: "webkit" }),

  // Uncomment example launchers for running on Sauce Labs
  // ===========
  // chromium: sauceLabsLauncher({browserName: 'chrome', browserVersion: 'latest', platformName: 'Windows 10'}),
  // firefox: sauceLabsLauncher({browserName: 'firefox', browserVersion: 'latest', platformName: 'Windows 10'}),
  // safari: sauceLabsLauncher({browserName: 'safari', browserVersion: 'latest', platformName: 'macOS 10.15'}),

  // Uncomment example launchers for running on Sauce Labs
  // ===========
  // chromium: browserstackLauncher({browserName: 'Chrome', os: 'Windows', os_version: '10'}),
  // firefox: browserstackLauncher({browserName: 'Firefox', os: 'Windows', os_version: '10'}),
  // edge: browserstackLauncher({browserName: 'MicrosoftEdge', os: 'Windows', os_version: '10'}),
};

// Prepend BROWSERS=x,y to `npm run test` to run a subset of browsers
// e.g. `BROWSERS=chromium,firefox npm run test`
const noBrowser = (b) => {
  throw new Error(`No browser configured named '${b}'; using defaults`);
};
let commandLineBrowsers;
try {
  commandLineBrowsers = process.env.BROWSERS?.split(",").map(
    (b) => browsers[b] ?? noBrowser(b)
  );
} catch (e) {
  console.warn(e);
}

// https://modern-web.dev/docs/test-runner/cli-and-configuration/
export default {
  rootDir: ".",
  files: [
    "./**/*.test.js",
    "**/*.spec.ts", // include `.spec.ts` files
    "!**/*.e2e.spec.ts", // exclude `.e2e.spec.ts` files
    "!**/node_modules/**/*", // exclude any node modules
  ],
  nodeResolve: { exportConditions: mode === "dev" ? ["development"] : [] },
  preserveSymlinks: true,
  browsers: commandLineBrowsers ?? Object.values(browsers),
  testFramework: {
    // https://mochajs.org/api/mocha
    config: {
      ui: "tdd",
      timeout: "60000",
    },
  },
  coverage: true,
  coverageConfig: {
    report: true,
    reportDir: "test-coverage",
    include: ["src/**/*.js"],
    exclude: ["src/mixins/connect.js", "src/styles/base.js"],
    threshold: {
      statements: 85,
      branches: 80,
      functions: 85,
      lines: 85,
    },
  },
  plugins: [
    legacyPlugin({
      polyfills: {
        webcomponents: true,
        custom: [
          {
            name: "lit-polyfill-support",
            path: "node_modules/lit/polyfill-support.js",
            test: "!('attachShadow' in Element.prototype)",
            module: false,
          },
        ],
      },
    }),

    // Update process polyfill to fix initialization issue
    {
      name: "process-polyfill",
      transform(context) {
        if (context.response.is("js")) {
          return {
            body: `
                  // Define process at the very beginning of the file
                  window.process = window.process || { env: { NODE_ENV: 'test' } };
                  ${context.body}
                `,
          };
        }
      },
    },
  ],
};
