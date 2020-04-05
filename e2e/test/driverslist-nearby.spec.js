describe('View Nearby Drivers\'s Info', function(){
    let elLoginButton = element(by.id('loginBtn')); 
    let loginUserNameInput = element(by.id('formGroupExampleInput'));
    let elSignInButton = element(by.id('sign-in-btn'));
    let elUserBorder = element(by.id('name'));
    let viewInfoBtn = element(by.xpath("//tbody[@id='output']/tr[1]//button[@class='btn btn-primary']"));

    it('logs in', function(){
        browser.get('http://localhost:4200/');
        elLoginButton.click();
        loginUserNameInput.sendKeys('tcurd9');
        elSignInButton.click();
        browser.sleep(2000);
        expect(elUserBorder.getText()).toEqual('Tobe Curd');
    });

    it('clicks view info on the nearest driver', function(){
        viewInfoBtn.click();
        browser.sleep(500);
        expect(element(by.id('exampleModalCentered27')).isDisplayed()).toBe(true);
    });
});