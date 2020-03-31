describe('Logging in', function() {
    it("Testing the login", function(){
        //Opening of the startup page 
        browser.driver.get("http://localhost:4200/");
        browser.driver.manage().window().setSize(1056, 666);
        browser.driver.findElement(By.linkText("Login")).click();
        browser.driver.findElement(By.id("formGroupExampleInput")).sendKeys("wviani");
        browser.driver.findElement(By.id("formGroupExampleInput2")).sendKeys("password");
        browser.driver.findElement(By.id("sign-in-btn")).click();
        
        //Looking for the text displayed on the Search Button of the Drivers page
        let elDriverPageSearchButton = element(by.xpath('/html/body/app-root/app-driver-list/div[1]/button'));
        let text_function = elDriverPageSearchButton.getText(); 
        //console.log(text_function);        
        expect(text_function).toBe("Search");
    });
    
});