describe('landing page tests', function(){
    let elPageHead = element(by.xpath('/html/body/app-root/app-home-page/div[1]/div/h1'));
    let elLoginPageTitle = element(by.xpath('//*[@id="login-form"]/div[2]/label'));
    let elLoginButton = element(by.xpath('/html/body/app-root/app-home-page/div[1]/div/div/button[1]'));
    let elRegisterButton = element(by.xpath('/html/body/app-root/app-home-page/div[1]/div/div/button[2]'));
    let elRegisterHeader = element(by.xpath('/html/body/modal-container/div/div/div[1]/h4'));

    it('Make sure user is on the landing page', function(){
        browser.get('http://localhost:4200/');
        expect(elPageHead.getText()).toBe('RideForce');
    });

    it('User Presses the login button and goes to the login page', function(){
        browser.get('http://localhost:4200/');
        elLoginButton.click();
        expect(elLoginPageTitle.getText()).toBe('Username');
    });

    it('User Presses the Register Button and goes to the sign up modal', function(){
        browser.get('http://localhost:4200/');
        elRegisterButton.click();
        expect(elRegisterHeader.getText()).toBe('Sign Up');
    });
});