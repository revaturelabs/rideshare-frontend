describe('Sign Up tests', function(){
    // these are html elements for reference during testing
    let elSignUpLink = element(by.xpath('/html/body/app-root/app-home-page/div[1]/div/div/button[2]'));
    let elRegisterHeader = element(by.xpath('/html/body/modal-container/div/div/div[1]/h4'));
    let elClose = element(by.xpath('/html/body/modal-container/div/div/div[1]/button'));
    let elPageHead = element(by.xpath('/html/body/app-root/app-home-page/div[1]/div/h1'));
    // let firstNameInput
    // let lastNameInput
    // let usernameInput
    // let emailInput
    // let phoneInput
    // let addressInput
    // let cityInput
    // let stateInput
    // let zipCodeInput
    // let driverRadio
    
    it('Sign up link on login page opens Sign up modal', function() {
        browser.get('http://localhost:4200/');
        elSignUpLink.click();
        // browser.waitForAngular();
        // browser.ignoreSynchronization=true
        browser.driver.sleep(500);
        expect(elRegisterHeader.getText()).toBe('Sign Up');
    });

    it ('Close sign up modal', function() {
        elClose.click();
        expect(elPageHead.getText()).toBe('RideForce');

    });
});