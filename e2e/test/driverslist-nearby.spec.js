describe('View Nearby Drivers\'s Info', function(){
    let elLoginButton = element(by.id('loginBtn')); 
    let loginUserNameInput = element(by.id('formGroupExampleInput'));
    let elSignInButton = element(by.id('sign-in-btn'));
    let elUserBorder = element(by.id('name'));
    let sortDistanceHeader = element(by.id('distanceColumn'));
    let viewInfoBtn = element(by.xpath("//tbody[@id='output']/tr[1]//button[@class='btn btn-primary']"));

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

    it('clicks view info on the nearest driver', function(){
        // Clicks to sort table by distance
        sortDistanceHeader.click();
        browser.sleep(1000);
        // Clicks to open info modal of first driver
        viewInfoBtn.click();
        browser.sleep(500);
        // Checks to see if the open modal is Tobe Curd's (id 10)
        expect(element(by.id('exampleModalCentered10')).isDisplayed()).toBe(true);
    });
});