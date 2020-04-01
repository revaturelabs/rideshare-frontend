import { browser, by, element } from 'protractor';

describe('navigation tests', function() {
    let profilebutton = element(by.id('driverbuttontext'));

    element(by.id('navbarDropdown')).click();
    browser.pause();

    it('has the users name at top right', function() {
        expect(profilebutton.getText()).toEqual('Fabien Braunroth');
    });
});