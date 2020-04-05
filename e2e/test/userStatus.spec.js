
describe('Sign Up tests', function(){
    let LoginUserNameInput = element(by.id('formGroupExampleInput'));
    let elLoginButton = element(by.id('loginBtn')); 
    let elSignInButton = element(by.id('sign-in-btn'));
    let riderOrDriver = element(by.id('rider')); 
    let activeOrInactive = element(by.id('active'));
    let userDropdown = element(by.id('user-dropa'));
    let profileOption = element(by.className('dropdown-item'));
    let membershipButton = element(by.id('membership'));
    let elLogoutButton = element(by.id('logout-btn')); 
    let saveStatus = element(by.id('save')); 


  
    
    

    it ('Changes Status to Rider', function() {
        browser.get('http://localhost:4200/'); 
        browser.sleep(500);                                     //Nav
        elLoginButton.click();                                 //Click signup button
        LoginUserNameInput.sendKeys('tcurd9');                        //input 'tUser' as username
        elSignInButton.click();
        browser.sleep(500);                                     //Nav
        userDropdown.click();
        profileOption.click();
        browser.sleep(500);                                     //Nav
        membershipButton.click();
        browser.sleep(500);
        riderOrDriver.click();
        browser.actions().sendKeys(protractor.Key.DOWN).perform();
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        saveStatus.click();
        userDropdown.click();
        elLogoutButton.click();

          
    });

    it ('Changes Status to Driver', function() {
        browser.get('http://localhost:4200/'); 
        browser.sleep(500);                                     //Nav
        elLoginButton.click();                                 //Click signup button
        LoginUserNameInput.sendKeys('tcurd9');                        //input 'tUser' as username
        elSignInButton.click();
        browser.sleep(500);                                     //Nav
        userDropdown.click();
        profileOption.click();
        browser.sleep(500);                                     //Nav
        membershipButton.click();
        browser.sleep(500);
        riderOrDriver.click();
        browser.actions().sendKeys(protractor.Key.UP).perform();
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        saveStatus.click();
        userDropdown.click();
        elLogoutButton.click();

          
    });

    it ('Changes Status to Disabled', function() {
        browser.get('http://localhost:4200/'); 
        browser.sleep(500);                                     //Nav
        elLoginButton.click();                                 //Click signup button
        LoginUserNameInput.sendKeys('tcurd9');                        //input 'tUser' as username
        elSignInButton.click();
        browser.sleep(500);                                     //Nav
        userDropdown.click();
        profileOption.click();
        browser.sleep(500);                                     //Nav
        membershipButton.click();
        browser.sleep(500);
        activeOrInactive.click();
        browser.actions().sendKeys(protractor.Key.DOWN).perform();
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        saveStatus.click();
        userDropdown.click();
        elLogoutButton.click();

          
    });

    it ('Changes Status to Active', function() {
        browser.get('http://localhost:4200/'); 
        browser.sleep(500);                                     //Nav
        elLoginButton.click();                                 //Click signup button
        LoginUserNameInput.sendKeys('tcurd9');                        //input 'tUser' as username
        elSignInButton.click();
        browser.sleep(500);                                     //Nav
        userDropdown.click();
        profileOption.click();
        browser.sleep(500);                                     //Nav
        membershipButton.click();
        browser.sleep(500);
        activeOrInactive.click();
        browser.actions().sendKeys(protractor.Key.UP).perform();
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        saveStatus.click();
        userDropdown.click();
        elLogoutButton.click();

          
    });
});

