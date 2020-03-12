const testData = require('../test/settings.js');
const {By, until, Key} = require('selenium-webdriver');
const {it, after, beforeEach } = require('mocha');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const {expect} = require('chai');

describe('Verify ability to send mail via Gmail', () => {  
    
    const driver = new webdriver.Builder().forBrowser("chrome")
        .withCapabilities(webdriver.Capabilities.chrome()).build();
    
    it('Should implement the complete flow of sending email', async () => {
        // Перейдем на страницу Авторизации Gmail аккаунт
        await driver.get(testData.baseUrl);
        await driver.manage().window().maximize();

        // Проверим что открыта требуемая страница
        await driver.wait(until.titleIs(testData.gmailTitle), 5000);

        // Введём логин и пароль почты
        await driver.wait(until.elementLocated(By.css(testData.emailLocator)))
           .sendKeys(testData.email, Key.ENTER);
        await driver.wait(until.elementLocated(By.css(testData.passwordLocator)));
        await driver.sleep(1000);
        await driver.findElement(By.css(testData.passwordLocator))
            .sendKeys(testData.password, Key.ENTER);
         
        // Убедимся что логин выполнен, проверив тайтл страницы и текущее имя пользователя
        await driver.wait(until.titleContains(testData.inboxTitle,5000));
        await driver.wait(until.elementLocated(By.css(testData.profileNameLocator))).click();
        let profileNameText = await driver.findElement(By.css(testData.profileNameLocator))
          .getAttribute("aria-label");
        expect(profileNameText).to.have.string(testData.email);

        // Напишем новой письмо
        await driver.findElement(By.xpath(testData.composeButtonLocator)).click();
        await driver.wait(until.elementLocated(By.name(testData.recepientLocator)))
            .sendKeys(testData.recepientEmail);
        await driver.findElement(By.name(testData.subjectLocator))
            .sendKeys(testData.emailSubject);
        await driver.findElement(By.xpath(testData.bodyLocator))
            .sendKeys(testData.emailBody);
        await driver.findElement(By.xpath(testData.sendButton)).click();
        let isMessageSent = await driver.wait(until.elementLocated(By.xpath(testData.sentMessagePopUpLocator)))
            .isDisplayed();

        // Проверим что появился поп-ап о успешной доставке
        expect(isMessageSent).to.equal(true);

        // Проверим отправленной письмо с папке "Отправленные"
        await driver.findElement(By.xpath(testData.sentMessageFolderLocator)).click();
        await driver.wait(until.elementLocated(By.xpath(testData.mailRow)));
        await driver.sleep(500);
        await driver.wait(until.elementIsEnabled(await driver.findElement(By.xpath(testData.mailRow)))).click();
        let actualSubject = await driver.findElement(By.xpath(testData.sentMailSubject)).getText();
        await driver.findElement(By.xpath(testData.showRecepientButtonLocator)).click();
        let actualRecepientAddress = await driver.wait(until.elementLocated(By.xpath(testData.recepientAddressLocator))).getText();
        let actualMailBody = await driver.findElement(By.xpath(testData.sentMailBody)).getText();

        expect(actualSubject).to.equal(testData.emailSubject);
        expect(actualRecepientAddress).to.equal(testData.recepientEmail);
        expect(actualMailBody).to.equal(testData.emailBody);
    })
    
    after(async () => 
        driver.quit());
})



