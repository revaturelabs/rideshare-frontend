describe('User can Update Address', function () {
    let elLoginButton = element(by.id('loginBtn'));
    let loginUserNameInput = element(by.id('formGroupExampleInput'));
    let elSignInButton = element(by.id('sign-in-btn'));
    let elUserBorder = element(by.id('name'));
    let userDropdown = element(by.id('user-dropa'));
    let profileOption = element(by.className('dropdown-item'));
    let profileLocation = element(by.id('location'));
    let contactInfo = element(by.id('contactInfo'));
    let addressInput = element(by.id('autocomplete'));
    let saveBtn = element(by.id('save'));
    let address = element(by.id('address'));
    let city = element(by.id('locality'));
    let state = element(by.id('administrative_area_level_1'));
    let zipcode = element(by.id('postal_code'));


    it('check update address', function () {
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
        browser.sleep(1000);
        //dropdown
        userDropdown.click();
        //profile
        profileOption.click();
        browser.sleep(500);
        //profile location
        profileLocation.click();
        browser.sleep(500);
        //input this address in google api autocomplete object
        addressInput.sendKeys('500 Koehler Dr, Morgantown');
        browser.sleep(500);
        browser.actions().sendKeys(protractor.Key.DOWN).perform();
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.sleep(500);
        //save
        saveBtn.click();
        browser.sleep(2000);
        contactInfo.click();
        browser.sleep(500);
        profileLocation.click();
        browser.sleep(500);
        //check address values
        expect(address.getAttribute('value')).toEqual('500 Koehler Drive');
        expect(city.getAttribute('value')).toEqual('Morgantown');
        expect(state.getAttribute('value')).toEqual('WV');
        expect(zipcode.getAttribute('value')).toEqual('26508');


    });

});