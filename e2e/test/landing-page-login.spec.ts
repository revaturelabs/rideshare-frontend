import { AppPage } from '../src/app.po';
import { browser, logging, element, by } from 'protractor';

describe('test landing page login form', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('get login button', () => {
    page.navigateTo();
    expect(page.getLoginButton().getText()).toEqual('Login');
  });

  it('click login button, open login form', () =>{
    page.navigateTo();
    page.getLoginButton().click();
    expect(element(by.id("login-modal-modal-title")).getText()).toEqual('Login');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});