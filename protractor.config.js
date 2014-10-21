// An example configuration file
exports.config = {
  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Spec patterns are relative to the configuration file location passed
  // to proractor (in this example conf.js).
  // They may include glob patterns.
  specs: ['test/e2e/**/*.js'],

  rootElement: 'body',

  onPrepare: function() {
    var ptor = protractor.getInstance();
    ptor.elem = ptor.findElement;
    ptor.elems = ptor.findElements;
    global.by = protractor.By;
    global.ptor = ptor;
    global.baseUrl = this.baseUrl;
    browser.driver.manage().window().maximize();
  },

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    isVerbose: true
  }
};
