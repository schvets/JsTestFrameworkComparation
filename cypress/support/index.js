// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
const path = require('path');

/* module.exports = (on, config) => {
    on('before:browser:launch', (browser = {}, args) => {
        // browser will look something like this
        // {
        //   name: 'chrome',
        //   displayName: 'Chrome',
        //   version: '63.0.3239.108',
        //   path: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        //   majorVersion: '63'
        // }

        if (browser.name === 'chrome') {
            args.push('--disable-site-isolation-trials');
            args.push('--disable-web-security');
            args.push('-–allow-file-access-from-files');
            args.push(' --user-data-dir="C:\temp"');
            args.push("--disable-features=CrossSiteDocumentBlockingIfIsolating,CrossSiteDocumentBlockingAlways,IsolateOrigins,site-per-process");
            
            const ignoreXFrameHeadersExtension = path.join(__dirname, '../extensions/ignore-x-frame-headers');
            args.push(args.push(`--load-extension=${ignoreXFrameHeadersExtension}`));
            return args
            
        }

        if (browser.name === 'electron') {
            args['fullscreen'] = true

            // whatever you return here becomes the new args
            return args
        }
    })
} */

/* module.exports = (on, config) => {
  on('before:browser:launch', (browser = {}, args) => {
    console.log(config, browser, args);
    if (browser.name === 'chrome') {
        const ignoreXFrameHeadersExtension = path.join(__dirname, '../extensions/ignore-x-frame-headers');
        args.push(args.push(`--load-extension=${ignoreXFrameHeadersExtension}`));
        args.push('--disable-site-isolation-trials');
        args.push("--disable-features=CrossSiteDocumentBlockingIfIsolating,CrossSiteDocumentBlockingAlways,IsolateOrigins,site-per-process");
    }
    return args;
  });
}; */