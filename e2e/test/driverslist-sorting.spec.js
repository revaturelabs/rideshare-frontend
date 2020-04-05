describe('Sorting the Driver\'s List', function(){
    let elLoginButton = element(by.id('loginBtn')); 
    let loginUserNameInput = element(by.id('formGroupExampleInput'));
    let elSignInButton = element(by.id('sign-in-btn'));
    let elUserBorder = element(by.id('name'));
    let sortNameHeader = element(by.id('nameColumn'));
    let sortDistanceHeader = element(by.id('distanceColumn'));
    let sortTimeHeader = element(by.id('timeColumn'));
    let sortSeatHeader = element(by.id('seatsColumn'));
    let firstDriverName = element(by.css('tbody#output > tr:nth-of-type(1) > td:nth-of-type(1)'));

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

    it('clicks sort by name', function(){
        // Click the Name header to sort by name
        sortNameHeader.click();
        browser.sleep(1000);
        // Check that the first driver's name in the table is Dobe Durd
        expect(firstDriverName.getText()).toEqual('Dobe Durd');
    });

    it('clicks sort by distance', function(){
        // Click the Distance header to sort by distance
        sortDistanceHeader.click();
        browser.sleep(1000);
        // Check that the first driver's name in the table is Tobe Curd
        expect(firstDriverName.getText()).toEqual('Tobe Curd');
    });

    it('clicks sort by time', function(){
        // Click the Time header to sort by time
        sortTimeHeader.click();
        browser.sleep(1000);
        // Check that the first driver's name in the table is Tobe Curd
        expect(firstDriverName.getText()).toEqual('Tobe Curd');
    });

    it('clicks sort by seats', function(){
        // Click the Seats header to sort by seats
        sortSeatHeader.click();
        browser.sleep(1000);
        // Check that the first driver's name in the table is Sobe Burd
        expect(firstDriverName.getText()).toEqual('Sobe Burd');
    });
});