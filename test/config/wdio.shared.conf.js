const path = require('path')

exports.config = {
    runner: 'local',
    specs: [
        './test/specs/**/*.js'
    ],
    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 1,
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'trace',
    outputDir: path.resolve(__dirname, '../../logs'),
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    baseUrl: 'https://www.festicket.com',
  
    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,
    
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 90000,
    
    // Default request retries count
    connectionRetryCount: 3,
    framework: 'mocha',
    mochaOpts: {
      ui: 'bdd',
      timeout: 90000,
      compilers: ['js:@babel/register'],
    },
    
    // The number of times to retry the entire specfile when it fails as a whole
    // specFileRetries: 1,
    
    // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
    // specFileRetriesDeferred: false,
    
    reporters: [
      'spec',

      ['json', {
        outputDir: './test/reports/json-results'
        }],

      ['junit', {
        outputDir: './test/reports/junit-results',
        outputFileFormat: function(options) {
              return `results-${options.cid}.${options.capabilities}.xml`
          }
      }],

    ],
}
