/*
Testing the landing page of the application to ensure buttons work as intended
*/
describe('landing page tests', function(){
    let elPageHead = element(by.xpath('/html/body/app-root/app-home-page/div[1]/div/h1'));
    let elLoginPageTitle = element(by.xpath('//*[@id="login-form"]/div[1]/h4'));
    let elLoginButton = element(by.xpath('/html/body/app-root/app-home-page/div[1]/div/div/button[1]'));
    let elRegisterButton = element(by.xpath('/html/body/app-root/app-home-page/div[1]/div/div/button[2]'));
    let elRegisterHeader = element(by.xpath('/html/body/modal-container/div/div/div[1]/h4'));
    

    //checks to make sure that the user reaches the landing page correctly
    //change when the front end is being hosted
    it('Make sure user is on the landing page', function(){
        browser.get('http://localhost:4200/');
        expect(elPageHead.getText()).toBe('RideForce');
    });

    //checks to make sure that the login button reroutes to the correct modal
    //change when the front end is being hosted
    it('User Presses the login button and goes to the login modal', function(){
        browser.get('http://localhost:4200/');
        elLoginButton.click();
        expect(elLoginPageTitle.getText()).toBe('Login');
    });

    //checks to make sure that the register button opens the modal for signup
    //change when the front end is being hosted
    it('User Presses the Register Button and goes to the sign up modal', function(){
        browser.get('http://localhost:4200/');
        elRegisterButton.click();
        expect(elRegisterHeader.getText()).toBe('Sign Up');
    });
});