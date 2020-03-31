exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    //specs: ['./logging_in.js'] ,
    specs: ['./signup_asDriver.js'] ,
    multiCapabilities: [{
        browserName: 'firefox'
    }, {
        browserName: 'chrome'
    }]
}