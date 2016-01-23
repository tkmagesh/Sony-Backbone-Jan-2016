/* create a function to check if the given number is a prime number or not.  Note : the algorithm to check should not run for a given number more than once

*/
isPrime(100)

var isPrime = (function(){
    var cache = {};
    function checkPrime(n){
        console.log("runnig algo for ", n);
        if (n <= 3) return true;
        for(var i=2; i <= (n/2); i++)
            if (n % i === 0) return false;
        return true;
    }

    return function(n){
        if (typeof cache[n] === 'undefined')
            cache[n] = checkPrime(n);
        return cache[n];
    }
})();


var isOddOrEven = (function(){
    var cache = {};
    function isOddOrEven(n){
        return n % 2 === 0 ? "even" : "odd"
    };

    return function(n){
        if (typeof cache[n] === 'undefined')
            cache[n] = isOddOrEven(n);
        return cache[n];
    }
})();

function getCachedFn(fn){
    var cache = {};

    return function(){
        var key = JSON.stringify(arguments);
        if (typeof cache[key] === 'undefined')
            cache[key] = fn.apply(this, arguments);
        return cache[key];
    }
}

var isPrime = getCachedFn(function checkPrime(n){
        console.log("runnig algo for ", n);
        if (n <= 3) return true;
        for(var i=2; i <= (n/2); i++)
            if (n % i === 0) return false;
        return true;
    });


