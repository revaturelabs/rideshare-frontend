describe('E2E Testing: Signing up as Driver', function(){
    it('1. Signing up', function(){
        browser.driver.get("http://localhost:4200/");
        browser.driver.manage().window().setSize(1056, 666);
        browser.driver.findElement(By.linkText("Sign up")).click();
        browser.driver.findElement(By.id("firstname")).click();
        browser.driver.findElement(By.id("firstname")).sendKeys("Jean Louis");
        browser.driver.findElement(By.id("lastname")).sendKeys("Macle");
        browser.driver.findElement(By.id("email")).sendKeys("jeanlouis@mail.com");
        browser.driver.findElement(By.id("phoneNumber")).sendKeys("337-123-124");
        browser.driver.findElement(By.id("userName")).sendKeys("jlmacle");
        browser.driver.driver.findElement(By.id("hAddress")).click();
        browser.driver.driver.findElement(By.id("hAddress")).sendKeys("12702 Bruce B Downs");
       
    });

    it("2. Logging in the credeentials added", function(){


    });

});