var stream = require('stream');

function randomIntegerInc(low, high) {
    return Math.floor(Math.random() * (high - low +1) + low);
}


function RandomNumbers (options){
    stream.Readable.call(this, options);
    this._randomNumbersArray= new Array(50)
    for (var i = 0; i<this._randomNumbersArray.length; i++){
        this._randomNumbersArray[i] = randomIntegerInc(1, 1000)
    }
    this._lastElement= this._randomNumbersArray[this._randomNumbersArray.length -1]
    this._curr = []
    for(var i = 0; i<this._randomNumbersArray.length; i++){
        this._curr = this._randomNumbersArray[i]
    }
}

RandomNumbers.prototype = Object.create(stream.Readable.prototype);
RandomNumbers.prototype.constructor = RandomNumbers;

RandomNumbers.prototype._read = function() {
    var buf = new Buffer(this._randomNumbersArray);
    this.push(buf); // pushing the array of random numbers to the buf object
    console.log("running")
    if (this._curr === this._lastElement) {
        this.push(null); // once finished iterating, tell buffer that data has ended by calling push(null)
    }
};

module.exports = RandomNumbers;