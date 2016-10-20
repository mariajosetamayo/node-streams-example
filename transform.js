var stream = require('stream').Transform;
var inherits = require('util').inherits

function NumbersLess (options){
    stream.call(this, options);
}

inherits(NumbersLess, stream)

function isLessThan100(value){
    return value<100
}

NumbersLess.prototype._transform = function(chunk, encoding, callback) {
    var chunkToJson = chunk.toJSON(chunk)
    chunk = chunkToJson.data.filter(isLessThan100)
    var buf = new Buffer(chunk, 'utf8');
    this.push(buf); // pushing the array of random numbers to the buf object
    callback();
};

module.exports = NumbersLess;