const { setDefaultTimeout, Before, BeforeAll, After, AfterAll, Status } = require("cucumber");
const config = require("config");
const { browser } = require("protractor");

setDefaultTimeout(config.get("globalTimeout"));

BeforeAll(async function() {
    console.log("Running before the feature");
});

AfterAll(async function() {
    console.log("Running after the feature");
});

/*Screenshot on failure*/
After(async function(scenario) {
    if(scenario.result.status === Status.FAILED){
        const png = await browser.takeScreenshot();
        var decodedImage = new Buffer(png, "base64");
        return this.attach(decodedImage, "image/png");
    }
});