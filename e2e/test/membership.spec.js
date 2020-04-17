describe('membership form testing - ', function(){
   //beginning of elements for the login
   let elLoginButton = element(by.xpath('/html/body/app-root/app-home-page/div[1]/div/div/button[1]'));
  // /html/body/app-root/app-home-page/div[1]/div/div/button[1]
   let elLoginUsername = element(by.xpath('//*[@id="formGroupExampleInput"]'));
   let elLoginPassword = element(by.xpath('//*[@id="formGroupExampleInput2"]'));
   let elLoginSubmit = element(by.xpath('//*[@id="sign-in-btn"]'));
   //beginning of elements for the page tests
   let elProfileDrop = element(by.xpath('/html/body/app-root/app-navbar/nav/nav/div/ul/li[3]/a'));
   let elProfileButton = element(by.xpath('//*[@id="navbarSupportedContent"]/ul/li[3]/div/a[1]'));
   //End of xpaths needed for tests
   let xComp = 1800;
   let y = 720;
  // browser.get('http://localhost:4200/');
   //checks to make sure that the login button reroutes to the correct modal
   //change when the front end is being hosted

   let membershipButton = element(by.xpath('/html/body/app-root/app-profile/div/div/div[1]/button[3]'));
   let selectDriver = element(by.xpath('/html/body/app-root/app-profile/div/div/div[2]/app-profile-membership/div/div/form/div[3]/div/select[1]'));
   let optionDriver = element(by.xpath('/html/body/app-root/app-profile/div/div/div[2]/app-profile-membership/div/div/form/div[3]/div/select[1]/option[1]'));
   let selectActive = element(by.xpath('/html/body/app-root/app-profile/div/div/div[2]/app-profile-membership/div/div/form/div[3]/div/select[2]'));
   let optionActive = element(by.xpath('/html/body/app-root/app-profile/div/div/div[2]/app-profile-membership/div/div/form/div[3]/div/select[2]/option[2]'));
   let membershipSave = element(by.xpath('/html/body/app-root/app-profile/div/div/div[2]/app-profile-membership/div/div/form/div[3]/div/button'));
   let membershipUpdateMsg = element(by.xpath('/html/body/app-root/app-profile/div/div/div[2]/app-profile-membership/div/div/form/div[3]/div/p'));
   it('User makes changes to membership form and submit', function(){  
       browser.driver.manage().window().setSize(xComp,y);
       elLoginButton.click();
       //These are based off of dummy data currently. Change if desired
       elLoginUsername.sendKeys('gpichmann0');
       elLoginPassword.sendKeys('password');
       elLoginSubmit.click();
       //change this to reflect succesful login
       browser.driver.sleep(500);
       browser.ignoreSynchronization=true;
       elProfileDrop.click();
       browser.driver.sleep(500);
       browser.ignoreSynchronization=true
       elProfileButton.click();
       browser.driver.sleep(1000);
       membershipButton.click();
       browser.driver.sleep(1000);
       selectDriver.click();
       optionDriver.click();
       browser.driver.sleep(1000);
       selectActive.click();
       optionActive.click();
       browser.driver.sleep(1000);
       membershipSave.click(); 
       browser.driver.sleep(2000);
       expect(membershipUpdateMsg.getText()).toBe('Update Successful');
   });
});