
describe('Sign Up tests', function(){
    let elSignUpLink = element(by.xpath('/html/body/app-root/app-home-page/div[1]/div/div/button[2]'));
    let elRegisterHeader = element(by.xpath('/html/body/modal-container/div/div/div[1]/h4'));
    let elClose = element(by.xpath('/html/body/modal-container/div/div/div[1]/button'));
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
        expect(elRegisterHeader.getText()).toBe('Sign Up');
        elClose.click();
    });

    // it ('close sign up modal', function() {
    //     //browser.get('http://localhost:4200/login');
    //     elClose.click();
    // });
});