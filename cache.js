var stream = require('stream');

function Cache(key, options) {
    stream.Writable.call(this, options);
    this._key = key;
    this._value = null;
    this.on('finish', function() { // when this event fires you add a new entry to the Cache.store object, containing all data accumulated in _value buffer.
        Cache.store[this._key] = this._value; //specifies how data is to be saved in object Cache.store
    });
};
Cache.store = {}; // empty object which will be populated by received data from readable stream
Cache.prototype = Object.create(stream.Writable.prototype);
Cache.prototype.constructor = Cache;

Cache.prototype._write = function(chunk, encoding, callback) { // _write method is called when data is supplied to the stream
    if (!this._value) { // if no value exists, make it equal to the data chunk
        this._value = chunk;
    }
    else { // if a value exists, concatenate it and save it as a value
        this._value = Buffer.concat([this._value, chunk]);
    }
    callback(); //this callback function must be invoked after each write. If nothing is passed, it means it was a successful write
};

module.exports = Cache;