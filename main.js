///// Read Stream //////

// var RandomNumbers = require('./numbers');
// var numbers = new RandomNumbers();
// numbers.on('data', function(chunk) { // this is an event listener for data in readable stream. The chunk is a chunk of that data.
//     console.log(chunk.toJSON(chunk)); // will log the chunk that was streamed
// });

////// Write Stream //////

// var RandomNumbers = require('./numbers');
// var Cache = require('./cache');
// var numberArray = new RandomNumbers();
// var cache = new Cache('numberArray1'); // variable to later pipe data from the alphabet stream into cache

// numberArray.pipe(cache);

// cache.on('finish', function() {
//     console.log('Cache store:');
//     for (var key in Cache.store) { // the key identifies the data that is going to be written into the stream. Allows to later retrieve data from the Cache.store object.
//         console.log(key, ':', Cache.store[key].toJSON(Cache.store[key]) );
//     }
// });

///// Transform Stream ///////

var RandomNumbers = require('./numbers');
var Cache = require('./cache');
var NumbersLess = require('./transform');
var numberArray = new RandomNumbers();
var numbers = new NumbersLess();
var cache = new Cache('numberArray1'); 

numberArray.pipe(numbers).pipe(cache)

 cache.on('finish', function() {
    console.log('Cache store:');
    for (var key in Cache.store) { // the key identifies the data that is going to be written into the stream. Allows to later retrieve data from the Cache.store object.
        console.log(key, ':', Cache.store[key].toJSON(Cache.store[key]) );
    }
});