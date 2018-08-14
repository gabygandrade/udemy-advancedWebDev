// Write a function called map which accepts two parameters: an array and a callback. 
//  The map function should return a new array with the result of each value being passed to the callback function. Here's an example:

function map(anArray, cb){
	var returnArray = [];
    for (var i=0; i<anArray.length; i++){
        returnArray.push(cb(anArray[i]))
    }
    return returnArray;
}

// Test:
map([1,2,3,4], function(val){
    return val * 2;
})

/*
Write a function called reject which accepts two parameters an array and a callback.
 The function should return a new array with all of the values that do not return true to the callback. 
 Here are two examples:
*/

function reject(anArray, cb){
    let returnArray = [];
    for (var i=0; i< anArray.length; i++){
        if (cb(anArray[i]) === false){
            returnArray.push(anArray[i])
        }
    }
    return returnArray;
}

// Tests:
reject([1,2,3,4], function(val){
    return val > 2;
}); // [1,2]

reject([2,3,4,5], function(val){
    return val % 2 === 0;
}); // [3,5]
