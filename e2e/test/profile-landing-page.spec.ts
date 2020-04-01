import { AppPage } from '../src/app.po';
import { browser, logging, element, by } from 'protractor';

describe('test landing page login form', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('login as user and navigate to profile landing page, profile container loaded', () => {
    browser.driver.manage().window().setSize(1800,720);
    page.navigateTo();
    page.getLoginButton().click();
    element(by.id("login-form-username-input")).sendKeys("wviani");
    page.getLoginFormLoginButton().click();
    browser.waitForAngularEnabled(false);
    page.getNavDropDown().click();
    page.getNavProfileA().click();
    expect(element(by.id("profile-container")).isPresent()).toBe(true);
  });

  it('contact information button loaded', () => {
    expect(page.getProfileGroupedContactInfoBtn().getText()).toEqual("Contact Information");
  });

  it('location button loaded', () => {
    expect(page.getProfileGroupedLocationBtn().getText()).toEqual("Location");
  });

  it('membership button loaded', () => {
    expect(page.getProfileGroupedMembershipBtn().getText()).toEqual("Membership");
  });

  it('car inoformation button loaded', () => {
    expect(page.getProfileGroupedCarInfoBtn().getText()).toEqual("Car Information");
  });

  it('contact information view loaded by default', () => {
    expect(page.getProfileContainerTitle().getText()).toEqual("Contact Information:");
  });

  it('clicking the location button loads the location view', () => {
    page.getProfileGroupedLocationBtn().click();
    expect(page.getProfileContainerTitle().getText()).toEqual("Location:");
  });

  it('clicking the membership button loads the membership view', () => {
    page.getProfileGroupedMembershipBtn().click();
    expect(page.getProfileContainerTitle().getText()).toEqual("Membership:");
  });

  it('clicking car information button loads the car information view', () => {
    page.getProfileGroupedCarInfoBtn().click();
    expect(page.getProfileContainerTitle().getText()).toEqual("Car Information:");
  });

  it('clicking the contact information button returns to the contact information view', () => {
    page.getProfileGroupedContactInfoBtn().click();
    expect(page.getProfileContainerTitle().getText()).toEqual("Contact Information:");
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});