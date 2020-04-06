
describe('Sign Up tests', function(){
    let elLoginButton = element(by.id('loginBtn')); 
    let elSignInButton = element(by.id('sign-in-btn'));
    let elSignUpHeader = element(by.className('modal-title')); 
    let elUserBorder = element(by.id('name'));
    let LoginUserNameInput = element(by.id('formGroupExampleInput'));
    let sameOfficeBox = element(by.className('custom-control custom-checkbox'));
    let customRange = element(by.id('customRange3'));
    let usernameInput = element(by.id('userName'));
    let emailInput = element(by.id('email'));
    let phoneInput = element(by.id('phoneNumber'));
    let batchInput = element(by.id('state'));
    let batchLocation = element(by.name('batchLocation'));
    let addressInput = element(by.id('autocomplete'));
    let riderOption = element(by.id('riderReg'));
    let submitBtn = element(by.id('submit'));
    let modalClose = element(by.className('close pull-right'));
    
    

    it ('Unchecks same office box', function() {
        browser.get('http://localhost:4200/'); 
        browser.sleep(500);                                     //Nav
        elLoginButton.click();                                 //Click signup button
        LoginUserNameInput.sendKeys('tcurd9');                        //input 'tUser' as username
        elSignInButton.click();
        browser.sleep(500);                                     //Nav
        sameOfficeBox.click();
        browser.sleep(1000);                                     //Nav
        browser.actions().dragAndDrop(
            customRange,
            {x:100, y:0}
        ).perform();
        browser.sleep(1000);                                     //Nav



    });
});

