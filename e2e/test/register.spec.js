describe('Sign Up tests', function() {
    // let elSignUpLink = element(by.xpath('//*[@id="login-form"]/p/a/signupmodal/a'));
    let elSignUpLink = element(by.id('home-page-sign-up-btn'));
    // let elRegisterHeader = element(by.xpath('/html/body/modal-container/div/div/div[1]/h4'));
    let elRegisterHeader = element(by.id('sign-up-modal-modal-title'));
    let firstNameInput
    let lastNameInput
    let usernameInput
    let emailInput
    let phoneInput
    let addressInput
    let cityInput
    let stateInput
    let zipCodeInput
    let driverRadio

    it('Sign up link on login page opens Sign up modal', function() {
        browser.get(browser.baseUrl);
        elSignUpLink.click();
        expect(elRegisterHeader.getText()).toBe('Sign Up');
    });

    it('After submit routes to landing page', function() {
        browser.get(browser.baseUrl);
        elSignUpLink.click();
    });
});