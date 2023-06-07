const express = require('express')
const expressError = require('./expressError');
const ExpressError = require('./expressError');

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/median', function (req, res, next) {
    try{
        const { nums } = req.query
        let Array = nums.split(',')
        numsArray = Array.map((a) => a = Number(a))
        console.log(numsArray)
        numsArray.forEach((el)=>{
            if (!el){
                throw new ExpressError("Not a Number!", 400)
            }
        })
        numsArray = numsArray.sort(function (a, b) {
            if (a < b) {
                return -1
            }
            else if (a > b) {
                return 1
            }
            else {
                return 0
            }
        })
        const l = numsArray.length
        let median = 0
        if (l % 2 != 0) {
            median = numsArray[Math.floor(l / 2)]
        }
        else {
            median = (Number(numsArray[(l / 2) - 1]) + Number(numsArray[(l / 2)])) / 2
        }
        return res.json({
            operation: "median",
            value: median
        });
    }
    catch(err){
        return next(err)
    }
});


app.get('/mean', function (req, res,next) {
    try{
        const { nums } = req.query
        if (!nums){
            throw new ExpressError("Please enter data", 400)
        }
        let Array = nums.split(',')
        numsArray = Array.map((a) => a = Number(a))
        
        numsArray.forEach((el)=>{
            if (!el){
                throw new ExpressError("Not a Number!", 400)
            }
        })
        const l = numsArray.length
        let sum = 0
        for (let i = 0; i < l; i++) {
            sum += numsArray[i]
        }
        const mean = sum / l

        return res.json({
            operation: "mean",
            value: mean
        })
    }
    catch(err){ 
    return next(err)
    }
})




app.get('/mode', function (req, res,next) {
    try{
        const { nums } = req.query
        let Array = nums.split(',')
        numsArray = Array.map((a) => a = Number(a))
        numsArray.forEach((el)=>{
            if (!el){
                throw new ExpressError("Not a Number!", 400)
            }
        })
        const modeObj = {}

        numsArray.forEach((el) => {
            if (modeObj[`${el}`]) {
                modeObj[`${el}`] += 1

            }
            else {
                modeObj[`${el}`] = 1
            }
        })

        const keys = Object.keys(modeObj)
        const values = Object.values(modeObj)
        let mode
        let max = 0
        let index = 0
        for (let i = 0; i < values.length; i++) {
            if (values[i] > max) {
                max = values[i]
                index = i
            }
        }
        if (values.indexOf(max) != values.lastIndexOf(max)) {
            mode = "bimodal"
        }
        else {
            mode = keys[index]
        }

        return res.json({
            operation: "mode",
            value: mode
        });
    }
    catch(err){
        return next(err)
    }
});


app.use(function(err, req, res, next) {
    let status = err.status || 500;
    let message = err.message;
  
    return res.status(status).json({
      error: {message, status}
    })
  })
  


app.listen(3000, function () {
    console.log('App on port 3000');
})
