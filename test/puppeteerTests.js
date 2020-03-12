const puppeteer = require('puppeteer');
const testData = require('../test/settings.js');
const { expect } = require('chai');

describe('Verify ability to send mail via Gmail', () => {
  before(async () => {
    global.browser = await puppeteer.launch({
    headless: false, 
    args: ['--start-fullscreen']
  });
});

it('Should implement the complete flow of sending email',   async () => {
  // Перейдем на страницу Авторизации Gmail аккаунт
  const page = await browser.newPage();
  await page.goto(testData.baseUrl);
  await page.screenshot({path: 'loginPage.png'});

  // Проверим что открыта требуемая страница
  expect(await page.title()).to.equal(testData.gmailTitle);;

  // Введём логин и пароль почты
  await page.type(testData.emailLocator, testData.email);
  await page.keyboard.press('Enter');
  await page.waitForNavigation({
    waitUntil: 'networkidle0'
  });  
  await page.type(testData.passwordLocator, testData.password);
  await page.keyboard.press('Enter');
  
  // Убедимся что логин выполнен, проверив тайтл страницы и текущее имя пользователя
  await page.waitForNavigation({
    waitUntil: 'domcontentloaded'
  });
  await page.screenshot({path: 'inboxPage.png'});
  let inboxTitle = await page.title().then(value => {return value});
  expect(inboxTitle).to.contain(testData.inboxTitle);

  const profileNameButton = await page.$(testData.profileNameLocator);
  await profileNameButton.click();
  let profileNameText = await page.$eval(testData.profileNameLocator, el => el.getAttribute("aria-label"));
  expect(profileNameText).to.have.string(testData.email);

  // Напишем новое письмо
  let composeButton = await page.$x(testData.composeButtonLocator);
  await composeButton[0].click();
  await page.waitForSelector(testData.recepientLocatorCss, {timeout: 3000});
  await page.type(testData.recepientLocatorCss, testData.recepientEmail);
  await page.type(testData.subjectLocatorCss, testData.emailSubject);
  await page.type(testData.bodyLocatorCss, testData.emailBody);
  let sendButton = await page.$x(testData.sendButton);
  await page.screenshot({path: 'mailBeforeSend.png'});
  await sendButton[0].click();
  await page.screenshot({path: 'mailAfterSent.png'});

  // Проверим что появился поп-ап о успешной доставке
  await page.waitForXPath(testData.sentMessagePopUpLocator, {
    visible: true,
  });

  // Проверим отправленной письмо с папке "Отправленные"
  let sentFolder = await page.$x(testData.sentMessageFolderLocator);
  await sentFolder[0].click();
  await page.waitForXPath(testData.mailRow, {
    visible: true,
  });
  let messageRow = await page.$x(testData.mailRow);
  await messageRow[0].click();
  
  await page.waitForSelector(testData.sentMailSubjectCss, {
    visible: true,
  });
  let actualSubject = await page.$eval(testData.sentMailSubjectCss, el => el.textContent);
  let recepientEmailLabel = await page.$(testData.showRecepientButtonLocatorCss);
  await recepientEmailLabel.click();
  let actualRecepientAddress = await page.$eval(testData.recepientAddressLocatorCss, el => el.textContent);
  let actualMailBody = await page.$eval(testData.sentMailBodyCss, el => el.textContent);
  await page.screenshot({path: 'inbox.png'});

  expect(actualSubject).to.equal(testData.emailSubject);
  expect(actualRecepientAddress).to.equal(testData.recepientEmail);
  expect(actualMailBody).to.equal(testData.emailBody);
});
});

after(() => {
  global.browser.close();
});