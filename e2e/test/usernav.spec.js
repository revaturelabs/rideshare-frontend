describe('User logged in nav bar tests', function(){
    //beginning of elements for the login
    let elLoginButton = element(by.xpath('/html/body/app-root/app-home-page/div[1]/div/div/button[1]'));
    let elLoginUsername = element(by.xpath('//*[@id="formGroupExampleInput"]'));
    let elLoginPassword = element(by.xpath('//*[@id="formGroupExampleInput2"]'));
    let elLoginSubmit = element(by.xpath('//*[@id="sign-in-btn"]'));
    let elLoggedInHeader = element(by.xpath('//*[@id="navbarDropdown"]/span'));
    //beginning of elements for the page tests
    let elProfileDrop = element(by.xpath('//*[@id="navbarDropdown"]'));
    let elSearchButton = element(by.xpath('//*[@id="navbarSupportedContent"]/ul/li[1]/a'));
    let elSearchHeader = element(by.xpath('/html/body/app-root/app-landing-page/div/h1'));
    let elHamburger = element(by.xpath('/html/body/app-root/app-navbar/nav/button'));
    let elDriverButton = element(by.xpath('//*[@id="navbarSupportedContent"]/ul/li[2]/a'));
    let elDriverHeader = element(by.xpath('/html/body/app-root/app-driver-list/div/div/div[1]/h4'));
    let elProfileButton = element(by.xpath('//*[@id="navbarSupportedContent"]/ul/li[3]/div/a[1]'));
    let elProfileHeader = element(by.xpath('/html/body/app-root/app-profile/div/div/div[2]/app-profile-contact/div/div[1]/label'));
    let elLogoutButton = element(by.xpath('//*[@id="logout-btn"]'));
    let elHomeHeader = element(by.xpath('/html/body/app-root/app-home-page/div[1]/div/h1'));
    //End of xpaths needed for tests
    let xComp = 1800;
    let y = 720;
    let xPhone = 800;

    //checks to make sure that the login button reroutes to the correct modal
    //change when the front end is being hosted
    it('User Presses the login button and signs in as the logged in user', function(){
        browser.driver.manage().window().setSize(xComp,y);
        elLoginButton.click();
        //These are based off of dummy data currently. Change if desired
        elLoginUsername.sendKeys('fbraunroth2');
        elLoginPassword.sendKeys('password');
        elLoginSubmit.click();
        //change this to reflect succesful login
        expect(elLoggedInHeader.getText()).toBe('Fabien Braunroth');
    });

    /*----------------------------------------------------------------------------------------------

    checks to make sure that the driver button takes the user to the nearby drivers page on a larger screen
    change when the front end is being hosted
    */
    it('User Presses the Driver Button and goes to the driver page on a laptop', function(){
        browser.waitForAngular();
        browser.ignoreSynchronization=true
        elDriverButton.click();
        //enter expected toBe text when information is gained
        expect(elDriverHeader.getText()).toBe("Driver's List");
    });

    //checks to make sure that the driver button takes the user to the nearby drivers page on a smaller screen
    //change when the front end is being hosted
    it('User Presses the Driver Button and goes to the driver page on a phone', function(){
        browser.driver.manage().window().setSize(xPhone,y);
        browser.waitForAngular();
        browser.ignoreSynchronization=true
        elHamburger.click();
        browser.driver.sleep(500);
        elDriverButton.click();
        //enter expected toBe text when information is gained
        expect(elDriverHeader.getText()).toBe("Driver's List");
    });

    /*----------------------------------------------------------------------------------------------

    checks to make sure that the search button takes the user to the search drivers page on a larger screen
    change when the front end is being hosted
    */
    it('User Presses the Search Button and goes to the driver search page on a laptop', function(){
        browser.waitForAngular();
        browser.ignoreSynchronization=true
        browser.driver.manage().window().setSize(xComp,y);
        elSearchButton.click();
        expect(elSearchHeader.getText()).toBe('Revature RideForce');
    });

    //checks to make sure that the search button takes the user to the search drivers page on a smaller screen
    //change when the front end is being hosted
    it('User Presses the Search Button and goes to the driver search page on a phone', function(){
        browser.waitForAngular();
        browser.ignoreSynchronization=true
        browser.driver.manage().window().setSize(xPhone,y);
        elHamburger.click();
        browser.driver.sleep(500);
        elSearchButton.click();
        expect(elSearchHeader.getText()).toBe('Revature RideForce');
    });

    /*-----------------------------------------------------------------------------------------

    checks to make sure that the profile button takes the user to the profile page on a larger screen
    change when the front end is being hosted
    */
    it('User Presses the Profile button and goes to the Profile page on a laptop', function(){
        browser.waitForAngular();
        browser.ignoreSynchronization=true
        browser.driver.manage().window().setSize(xComp,y);
        elProfileDrop.click();
        browser.waitForAngular();
        browser.ignoreSynchronization=true
        elProfileButton.click();
        //enter expected toBe text when information is gained
        expect(elProfileHeader.getText()).toBe('First Name:');
    });

    //checks to make sure that the profile button takes the user to the profile page on a smaller screen
    //change when the front end is being hosted
    it('User Presses the Profile Button and goes to the Profile page on a phone', function(){
        browser.waitForAngular();
        browser.ignoreSynchronization=true
        browser.driver.manage().window().setSize(xPhone,y);
        elHamburger.click();
        browser.driver.sleep(500);
        elProfileDrop.click();
        elProfileButton.click();
        //enter expected toBe text when information is gained
        expect(elProfileHeader.getText()).toBe('First Name:');
    });

    /*-----------------------------------------------------------------------------------------

    checks to make sure that the logout button returns to the homescreen
    change when the front end is being hosted
    */
    it('User Presses the Logout Button and goes to the Home page on a laptop', function(){
        browser.waitForAngular();
        browser.ignoreSynchronization=true
        // browser.driver.manage().window().setSize(xComp,y);
        elProfileDrop.click();
        browser.waitForAngular();
        browser.ignoreSynchronization=true
        elLogoutButton.click();
        //enter expected toBe text when information is gained
        expect(elHomeHeader.getText()).toBe('RideForce');
    });
});