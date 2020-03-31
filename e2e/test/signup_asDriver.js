describe('E2E Testing: Signing up as Driver', function(){
    it('1. Signing up', function(){
        browser.driver.get("http://localhost:4200/");
        browser.driver.manage().window().setSize(1056, 666);
        browser.driver.findElement(By.linkText("Sign up")).click();
        browser.driver.findElement(By.id("firstname")).sendKeys("Jean Louis");
        browser.driver.findElement(By.id("lastname")).sendKeys("Macle");
        browser.driver.findElement(By.id("email")).sendKeys("jeanlouis@mail.com");
        browser.driver.findElement(By.id("phoneNumber")).sendKeys("3371230124");
        browser.driver.findElement(By.id("userName")).sendKeys("jlmacleE2E");        
        dropdown = browser.driver.findElement(By.css(".dropdown-item:nth-child(4)")).click();//USF Tampa
        browser.driver.findElement(By.id("hAddress")).sendKeys("12702 Bruce B Downs");
        browser.driver.findElement(By.id("hCityInput")).sendKeys("Tampa");
        let elState = browser.driver.findElement(By.id("stateLA")).click();
        browser.driver.findElement(By.id("hZipInput")).sendKeys("33612");
        browser.driver.findElement(By.id("driver")).click();
        browser.driver.findElement(By.id("signupSubmit")).click();
       
        /* browser.driver.findElement(By.id("")).click();
        browser.driver.findElement(By.id("")).sendKeys("");*/

        browser.driver.sleep(15000);
       
    });
    
    it("2. Logging in the credentials added", function(){
        browser.driver.get("http://localhost:4200/");
        browser.driver.manage().window().setSize(1056, 666);
        browser.driver.findElement(By.linkText("Login")).click();
        browser.driver.findElement(By.id("formGroupExampleInput")).sendKeys("jlmacleE2E");
        browser.driver.findElement(By.id("formGroupExampleInput2")).sendKeys("password");
        browser.driver.findElement(By.id("sign-in-btn")).click();
        
        //Looking for the text displayed on the Search Button of the Drivers page
        let elDriverPageSearchButton = element(by.xpath('/html/body/app-root/app-driver-list/div[1]/button'));
        let text_function = elDriverPageSearchButton.getText(); 
        //console.log(text_function);        
        expect(text_function).toBe("Search");

    });

    //TODO: testing that the contact information stored 
    it("3. Testing that the contact information data has been stored in the database", function(){
        browser.driver.findElement(By.id("signupSubmit")).click();

    });

    

});