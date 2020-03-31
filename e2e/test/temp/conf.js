exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['./landingpage.spec.js','./register.spec.js','./usernav.spec.js']
}