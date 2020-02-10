describe('User logged in nav bar tests', function(){
    let elSearchButton = element(by.xpath('//*[@id="navbarSupportedContent"]/ul/li[1]/a/span'));
    let elSearchHeader = element(by.xpath('/html/body/app-root/app-landing-page/div/h1'));
    let elHamburger = element(by.xpath('/html/body/app-root/app-navbar/nav/button'));
    let xComp = 1800;
    let y = 720;
    let xPhone = 800;

    //checks to make sure that the search button takes the user to the search drivers page on a larger screen
    //change when the front end is being hosted
    it('User Presses the Search Button and goes to the driver search page on a laptop', function(){
        browser.get('http://localhost:4200/');
        browser.driver.manage().window().setSize(xComp,y);
        elSearchButton.click();
        expect(elSearchHeader.getText()).toBe('Revature RideForce');
    });

    //checks to make sure that the search button takes the user to the search drivers page on a smaller screen
    //change when the front end is being hosted
    it('User Presses the Search Button and goes to the driver search page on a phone', function(){
        browser.get('http://localhost:4200/');
        browser.driver.manage().window().setSize(xPhone,y);
        elHamburger.click();
        browser.driver.sleep(500);
        elSearchButton.click();
        expect(elSearchHeader.getText()).toBe('Revature RideForce');
    });
});