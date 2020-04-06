describe('User can update their contact information', function () {
    let elLoginButton = element(by.id('loginBtn'));
    let loginUserNameInput = element(by.id('formGroupExampleInput'));
    let elSignInButton = element(by.id('sign-in-btn'));
    let elUserBorder = element(by.id('name'));
    let userDropdown = element(by.id('user-dropa'));
    let profileOption = element(by.className('dropdown-item'));
    let contactOption = element(by.id('contactInfo'));
    let firstNameInput = element(by.id('f_name'));
    let lastNameInput = element(by.id('l_name'));
    let emailInput = element(by.id('user_email'));
    let phoneInput = element(by.id('phone'));
    let saveBtn = element(by.id('save'));



    it('logs in', function(){
        // Start the test at the homepage
        browser.get('http://localhost:4200/');
        //maximize window so I don't have to deal with bootstrap dropdown
        browser.manage().window().maximize();
        // Click the Login button
        elLoginButton.click();
        // Type the username into the Username input
        loginUserNameInput.sendKeys('gpichmann0');
        // Click the button to Login with the info
        elSignInButton.click();
        browser.sleep(2000);
        // Check that the name of the logged in user is Grady Pichmann
        expect(elUserBorder.getText()).toEqual('Grady Pichmann');
    });

    it ('updates the contact information of a user', function() {
        // Navigate to contact information page of the user's profile
        userDropdown.click();
        profileOption.click();
        contactOption.click();
        browser.sleep(500);
        // Fill out current contact information with the information below
        firstNameInput.clear();
        firstNameInput.sendKeys('Ren');
        lastNameInput.clear();
        lastNameInput.sendKeys('Amamiya');
        emailInput.clear();
        emailInput.sendKeys('joker@persona.com');
        phoneInput.clear();
        phoneInput.sendKeys('555-555-5555');
        // Click save to update info
        saveBtn.click();
        // Check that the message is 'Updated Successfully!'
        browser.sleep(500);
        expect(element(by.id('successText')).getText()).toEqual('Updated Successfully!');
    });

});