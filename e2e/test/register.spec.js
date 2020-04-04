
describe('Sign Up tests', function(){
    let elSignUpButton = element(by.id('signUpBtn'));
    let elLoginButton = element(by.id('loginBtn')); 
    let elSignInButton = element(by.id('sign-in-btn'));
    let elSignUpHeader = element(by.className('modal-title')); 
    let elUserBorder = element(by.id('name'));
    let LoginUserNameInput = element(by.id('formGroupExampleInput'));
    let firstNameInput = element(by.id('firstname'));
    let lastNameInput = element(by.id('lastname'));
    let usernameInput = element(by.id('userName'));
    let emailInput = element(by.id('email'));
    let phoneInput = element(by.id('phoneNumber'));
    let batchInput = element(by.id('state'));
    let batchLocation = element(by.name('batchLocation'));
    let addressInput = element(by.id('autocomplete'));
    let riderOption = element(by.id('riderReg'));
    let submitBtn = element(by.id('submit'));
    let modalClose = element(by.className('close pull-right'));
    
    
    it('Sign up link on home page opens Sign up modal', function() {
        browser.get('http://localhost:4200/');
        elSignUpButton.click();
        expect(elSignUpHeader.getText()).toEqual('Sign Up');
    });

    it ('Registers a new user', function() {
        browser.get('http://localhost:4200/'); 
        browser.sleep(500);       
        elSignUpButton.click();                                 //Click signup button
        riderOption.click();

        firstNameInput.sendKeys('test');                        //input 'test' as firstname
        lastNameInput.sendKeys('user');                         //input 'user' as lastname
        emailInput.sendKeys('test.user@gmail.com');             //input 'test.user@gmail.com' as email address
        phoneInput.sendKeys('111-222-3333');                    //input '111-222-3333' as phone number
        usernameInput.sendKeys('tUser');                        //input 'tUser' as username
        batchInput.click();                                     //Open drop down list
        batchLocation.click();                                  //Just click first option
        addressInput.sendKeys('500 Koehler Dr, Morgantown');
        browser.sleep(500);
        browser.actions().sendKeys(protractor.Key.DOWN).perform();
        browser.actions().sendKeys(protractor.Key.ENTER).perform();

        browser.sleep(500);

        browser.actions().sendKeys(protractor.Key.ENTER).perform();

        browser.sleep(10000);


        
    });


    it ('Logs in as new user', function() {
        browser.get('http://localhost:4200/'); 
        browser.sleep(500);                                     //Nav
        elLoginButton.click();                                 //Click signup button
        LoginUserNameInput.sendKeys('tUser');                        //input 'tUser' as username
        elSignInButton.click();
        browser.sleep(500);                                     //Nav
        expect(elUserBorder.getText()).toEqual('test user');
        browser.sleep(10000);                                     //Nav


 
    });
});

