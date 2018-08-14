/*
Write a function called arrayFrom which converts an array-like-object into an array.

Examples:
    var divs = document.getElementsByTagName('divs');
    divs.reduce // undefined
    var converted = arrayFrom(divs);
    converted.reduce // function(){}....
*/

function arrayFrom(arrayLikeObject){
    [].slice.call(arrayLikeObject)
}

/* How does this work?

1. When .slice() is called normally, this keyword is an Array, and then it just iterates over that Array
2. How is the keyword this an Array when using the .slice() method? B/c:
when you do object.method();
...the 'object' automatically becomes the value of this in the method(). So with:
[1,2,3].slice()
...the [1,2,3] Array is set as the value of this in .slice().
But what if you could substitute something else as the this value? As long as whatever you substitute has a numeric .length property,
and a bunch of properties that are numeric indices, it should work. This type of object is often called an array-like object.

The .call() and .apply() methods let you manually set the value of this in a function.
So if we set the value of this in .slice() to an array-like object, .slice() will just assume it's working with an Array, and will do its thing.


See full explanation @
https://stackoverflow.com/questions/7056925/how-does-array-prototype-slice-call-work
*/

/* Write a function called sumEvenArguments which takes all of the arguments passed to a function and returns the sum of the even ones.

Examples:
    sumEvenArguments(1,2,3,4) // 6
    sumEvenArguments(1,2,6) // 8
    sumEvenArguments(1,2) // 2
*/

function sumEvenArguments(){
    // create an array of the arguments passed in, remember 'arguments' is in array like object in JS
    var newArgs = [].slice.call(arguments);
    return newArgs.reduce(function(acc, next){
        if (next % 2 === 0){
            return acc + next ;
        }
        return acc;
    }, 0)
}

/*
Write a function called invokeMax which accepts a function and a maximum amount.
invokeMax should return a function that when called increments a counter.
If the counter is greater than the maximum amount, the inner function should return "Maxed Out"

Examples:

    function add(a,b){
        return a+b
    }

    var addOnlyThreeTimes = invokeMax(add,3);
    addOnlyThreeTimes(1,2) // 3
    addOnlyThreeTimes(2,2) // 4
    addOnlyThreeTimes(1,2) // 3
    addOnlyThreeTimes(1,2) // "Maxed Out!"

*/

function invokeMax(fn, num){
    var max = 0;

    return function(){
        if(max >= num) return "Maxed Out!";
        max ++;
        return fn.apply(this, arguments)
    }
}

/*
Write a function called once which accepts two parameters, a function and a value for the keyword 'this'.
Once should return a new function that can only be invoked once, with the value of the keyword this in the function set to be the second parameter.

Examples:

    function add(a,b){
        return a+b
    }

    var addOnce = once(add, this);
    addOnce(2,2) // 4
    addOnce(2,2) // undefined
    addOnce(2,2) // undefined

    function doMath(a,b,c){
        return this.firstName + " adds " + (a+b+c)
    }

    var instructor = {firstName: "Elie"}
    var doMathOnce = once(doMath, instructor);
    doMathOnce(1,2,3) // "Elie adds 6"
    doMathOnce(1,2,3) // undefined

*/

function once(fn, thisArg){
    var hasBeenCalled = false;
    return function(){
        if(!hasBeenCalled){
            hasBeenCalled = true;
            return fn.apply(thisArg, arguments)
        }
    }
}

// BONUSES!

/*
Write a function called bind which accepts a function and a value for the keyword this.
Bind should return a new function that when invoked, will invoke the function passed to bind with the correct value of the keyword this.
HINT - if you pass more than two parameters to bind, those parameters should be included as parameters to the inner function when it is invoked.
You will have to make use of closure!

Examples:

    function firstNameFavoriteColor(favoriteColor){
        return this.firstName + "'s favorite color is " + favoriteColor
    }

    var person = {
        firstName: 'Elie'
    }

    var bindFn = bind(firstNameFavoriteColor, person);
    bindFn('green') // "Elie's favorite color is green"

    var bindFn2 = bind(firstNameFavoriteColor, person, 'blue');
    bindFn2('green') // "Elie's favorite color is blue"

    function addFourNumbers(a,b,c,d){
        return a+b+c+d;
    }

    bind(addFourNumbers,this,1)(2,3,4) // 10
    bind(addFourNumbers,this,1,2)(3,4) // 10
    bind(addFourNumbers,this,1,2,3)(4) // 10
    bind(addFourNumbers,this,1,2,3,4)() // 10
    bind(addFourNumbers,this)(1,2,3,4) // 10
    bind(addFourNumbers,this)(1,2,3,4,5,6,7,8,9,10) // 10

*/

function bind(fn, thisArg){
    // start slicing at the item @ index 2 so that we ignore the fn and thisArg arguments passed in
    // outerArgs if for the args passed in to the first/outer function
    var outerArgs = [].slice.call(arguments, 2);

    return function(){
        // innerArgs is for the args passed into the inner function
        var innerArgs = [].slice.call(arguments);
        var allArgs = outerArgs.concat(innerArgs);

        return fn.apply(thisArg, allArgs);
    }

}

/*
Write a function called flip which accepts a function and a value for the keyword this.
Flip should return a new function that when invoked, will invoke the function passed to flip with the correct value of the keyword this and all
of the arguments passed to the function REVERSED.
HINT - if you pass more than two parameters to flip, those parameters should be included as parameters to the inner function when it is invoked.
You will have to make use of closure!

Examples:

    function personSubtract(a,b,c){
        return this.firstName + " subtracts " + (a-b-c);
    }

    var person = {
        firstName: 'Elie'
    }

    var flipFn = flip(personSubtract, person);
    flipFn(3,2,1) // "Elie subtracts -4"

    var flipFn2 = flip(personSubtract, person, 5,6);
    flipFn(7,8). // "Elie subtracts -4"

    flip(subtractFourNumbers,this,1)(2,3,4) // -2
    flip(subtractFourNumbers,this,1,2)(3,4) // -2
    flip(subtractFourNumbers,this,1,2,3)(4) // -2
    flip(subtractFourNumbers,this,1,2,3,4)() // -2
    flip(subtractFourNumbers,this)(1,2,3,4) // -2
    flip(subtractFourNumbers,this,1,2,3)(4,5,6,7) // -2
    flip(subtractFourNumbers,this)(1,2,3,4,5,6,7,8,9,10) // -2
    flip(subtractFourNumbers,this,11,12,13,14,15)(1,2,3,4,5,6,7,8,9,10) // -22

*/


function flip(fn, thisArg){
    return function(){

    }

}



