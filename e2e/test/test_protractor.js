//describe: groups together a series of tests
describe('Starting a test suite', function(){
    //it: for a specific test
    it('first test',function(){
        let a = true;
        expect(a).toBe(true);
    });
    it('second test', function(){
        let b = true;
        //expect: code that confirms that the test works
        expect(b).toBe(true);
    })
});

