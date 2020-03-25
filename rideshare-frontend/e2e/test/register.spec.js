
describe('Sign Up tests', function(){
    let elSignUpLink = element(by.xpath('//*[@id="login-form"]/p/a/signupmodal/a'));
    let elRegisterHeader = element(by.xpath('/html/body/modal-container/div/div/div[1]/h4'));
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
        browser.get('http://http://54.174.82.153:4200/login');
        elSignUpLink.click();
        expect(elRegisterHeader.getText()).toBe('Sign Up');
    });

    it ('After submit routes to landing page', function() {
        browser.get('http://http://54.174.82.153:4200/login');
        elSignUpLink.click();
    });
});