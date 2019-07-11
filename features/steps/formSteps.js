var config = require("config");
var chai = require("chai").use(require("chai-as-promised"));
var expect = chai.expect;
var { Given, When, Then } = require("cucumber");
var { browser, $, element, ExpectedConditions, by } = require("protractor");

const browserTimeout = config.get("browserTimeout");

Given("I go to {string}", async function(url){
    await browser.get(url); //go to the url
    await browser.wait(ExpectedConditions.urlIs(url), browserTimeout);
});

// Enter data to input field
When("I enter {string} for field {string}", async function (fieldData, fieldName) {
    var inputField = element(by.model(fieldName));
    await browser.wait(ExpectedConditions.visibilityOf(inputField), browserTimeout);
    await inputField.sendKeys(fieldData); //Apply the input data
});

//Click the only available button OR (unsafe) click the first button
When("I click a button", async function () {
    var button = $(".btn");
    await browser.wait(ExpectedConditions.visibilityOf(button), browserTimeout);
    await button.click();
});

//Radio buttons
When("I select the option with value {string}", async function(opValue){
    var optionField = element(by.css('[value="${opValue}"]'));
    await browser.wait(ExpectedConditions.visibilityOf(optionField), browserTimeout);
    await optionField.click();
});

Then("the alert should read {string}", async function(expectedText){
    await browser.wait(ExpectedConditions.alertIsPresent(), browserTimeout);
    const alert = await browser.switchTo().alert();
    const alertText = await alert.getText(alert);
    await alert.accept();
    expect(alertText).to.be.eql(expectedText);
});

//Validate field text
Then("field {string} contains {string}", async function (logField, logContent) {
    var field = $(logField);
    await browser.wait(ExpectedConditions.visibilityOf(field), browserTimeout);
        var fieldText = await field.getText();
        expect(fieldText.trim()).to.equal(logContent);
});

