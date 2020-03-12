module.exports = {
    //Test Data
    email: "tafuser.sc001@gmail.com",
    password: "fglstaf1",
    recepientEmail: "schvets.a@gmail.com",
    emailSubject: "Test subject Test subject Test subject Test subject",
    emailBody: "Test body Test body Test body Test body Test body Test body Test body Test body",
    baseUrl: 'https://mail.google.com',
    gmailTitle: 'Gmail',
    inboxTitle: 'Inbox',
    
    //Locators
    emailLocator: "input[type='email']",
    passwordLocator: "input[type='password']",
    profileNameLocator: "a.gb_D.gb_Oa.gb_i",
    composeButtonLocator: "//div[text()='Compose']",
    recepientLocator: "to",
    subjectLocator: "subjectbox",
    recepientLocatorCss: "textarea[name='to']",
    subjectLocatorCss: "input[name='subjectbox']",
    bodyLocator: "//div[@aria-label='Message Body']",
    bodyLocatorCss: "div[aria-label='Message Body']",
    sendButton: "//div[contains(@aria-label,'Send') and @role='button']",
    sentMessagePopUpLocator: "//span[contains(text(),'Message sent')]",
    sentMessageFolderLocator: "//a[@title='Sent']",
    mailRow: "//tr//*[contains(text(),'schvets')]/ancestor::tr",
    sentMailSubject: "//div[@role='main']//div/h2",
    sentMailSubjectCss: "div[role='main'] div.ha>h2",
    showRecepientButtonLocator: "//div[@data-tooltip='Show details']",
    showRecepientButtonLocatorCss: "div[data-tooltip='Show details']",
    sentMailBody: "//div[@role='main']//div[@dir='ltr']",
    sentMailBodyCss: "div[role='main'] div[dir='ltr']",
    recepientAddressLocator: "//td/span/span[@data-hovercard-id]",
    recepientAddressLocatorCss: "td>span>span[data-hovercard-id]"

};