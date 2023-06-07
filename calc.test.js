const calc = require('./calc.js')


describe("calc functions", function(){

    test("median should return right data", function(){
        const median1 = calc.getMedian([1,3,5,4,6])
        const median2 = calc.getMedian([1,2,2,4])
        expect(median1).toEqual(4)
        expect(median2).toEqual(2)
    })

    test("mode should return right data", function(){
        const mode1 = calc.getMode([1,3,3,5,4,6,5,5])
        expect(Number(mode1)).toEqual(5)
        const mode2 = calc.getMode([1,2,2,3,3])
        expect(mode2).toEqual("bimodal")
    })

    test("mean should return right data", function(){
        const mean1 = calc.getMean([10,5,15])
        expect(mean1).toEqual(10)
        const mean2 = calc.getMean([2,2,2,2])
        expect(mean2).toEqual(2)
    })

})