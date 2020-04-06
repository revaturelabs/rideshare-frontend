/*
Testing the landing page of the application to ensure buttons work as intended
*/
describe('Updating car information', function(){
    let elLoginButton = element(by.id('loginBtn')); 
    let loginUserNameInput = element(by.id('formGroupExampleInput'));
    let elSignInButton = element(by.id('sign-in-btn'));
    let elUserBorder = element(by.id('name'));
    
    //Login in
    it('User Presses the login button and signs in', function(){
        browser.get('http://localhost:4200/');
        elLoginButton.click();
        loginUserNameInput.sendKeys('tcurd9');
        elSignInButton.click();
        browser.sleep(2000);
        expect(elUserBorder.getText()).toEqual('Tobe Curd');
    });

    it('User goes to profile -> car information and updates car information', function(){
        elUserBorder.click();
        element(by.id('profile')).click();
        element(by.id('carInfo')).click();
        //Clears current year input
        let year = element(by.id('year'));
        year.clear();
        element(by.id('year')).sendKeys('2020');
        //Clears current model input 
        let model = element(by.id('model'));
        model.clear();
        element(by.id('model')).sendKeys('AMG GT Coupe');
        // Clicks Save & check if updates successfully
        element(by.id('save')).click();
        browser.sleep(100);
        expect(element(by.id('success')).getText()).toEqual('Updated Successfully!');
    });
});