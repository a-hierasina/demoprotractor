var config = require("config");
exports.config = {

    /*webdriver-manager address */
    seleniumAddress: "http://localhost:4444/wd/hub",

    framework: "custom",
    frameworkPath: require.resolve("protractor-cucumber-framework"),

    capabilities: {
        browserName: "chrome",
        chromeOptions: {
            //args: [ "--headless", "--disable-gpu", "--window-size=800,600"]
        }
    },

//Test on multiple browsers at once
/*    multiCapabilities: [
        {
            'browserName': 'firefox',
            'moz:firefoxOptions': {
                //args: ["--headless"]
            }
        },
        {
            'browserName': 'chrome',
            'chromeOptions': {
                //args: [ "--headless", "--disable-gpu", "--window-size=800,600"]
        }}
    ],
    maxSessions: 2, //Limit to one browser at a time */
    ignoreUncaughtExceptions: "true",

    specs: [
        "features/*.feature"
    ],

    cucumberOpts: {
        require: ["features/steps/*.js", "features/support/*.js"],
        format: `json:${config.get("report.dir") + config.get("report.results")}`,
        strict: true
    },
    plugins: [{
        package: 'protractor-multiple-cucumber-html-reporter-plugin',
        options: {
            automaticallyGenerateReport: true,
            removeExistingJsonReportFile: true
        }
    }]
};