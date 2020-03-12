const testData = require('../test/settings.js');
const {browser, by, element, protractor, Key} = require('protractor');


describe('Verify ability to send mail via Gmail', function () {
    beforeEach(function () {
        // Перейдем на страницу Авторизации Gmail аккаунт
        browser.ignoreSynchronization = true;
        browser.get(testData.baseUrl);
    });

    it('Should implement the complete flow of sending email', function () {
        var EC = protractor.ExpectedConditions;
        // Проверим что открыта требуемая страница
        expect(browser.driver.getTitle()).toEqual(testData.gmailTitle);

        // Введём логин и пароль почты
        element(by.css(testData.emailLocator)).sendKeys(testData.email).sendKeys(protractor.Key.ENTER);
        browser.wait(protractor.ExpectedConditions.elementToBeClickable($(testData.passwordLocator)), 5000);
        element(by.css(testData.passwordLocator)).sendKeys(testData.password).sendKeys(protractor.Key.ENTER);
        browser.wait(EC.titleContains(testData.inboxTitle), 5000);

        // Убедимся что логин выполнен, проверив тайтл страницы и текущее имя пользователя
        expect(browser.driver.getTitle()).toContain(testData.inboxTitle);
        element(by.css(testData.profileNameLocator)).click();
        expect(element(by.css(testData.profileNameLocator)).getAttribute('aria-label')).toContain(testData.email);

        // Напишем новое письмо
        element(by.xpath(testData.composeButtonLocator)).click();
        browser.wait(protractor.ExpectedConditions.elementToBeClickable($(testData.recepientLocatorCss)), 5000);
        element(by.css(testData.recepientLocatorCss)).sendKeys(testData.recepientEmail);
        element(by.css(testData.subjectLocatorCss)).sendKeys(testData.emailSubject);
        element(by.css(testData.bodyLocatorCss)).sendKeys(testData.emailBody);
        element(by.xpath(testData.sendButton)).click();

        // Проверим что появился поп-ап о успешной доставке
        browser.wait(EC.visibilityOf(element(by.xpath(testData.sentMessagePopUpLocator))), 5000);

        // Проверим отправленной письмо с папке "Отправленные"
        browser.wait(EC.elementToBeClickable(element(by.xpath(testData.sentMessageFolderLocator))), 5000);
        element(by.xpath(testData.sentMessageFolderLocator)).click();
        browser.wait(EC.visibilityOf(element(by.xpath(testData.mailRow))), 5000);
        element(by.xpath(testData.mailRow)).click();
        browser.wait(EC.visibilityOf(element(by.css(testData.sentMailSubjectCss))), 5000);
        expect(element(by.css(testData.sentMailSubjectCss)).getText()).toEqual(testData.emailSubject); 
        element(by.css(testData.showRecepientButtonLocatorCss)).click();
        expect(element(by.css(testData.recepientAddressLocatorCss)).getText()).toEqual(testData.recepientEmail); 
        expect(element(by.css(testData.sentMailBodyCss)).getText()).toEqual(testData.emailBody);
    });
});
