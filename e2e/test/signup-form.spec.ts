import { browser, by, element } from 'protractor';

describe('Sign up form tests', function(){
    let signUpButton = element(by.id('home-page-sign-up-btn'));
    let signUpSubmitButton = element(by.xpath('/html/body/modal-container/div/div/div[2]/div[2]/button'));

    let firstNameField = element(by.id('firstname'));
    let firstNameError = element(by.id('firstnameError'));
    
    let lastNameField = element(by.id('lastname'));
    let lastNameError = element(by.id('lastnameError'));
     
    let emailField = element(by.id('email'));
    let emailError = element(by.id('emailError'));
    
    let phoneNumberField = element(by.id('phoneNumber'));
    let phoneNumberError = element(by.id('phoneNumberError'));
     
    let usernameField = element(by.id('userName'));
    let usernameError = element(by.id('usernameError'));
    
    let hAddressField = element(by.id('hAddress'));
    let hAddressError = element(by.id('hAddressError'));
    
    let hCityField = element(by.id('hCity'));
    let hCityError = element(by.id('hCityError'));
     
    let hStateField = element(by.id('hState'));
    let hStateError = element(by.id('hStateError'));
     
    let hZipField = element(by.id('hZip'));
    let hZipError = element(by.id('hZipError'));

    it('try to sign up', function() {
        browser.get(browser.baseUrl);
        signUpButton.click();

        // Check validations when nothing is entered.
        signUpSubmitButton.click();
        expect(firstNameError.getText()).toBe('First name field required');
        expect(lastNameError.getText()).toBe('Last name field required');
        expect(emailError.getText()).toBe('email required');
        expect(phoneNumberError.getText()).toBe('Phone number field required');
        expect(usernameError.getText()).toBe('Username field required');
        expect(hAddressError.getText()).toBe('Home address field required');
        expect(hCityError.getText()).toBe('City field required');
        expect(hStateError.getText()).toBe('State field required');
        expect(hZipError.getText()).toBe('Zip code field required');
        
        // See if valid looking data causes any errors.  
        firstNameField.sendKeys('Name');
        lastNameField.sendKeys('Name');
        emailField.sendKeys('email@address.com');
        phoneNumberField.sendKeys('123 123 1234');
        usernameField.sendKeys('nameless');
        hAddressField.sendKeys('123 Road St');
        hCityField.sendKeys('Nameville');
        hStateField.sendKeys('TX');
        hZipField.sendKeys('12345');
        signUpSubmitButton.click();
        expect(firstNameError.isPresent()).toBe(false);
        expect(lastNameError.isPresent()).toBe(false);
        expect(emailError.isPresent()).toBe(false);
        expect(phoneNumberError.isPresent()).toBe(false);
        expect(usernameError.isPresent()).toBe(false);
        expect(hAddressError.isPresent()).toBe(false);
        expect(hCityError.isPresent()).toBe(false);
        expect(hStateError.isPresent()).toBe(false);
        expect(hZipError.isPresent()).toBe(false);
    });
});