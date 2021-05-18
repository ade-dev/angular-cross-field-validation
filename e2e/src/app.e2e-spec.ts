import { AppPage } from './app.po';
import { browser, by, element, ElementArrayFinder, ElementFinder } from 'protractor';

describe('Cross-field validation App', () => {

  let appPage: AppPage;

  beforeEach(() => {
    appPage = new AppPage();
  });

  it('Should render page title', () => {
    appPage.navigateTo();
    expect(appPage.getTitleText()).toEqual('Angular - Reactive form input value cross-validation');
  });
});

describe('Reactive and template-driven form validation tests: ', () => {

  beforeAll(() => browser.get(''));

  describe('Reactive form', () => {
    beforeAll(() => {
      getElements('app-reactive-form');
    });

    initialStateTest();
    emailTests();
    compareEmails();
    passwordTests();
    comparePasswords();
  });

  describe('Template-driven form', () => {
    beforeAll(() => {
      navigateToPage('templateForm');
      getElements('app-template-driven-form');
    });

    initialStateTest();
    emailTests();
    compareEmails();
    passwordTests();
    comparePasswords();
  });
});

let page: {
  form: ElementFinder,
  nameInput: ElementFinder,
  emailInput: ElementFinder,
  confirmEmailInput: ElementFinder,
  passwordInput: ElementFinder,
  confirmPasswordInput: ElementFinder,
  errorMessages: ElementArrayFinder,
};

function getElements(selector: string) {
  const template = element(by.css(selector));
  page = {
    form: template.element(by.css('form')),
    nameInput: template.element(by.css('#name')),
    emailInput: template.element(by.css('#email')),
    confirmEmailInput: template.element(by.css('#confirmEmail')),
    passwordInput: template.element(by.css('#password')),
    confirmPasswordInput: template.element(by.css('#confirmPassword')),
    errorMessages: template.all(by.css('div.alert')),
  };
}

function navigateToPage(linkId: string) {
  element(by.id(linkId)).click().then(() => {
    browser.sleep(2000).then(() => {
      browser.getCurrentUrl();
      // .then((actualUrl) => { console.log("actualUrl: ", actualUrl); });
    });
  });
}

function initialStateTest() {
  it('Should have error on load', async () => {
    expect(await page.form.getAttribute('class')).toMatch('ng-invalid');
  });
}

function emailTests() {

  it('Should render "email required" error when Email has no value', async () => {
    await browser.actions().click(page.emailInput).perform();
    await browser.actions().click(page.confirmEmailInput).perform();
    expect(await page.form.getAttribute('class')).toMatch('ng-invalid');
    expect(await page.errorMessages.get(0).getText()).toContain('Email is required');
  });

  it("Should render 'Invalid email' error when Email value is 'abc'", async () => {
    await page.emailInput.sendKeys('abc');
    await browser.actions().click(page.confirmEmailInput).perform();
    expect(await page.form.getAttribute('class')).toMatch('ng-invalid');
    expect(await page.errorMessages.get(0).getText()).toContain('Please enter a valid email.');
  });

  it("Should clear 'Invalid email' error when Email value is 'a@bc.com'", async () => {
    await page.emailInput.clear();
    await page.emailInput.sendKeys('a@bc.com');
    await browser.actions().click(page.confirmEmailInput).perform();
    expect(await page.errorMessages.get(0).getText()).not.toContain('Please enter a valid email.');
  });
};

function compareEmails() {

  it("Should render 'Email entries do not match' error if 'confirmEmail' value is 'x@yz.com'", async () => {
    await page.confirmEmailInput.sendKeys('x@yz.com');
    await browser.actions().click(page.passwordInput).perform();
    expect(await page.form.getAttribute('class')).toMatch('ng-invalid');
    expect(await page.errorMessages.get(0).getText()).toBe('Email entries do not match.');
  });

  it("Should clear 'Email do not match' error if 'email' and 'confirmEmail' values match", async () => {
    await page.confirmEmailInput.clear();
    await page.confirmEmailInput.sendKeys('a@bc.com');
    await browser.actions().click(page.passwordInput).perform();
    expect(await page.errorMessages.get(0).getText()).not.toContain('Email entries do not match.');
  });
};

function passwordTests() {

  it('Should render "password required" error when password has no value', async () => {
    await browser.actions().click(page.passwordInput).perform();
    await browser.actions().click(page.confirmPasswordInput).perform();
    expect(await page.form.getAttribute('class')).toMatch('ng-invalid');
    expect(await page.errorMessages.get(0).getText()).toContain('Password is required');
  });
};

function comparePasswords() {

  it("should render 'password do not match' error if 'password' and 'confirmPassword' values do not match", async () => {
    await page.passwordInput.sendKeys('abcdef');
    await page.confirmPasswordInput.sendKeys('uvxyz');
    await browser.actions().mouseDown(page.passwordInput).perform();
    expect(await page.form.getAttribute('class')).toMatch('ng-invalid');
    expect(await page.errorMessages.get(0).getText()).toBe('Password entries do not match');
  });

  it("Should clear 'Password do not match' error if 'password' and 'confirmPassword' values match", async () => {
    await page.confirmPasswordInput.clear();
    await page.confirmPasswordInput.sendKeys('abcdef');
    await element(by.css('app-root')).click();
    expect(await page.errorMessages.get(0).isPresent()).toBe(false);
  });
};
