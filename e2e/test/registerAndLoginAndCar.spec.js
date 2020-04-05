
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
    let userDropdown = element(by.id('user-dropa'));
    let profileOption = element(by.className('dropdown-item'));
    let carInfoButton = element(by.id('carInfo'));
    let carYear = element(by.id('year'));
    let carMake = element(by.id('make'));
    let carModel = element(by.id('model'));
    let carSeats = element(by.id('Nrseats'));
    let carSave = element(by.id('save'));
    let elLogoutButton = element(by.id('logout-btn')); 


    
    
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



        
    });


    it ('Logs in as new user', function() {
        browser.get('http://localhost:4200/'); 
        browser.sleep(500);                                     //Nav
        elLoginButton.click();                                 //Click signup button
        LoginUserNameInput.sendKeys('tUser');                        //input 'tUser' as username
        elSignInButton.click();
        browser.sleep(500);                                     //Nav
        expect(elUserBorder.getText()).toEqual('test user');


 
    });

    it ('Adds a new car to the DB', function() {

        //create the car
        browser.get('http://localhost:4200/'); 
        browser.sleep(500);                                     //Nav
        elLoginButton.click();                                 //Click signup button
        LoginUserNameInput.sendKeys('tUser');                        //input 'tUser' as username
        elSignInButton.click();
        browser.sleep(500);                                     //Nav
        browser.sleep(500);                                     //Nav
        userDropdown.click();
        profileOption.click();
        browser.sleep(500);                                     //Nav
        carInfoButton.click();
        browser.sleep(500);                                     //Nav
        carYear.sendKeys('2020');
        carMake.sendKeys('Testla');
        carModel.sendKeys('Test');
        carSeats.click();
        browser.actions().sendKeys(protractor.Key.DOWN).perform();
        browser.actions().sendKeys(protractor.Key.DOWN).perform();
        browser.actions().sendKeys(protractor.Key.DOWN).perform();
        browser.actions().sendKeys(protractor.Key.DOWN).perform();
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.sleep(500);                                     //Nav
        carSave.click();
        userDropdown.click();
        elLogoutButton.click();

        //Log back in and make sure the car info is there.
        browser.get('http://localhost:4200/'); 
        browser.sleep(500);                                     //Nav
        elLoginButton.click();                                 //Click signup button
        LoginUserNameInput.sendKeys('tUser');                        //input 'tUser' as username
        elSignInButton.click();
        browser.sleep(500);                                     //Nav
        userDropdown.click();
        profileOption.click();
        browser.sleep(500);                                     //Nav
        carInfoButton.click();
        browser.sleep(500);                                     //Nav
 
    });
});

