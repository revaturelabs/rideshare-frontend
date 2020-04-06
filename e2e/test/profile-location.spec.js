
describe('Sign Up tests', function(){
    let elLoginButton = element(by.id('loginBtn')); 
    let elSignInButton = element(by.id('sign-in-btn'));
    let elUserBorder = element(by.id('name'));
    let loginUserNameInput = element(by.id('formGroupExampleInput'));
    let userDropdown = element(by.id('user-dropa'));
    let profileOption = element(by.css('.dropdown-item:first-child'));
    let locationOption = element(by.css('.btn-group-vertical button:nth-child(2)'));
    let addressInput = element(by.id('autocomplete'));
    let updateParagraph = element(by.css('.mainContainer p:last-child'));

    it('logs in', function(){
        // Start the test at the homepage
        browser.get('http://localhost:4200/');
        // Click the Login button
        elLoginButton.click();
        // Type the username into the Username input
        loginUserNameInput.sendKeys('tcurd9');
        // Click the button to Login with the info
        elSignInButton.click();
        browser.sleep(2000);
        // Check that the name of the logged in user is Tobe Curd
        expect(elUserBorder.getText()).toEqual('Tobe Curd');
    });

    it ('Updates location', function() {
        // Navigate to Profile Location component
        userDropdown.click();
        profileOption.click();
        locationOption.click();
        browser.sleep(500);
        // Input address into autocomplete input field
        addressInput.sendKeys('500 Koehler Dr, Morgantown');
        browser.sleep(500);
        // Select the first result from drop down
        browser.actions().sendKeys(protractor.Key.DOWN).perform();
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.sleep(500);
        // Submit the update with Enter
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        // Check that the message is 'Updated Successfully!'
        expect(updateParagraph.getText()).toEqual('Updated Successfully!');
    });
});

