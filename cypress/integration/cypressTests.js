import 'cypress-iframe'

describe('Verify ability to send mail via Gmail', () => {
  beforeEach(() => {
    cy.fixture("settings.json").then((testData) => {
      // Перейдем на страницу Авторизации аккаунта почты
      cy.visit("https://mail.online.ua/ ")
    });
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    });
  });

  it('Should implement the complete flow of sending email', () => {
    cy.fixture("settings.json").then((testData) => {
    // Проверим что открыта требуемая страница
    cy.title().should('include', "ONLINE.UA - Бесплатная Электронная Почта");
    cy.frameLoaded('iframe');
    
    // Введём логин и пароль почты
    cy.iframe().find('input#login').click();
    cy.iframe().find('input#login').type(testData.emailIUa);
    cy.iframe().find('input#password').click();
    cy.iframe().find('input#password').type(testData.password);
    cy.iframe().find("input[type='submit']").click();

    // Убедимся что логин выполнен, проверив тайтл страницы и текущее имя пользователя
    cy.title().should('eq', "Новини України та світу на ONLINE.UA");
    cy.get("button#navbarDropdownMenuLink").click();
    cy.get(" a[href='//mail4.online.ua']").click();
    cy.title().should('eq', "testaccpres@online.ua");

    // Напишем новое письмо
    cy.get('.ua-icon-sidebar-open').click();
    cy.get('.sidebar-section-nav__item-text').click();
    cy.get('#msg_to').type(testData.recepientEmail);;
    cy.get('#msg_subject').type(testData.emailSubject);;
    cy.get('#msg_body').clear().type(testData.emailBody);
    cy.get('div#c_msg_new>div>button.btn.btn-success.icon-right.mr-3').click();

    // Проверим отправленной письмо с папке "Отправленные"
    cy.visit("https://mail4.online.ua/");
    cy.get('.ua-icon-sidebar-open').click();
    cy.get('li#bfld_1').click();
    cy.get('div.divTableRow:first-of-type').click();;
    cy.get('div.m-mail__content-heading').invoke('text').then((text => {
      expect(text.trim()).to.eq(testData.emailSubject)
    }));
    cy.get('div.m-mail__content-heading-desc > div:nth-child(3) > a').invoke('text').then((text => {
      expect(text.trim()).to.eq(testData.recepientEmail)
    }));
    cy.get('div.view-letter-text').invoke('text').then((text => {
        expect(text.trim()).to.eq(testData.emailBody)
    }));
    });
  }); 
})