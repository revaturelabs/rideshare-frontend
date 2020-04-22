
describe('User logged in Driver-list tests', function(){
    // these are html elements for reference during testing
   //beginning of elements for the login
   // these are html elements for reference during testing
    //beginning of elements for the login
    let elLoginButton = element(by.xpath('/html/body/app-root/app-home-page/div[1]/div/div/button[1]'));
   // /html/body/app-root/app-home-page/div[1]/div/div/button[1]
    let elLoginUsername = element(by.xpath('//*[@id="formGroupExampleInput"]'));
    let elLoginPassword = element(by.xpath('//*[@id="formGroupExampleInput2"]'));
    let elLoginSubmit = element(by.xpath('//*[@id="sign-in-btn"]'));
    let elLoggedInHeader = element(by.xpath('//*[@id="navbarDropdown"]/span'));
    //beginning of elements for the page tests
   let elDriverSortNameBtn = element(by.xpath('/html/body/app-root/app-driver-list/div/div/div[2]/div/table/thead/tr/th[1]/div/button'));
   let elDriverListNames = element(by.xpath('/html/body/app-root/app-driver-list/div/div/div[2]/div/table/tbody/tr[1]/td[1]'));
   let elDriverSortDistBtn = element(by.xpath('/html/body/app-root/app-driver-list/div/div/div[2]/div/table/thead/tr/th[2]/div/button'));
   let elDriverListDist = element(by.xpath('/html/body/app-root/app-driver-list/div/div/div[2]/div/table/tbody/tr[1]/td[2]'));
   let elDriverSortDurBtn = element(by.xpath('/html/body/app-root/app-driver-list/div/div/div[2]/div/table/thead/tr/th[4]/div/button'));
   let elDriverListDur = element(by.xpath('/html/body/app-root/app-driver-list/div/div/div[2]/div/table/tbody/tr[1]/td[4]'));
   let elDriverViewBtn = element(by.xpath('/html/body/app-root/app-driver-list/div/div/div[2]/div/table/tbody/tr[1]/td[5]/button'));
   let elDriverModalName = element(by.xpath('//*[@id="modal21"]/div/div/div[2]/h1'));
   let elDriverModalClose = element(by.xpath('//*[@id="modal21"]/div/div/div[1]/button/span'));
   let elDriverFilterSeats = element(by.xpath('/html/body/app-root/app-driver-list/div/div/div[1]/div/form/div[1]/input'));
   let elDriverFilterDist = element(by.xpath('/html/body/app-root/app-driver-list/div/div/div[1]/div/form/div[2]/input'));
   let elDriverFilterDur = element(by.xpath('/html/body/app-root/app-driver-list/div/div/div[1]/div/form/div[3]/input'));

   let elDriverTabSelect = element(by.xpath('/html/body/app-root/app-navbar/nav/div/ul/li[2]/a/span'));

    //Start of Recommended Drivers
    let elDriverRecAccordian = element(by.xpath('/html/body/app-root/app-driver-list/app-driver-recommendation/div/div/div/div[1]/a'));
    let elDriverRecModalOpen = element(by.xpath('/html/body/app-root/app-driver-list/app-driver-recommendation/div/div/div/div[2]/div/div/div[1]/button'));
    let elDriverRecModalClose = element(by.xpath('/html/body/app-root/app-driver-list/app-driver-recommendation/div/div/div/div[2]/div/div/div[1]/div[3]/div/div/div/div[1]/button'));
    let elDriverRecModalName = element(by.xpath('/html/body/app-root/app-driver-list/app-driver-recommendation/div/div/div/div[2]/div/div/div[1]/div[3]/div/div/div/div[2]/h1'));

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
        browser.ignoreSynchronization=true;
        browser.waitForAngular();
        browser.driver.sleep(500);
        expect(elLoggedInHeader.getText()).toBe('Fabien Braunroth');

        elDriverTabSelect.click();

    });
   /*----------------------------------------------------------------------------------------------

   checks to make sure that the driver button takes the user to the nearby drivers page on a larger screen
   change when the front end is being hosted
    */

   //Checks to make sure that sorting button is working
   it('User Presses the header buttons and table sorts by first name, distance, and duration', function(){
       browser.waitForAngular();
       //browser.ignoreSynchronization=true
       browser.driver.manage().window().setSize(xComp,y);
       browser.driver.sleep(8000);
       elDriverSortNameBtn.click();
       //after one click of name to sort by data in tr[1]/td[1] should be Cissy Geertz
       expect(elDriverListNames.getText()).toBe("Cissy Geertz");
       elDriverSortNameBtn.click();
       //second click should give result of Wynne Matissoff as first name on list
       expect(elDriverListNames.getText()).toBe("Wynne Matissoff");
       //distance and duration of Wynne Matissoff
       expect(elDriverListDist.getText()).toBe("204 mi");
       expect(elDriverListDur.getText()).toBe("3 hours 23 mins");

       //sort by distance
       elDriverSortDistBtn.click();
       expect(elDriverListDist.getText()).toBe("1 ft");

       //sort by duration (press twice so it is a different result since distance and time are related)
       elDriverSortDurBtn.click();
       elDriverSortDurBtn.click();
       expect(elDriverListDur.getText()).toBe("18 hours 18 mins");
   });

   //check that the modal button is workng. It will be sorted so first user in list
   //will be Lynn Ozintsev
   it("User Presses the view button on the table and the modal is correct", function(){
        
        browser.waitForAngular();
        //click on view modal
        elDriverViewBtn.click();
        expect(elDriverModalName.getText()).toBe("Lynn Ozintsev");
        //close the modal
        elDriverModalClose.click();

   });

    //check that the filtering is working
    it("User Enters 3 for filtering the seats", function () {

        browser.waitForAngular();
        //input 3 for filtering seats
        elDriverFilterSeats.clear();
        elDriverFilterDur.clear();
        elDriverFilterDist.clear();
        elDriverFilterSeats.sendKeys(protractor.Key.NUMPAD3);
        browser.driver.sleep(500);
        expect(elDriverListNames.getText()).toBe("Lynn Ozintsev");
    });

        //Check to see if recommended driver modal is working and displaying correct information
    //Default Login
    //User name: fbraunroth2
    it("User clicks on Recommended Driver Modal", function() {
        
        browser.waitForAngular();
        //click to open modal
        elDriverRecModalOpen.click();

        //Look to Display the Correct Name
        expect(elDriverRecModalName.getText()).toBe("Salvidor Migheli");

        //click to close the modal
        elDriverRecModalClose.click();

    });
    
    //Check to see if recommended driver accordian shows and hides
    it("User clicks on Recommended Driver Accordian", function() {

        var elAccordian = element(by.id('accordionEx'));

        browser.waitForAngular();
        
        //Find the default setting
        expect(elAccordian.isPresent.toBeTruthy);
        
        //Click to hide the information
        elDriverRecAccordian.click();

        //Find the new setting
        expect(elAccordian.isPresent.toBeFalsy);

        //Click to show the information
        elDriverRecAccordian.click();

        //Ensure it opens back up
        expect(elAccordian.isPresent.toBeTruthy);

    });


});