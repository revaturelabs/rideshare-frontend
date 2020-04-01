import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }

  getLoginButton() {
    return element(by.id("home-page-login-btn"));
  }

  getLoginFormLoginButton() {
    return element(by.id("sign-in-btn"));
  }

  /*
  * nav buttons
  */
  getNavDropDown() {
    return element(by.id("navbarDropdown"));
  }
  getNavProfileA() {
    return element(by.id("nav-profile-a"));
  }
  getNavLogoutA() {
    return element(by.id("nav-logout-a"));
  }

  /*
  * profile page elements
  */
  getProfileGroupedContactInfoBtn() {
    return element(by.id("grouped-contact-info-btn"));
  }
  getProfileGroupedLocationBtn() {
    return element(by.id("grouped-location-btn"));
  }
  getProfileGroupedMembershipBtn() {
    return element(by.id("grouped-membership-btn"));
  }
  getProfileGroupedCarInfoBtn() {
    return element(by.id("grouped-car-info-btn"));
  }

  /*
  * profile page - container elements
  */
  getProfileContainerTitle() {
    return element(by.id("profile-container-title"));
  }
}
