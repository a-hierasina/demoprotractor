var reporter = require("cucumber-html-reporter");
var shell = require("shelljs");
var os = require("os");
var config = require("config");

//Options for the HTML report

var options = {
    theme: "bootstrap",
    jsonFile: config.get("report.dir") + config.get("report.results"),
    output: `${config.get("report.dir")}/cucumber_report${(new Date).getTime()}.html`,
    reportSuiteAsScenarios: true,
    launchReport: true,
    metadata: {
        "App Version": "1.0.0",
        "Browser": "Chrome",
        "Platform": os.type(),
        "Parallel": "Scenarios",
        "Executed": "Remote"
    }
};

//Run Protractor & generate nice HTML Report

async function runProtractor() {
    await shell.exec("npm run protractor"); //Run as a child process
    await reporter.generate(options); //Generates the Report after protractor runs
}

runProtractor();