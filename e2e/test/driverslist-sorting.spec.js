describe('Sorting the Driver\'s List', function(){
    let elLoginButton = element(by.id('loginBtn')); 
    let loginUserNameInput = element(by.id('formGroupExampleInput'));
    let elSignInButton = element(by.id('sign-in-btn'));
    let elUserBorder = element(by.id('name'));
    let sortNameHeader = element(by.id('nameColumn'));
    let firstDriverName = element(by.css('tbody#output > tr:nth-of-type(1) > td:nth-of-type(1)'));

    it('logs in', function(){
        browser.get('http://localhost:4200/');
        elLoginButton.click();
        loginUserNameInput.sendKeys('tcurd9');
        elSignInButton.click();
        browser.sleep(2000);
        expect(elUserBorder.getText()).toEqual('Tobe Curd');
    });

    it('clicks sort by name and', function(){
        sortNameHeader.click();
        browser.sleep(1000);
        expect(firstDriverName.getText()).toEqual('Dobe Durd');
    });
});