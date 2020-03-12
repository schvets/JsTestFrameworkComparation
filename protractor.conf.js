exports.config = {
    directConnect: true,

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome', //firefox,chrome
        'chromeOptions': {
            args: ['--window-size=1920,1080']
        }
    },

    // Framework to use. Jasmine is recommended.
    framework: 'jasmine',
    // Spec patterns are relative to the current working directory when protractor is called.
    specs: ['test/protractorTests.js'],

    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        defaultTimeoutInterval: 100000
    }
};